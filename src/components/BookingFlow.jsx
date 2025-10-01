import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, MapPin, X } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { useApp } from '../contexts/AppContext';

export function BookingFlow({ package: pkg, onClose, variant = 'datePackage' }) {
  const { dispatch } = useApp();
  const { processBookingPayment, isWalletConnected } = usePaymentContext();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bookingFee = 3;
  const totalPrice = pkg.price + bookingFee;

  const availableDates = [
    format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    format(addDays(new Date(), 8), 'yyyy-MM-dd'),
  ];

  const availableTimes = [
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM'
  ];

  const handleBooking = async () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet to complete booking');
      return;
    }

    setIsProcessing(true);
    try {
      const paymentResult = await processBookingPayment(pkg.price, bookingFee);
      
      const booking = {
        id: Date.now(),
        userId: 'current-user',
        packageId: pkg.id,
        bookingDate: new Date(`${selectedDate} ${selectedTime}`),
        status: 'confirmed',
        confirmationCode: `DB${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        paymentTxHash: paymentResult?.transactionHash || 'mock-tx-hash',
        venueConfirmations: pkg.venueIds?.map(id => ({ venueId: id, confirmed: true })) || []
      };

      dispatch({ type: 'ADD_BOOKING', payload: booking });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          message: `🎉 ${pkg.title} booked for ${format(new Date(`${selectedDate} ${selectedTime}`), 'MMM d, yyyy at h:mm a')}!`,
          type: 'success',
          timestamp: new Date()
        }
      });

      setStep(3); // Success step
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-surface border border-border rounded-lg max-w-md w-full p-6 animate-slide-up">
          <div className="text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Booking Confirmed!</h3>
            <p className="text-textMuted mb-4">
              Your romantic evening is all set for {format(new Date(`${selectedDate} ${selectedTime}`), 'MMM d, yyyy at h:mm a')}.
            </p>
            <div className="bg-surfaceElevated rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-text mb-2">{pkg.title}</h4>
              <div className="text-sm text-textMuted space-y-1">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{pkg.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{pkg.duration}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-primary w-full"
            >
              View Itinerary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text">Book Your Date</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surfaceElevated rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-textMuted" />
          </button>
        </div>

        <div className="p-6">
          {/* Package Summary */}
          <div className="bg-surfaceElevated rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-text mb-2">{pkg.title}</h3>
            <p className="text-textMuted text-sm mb-3">{pkg.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-textMuted">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{pkg.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{pkg.duration}</span>
                </div>
              </div>
              <span className="text-lg font-bold text-primary">${pkg.price}</span>
            </div>
          </div>

          {step === 1 && (
            <div>
              <h4 className="font-semibold text-text mb-4">Select Date</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedDate === date
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-textMuted text-text'
                    }`}
                  >
                    {format(new Date(date), 'EEEE, MMM d')}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!selectedDate}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Choose Time
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="font-semibold text-text mb-4">Select Time</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      selectedTime === time
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-textMuted text-text'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className="bg-surfaceElevated rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-text mb-3">Booking Summary</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-textMuted">Date Package</span>
                    <span className="text-text">${pkg.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textMuted">Booking Fee</span>
                    <span className="text-text">${bookingFee}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold">
                    <span className="text-text">Total</span>
                    <span className="text-primary">${totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={handleBooking}
                  disabled={!selectedTime || isProcessing}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{isProcessing ? 'Processing...' : `Pay $${totalPrice}`}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}