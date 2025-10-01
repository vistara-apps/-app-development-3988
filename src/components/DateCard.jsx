import React, { useState } from 'react';
import { MapPin, Clock, Heart, Calendar, Share } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { usePaymentContext } from '../hooks/usePaymentContext';

export function DateCard({ package: pkg, variant = 'compact' }) {
  const { dispatch } = useApp();
  const { processBookingPayment, isWalletConnected } = usePaymentContext();
  const [isBooking, setIsBooking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleBooking = async () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet to book this date');
      return;
    }

    setIsBooking(true);
    try {
      const paymentResult = await processBookingPayment(pkg.price);
      
      const booking = {
        id: Date.now(),
        userId: 'current-user',
        packageId: pkg.id,
        bookingDate: new Date(),
        status: 'confirmed',
        confirmationCode: `DB${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        paymentTxHash: paymentResult?.transactionHash || 'mock-tx-hash',
        venueConfirmations: pkg.venueIds.map(id => ({ venueId: id, confirmed: true }))
      };

      dispatch({ type: 'ADD_BOOKING', payload: booking });
      dispatch({ 
        type: 'ADD_NOTIFICATION', 
        payload: {
          id: Date.now(),
          message: `🎉 Date booked! ${pkg.title}. Check your itinerary.`,
          type: 'success',
          timestamp: new Date()
        }
      });

      alert(`Successfully booked ${pkg.title}! Confirmation: ${booking.confirmationCode}`);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    dispatch({ type: 'SAVE_SPOT', payload: { ...pkg, type: 'package' } });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now(),
        message: `Saved ${pkg.title} to your wishlist ❤️`,
        type: 'info',
        timestamp: new Date()
      }
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pkg.title,
        text: pkg.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out this romantic date: ${pkg.title} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={`card card-hover bg-surface border border-border rounded-lg overflow-hidden ${
      variant === 'featured' ? 'col-span-2 md:col-span-1' : ''
    }`}>
      <div className="relative">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleSave}
            className={`p-2 rounded-full transition-colors ${
              isSaved ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-primary'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-primary transition-colors"
          >
            <Share className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            ${pkg.price}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text mb-2">{pkg.title}</h3>
        <p className="text-textMuted text-sm mb-4 leading-relaxed">{pkg.description}</p>

        <div className="flex items-center space-x-4 text-sm text-textMuted mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{pkg.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{pkg.duration}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.activities.slice(0, 3).map((activity) => (
            <span
              key={activity}
              className="px-3 py-1 bg-surfaceElevated text-textMuted text-xs rounded-full"
            >
              {activity}
            </span>
          ))}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleBooking}
            disabled={isBooking}
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{isBooking ? 'Booking...' : 'Book Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}