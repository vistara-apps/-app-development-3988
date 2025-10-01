import React, { useState } from 'react';
import { Gift, Calendar, Heart, Star, Users, DollarSign, Clock, Send } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { usePaymentContext } from '../hooks/usePaymentContext';

export function ConciergeView() {
  const { state, dispatch } = useApp();
  const { createSession, isWalletConnected } = usePaymentContext();
  const [formData, setFormData] = useState({
    occasionType: '',
    anniversaryDate: '',
    budget: '',
    interests: [],
    surpriseLevel: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const occasionTypes = [
    { id: 'anniversary', label: 'Anniversary', icon: Heart },
    { id: 'birthday', label: 'Birthday', icon: Gift },
    { id: 'proposal', label: 'Proposal', icon: Star },
    { id: 'valentines', label: "Valentine's Day", icon: Heart },
    { id: 'justbecause', label: 'Just Because', icon: Users }
  ];

  const budgetRanges = [
    { value: '200-500', label: '$200 - $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2000', label: '$1,000 - $2,000' },
    { value: '2000+', label: '$2,000+' }
  ];

  const interestOptions = [
    'Fine Dining', 'Adventure Sports', 'Arts & Culture', 'Wine & Cocktails',
    'Nature & Hiking', 'Photography', 'Music & Dancing', 'Spa & Wellness',
    'Unique Experiences', 'Private Events'
  ];

  const surpriseLevels = [
    { value: 'minimal', label: 'Minimal Surprises', desc: 'Share most details in advance' },
    { value: 'moderate', label: 'Some Surprises', desc: 'Keep a few elements secret' },
    { value: 'maximum', label: 'Maximum Surprise', desc: 'Only share time and dress code' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isWalletConnected) {
      alert('Please connect your wallet to use the concierge service');
      return;
    }

    if (!formData.occasionType || !formData.budget) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Process payment for concierge service
      await createSession('$50.00'); // Concierge consultation fee
      
      // Submit concierge request
      const request = {
        id: Date.now(),
        userId: state.user?.fid,
        formData,
        status: 'submitted',
        submittedAt: new Date(),
        estimatedDelivery: '48 hours'
      };

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          message: `🎉 Concierge request submitted! We're designing your perfect ${formData.occasionType}.`,
          type: 'success',
          timestamp: new Date()
        }
      });

      // Reset form
      setFormData({
        occasionType: '',
        anniversaryDate: '',
        budget: '',
        interests: [],
        surpriseLevel: '',
        additionalNotes: ''
      });

      alert('Concierge request submitted successfully! You\'ll receive your custom itinerary within 48 hours.');
    } catch (error) {
      console.error('Concierge request failed:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Gift className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-text mb-4">Anniversary Concierge</h1>
          <p className="text-textMuted text-lg max-w-2xl mx-auto">
            Let our experts design your perfect romantic celebration. From intimate dinners to grand gestures, 
            we handle every detail so you can focus on your partner.
          </p>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-text mb-2">48-Hour Delivery</h3>
            <p className="text-textMuted text-sm">Custom itinerary designed and booked within 2 days</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <Star className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-text mb-2">Expert Curators</h3>
            <p className="text-textMuted text-sm">Professional event planners who specialize in romance</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <Heart className="w-8 h-8 text-warning mx-auto mb-3" />
            <h3 className="font-semibold text-text mb-2">Fully Coordinated</h3>
            <p className="text-textMuted text-sm">All reservations, bookings, and logistics handled for you</p>
          </div>
        </div>

        {/* Concierge Form */}
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-8">
          {/* Occasion Type */}
          <div className="mb-8">
            <label className="block text-text font-semibold mb-4">What are you celebrating? *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {occasionTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleInputChange('occasionType', id)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    formData.occasionType === id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-textMuted text-text'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-2" />
                  <div className="font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="mb-8">
            <label className="block text-text font-semibold mb-2">Event Date</label>
            <input
              type="date"
              value={formData.anniversaryDate}
              onChange={(e) => handleInputChange('anniversaryDate', e.target.value)}
              className="w-full px-4 py-3 bg-surfaceElevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Budget */}
          <div className="mb-8">
            <label className="block text-text font-semibold mb-4">Budget Range *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {budgetRanges.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleInputChange('budget', value)}
                  className={`p-4 rounded-lg border text-center transition-colors ${
                    formData.budget === value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-textMuted text-text'
                  }`}
                >
                  <DollarSign className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <label className="block text-text font-semibold mb-4">Interests & Preferences</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-lg border text-center text-sm transition-colors ${
                    formData.interests.includes(interest)
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-textMuted text-text'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Surprise Level */}
          <div className="mb-8">
            <label className="block text-text font-semibold mb-4">Surprise Level</label>
            <div className="space-y-3">
              {surpriseLevels.map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleInputChange('surpriseLevel', value)}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    formData.surpriseLevel === value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-textMuted'
                  }`}
                >
                  <div className={`font-medium ${
                    formData.surpriseLevel === value ? 'text-primary' : 'text-text'
                  }`}>
                    {label}
                  </div>
                  <div className="text-textMuted text-sm">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8">
            <label className="block text-text font-semibold mb-2">Additional Notes</label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="Tell us about any special requests, dietary restrictions, accessibility needs, or memorable moments you'd like to incorporate..."
              rows={4}
              className="w-full px-4 py-3 bg-surfaceElevated border border-border rounded-lg text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Pricing */}
          <div className="bg-surfaceElevated rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-text mb-4">Service Pricing</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-textMuted">Concierge Consultation</span>
                <span className="text-text">$50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textMuted">Custom Itinerary Design</span>
                <span className="text-text">Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textMuted">All Reservations & Bookings</span>
                <span className="text-text">Included</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="text-text">Total Service Fee</span>
                <span className="text-primary">$50</span>
              </div>
            </div>
            <p className="text-textMuted text-xs mt-3">
              * Experience costs (venues, activities) are additional and billed separately
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.occasionType || !formData.budget}
            className="btn-primary w-full flex items-center justify-center space-x-2 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            <span>{isSubmitting ? 'Submitting Request...' : 'Submit Concierge Request'}</span>
          </button>
        </form>

        {/* Testimonials */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-text text-center mb-8">What Couples Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-warning" />
                ))}
              </div>
              <p className="text-textMuted text-sm mb-4">
                "They planned our 5th anniversary perfectly! The private rooftop dinner was magical, 
                and having everything coordinated meant we could just focus on each other."
              </p>
              <div className="text-text font-medium">Sarah & Mike</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-warning" />
                ))}
              </div>
              <p className="text-textMuted text-sm mb-4">
                "The proposal plan was absolutely perfect! She had no idea, and every detail was 
                flawless. Worth every penny for such an important moment."
              </p>
              <div className="text-text font-medium">James & Emma</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}