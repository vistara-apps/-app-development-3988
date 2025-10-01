import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CreditCard } from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { usePaymentContext } from '../hooks/usePaymentContext';

export const BookingModal = ({ isOpen, onClose, datePackage }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const { createPayment, isConnected } = usePaymentContext();
  
  const bookingFee = 3;
  const totalPrice = datePackage?.price + bookingFee;
  
  const handleBooking = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }
    
    setIsBooking(true);
    try {
      await createPayment(`$${totalPrice}`);
      setBookingComplete(true);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };
  
  const resetAndClose = () => {
    setBookingComplete(false);
    setSelectedDate('');
    setSelectedTime('');
    setGuestCount(2);
    onClose();
  };
  
  if (!datePackage) return null;
  
  if (bookingComplete) {
    return (
      <Modal isOpen={isOpen} onClose={resetAndClose} title="Booking Confirmed! 🎉">
        <div className="text-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{datePackage.title}</h3>
          <p className="text-textMuted mb-4">
            {selectedDate} at {selectedTime}
          </p>
          <div className="bg-surfaceElevated rounded-lg p-4 mb-4">
            <p className="text-sm text-accent mb-2">Your itinerary has been sent to your email!</p>
            <p className="text-xs text-textMuted">
              Check your confirmation details and share with your partner.
            </p>
          </div>
          <Button onClick={resetAndClose} className="w-full">
            View Itinerary
          </Button>
        </div>
      </Modal>
    );
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Your Date" className="max-w-lg">
      <div className="space-y-6">
        <div className="flex gap-4">
          <img
            src={datePackage.image}
            alt={datePackage.title}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold">{datePackage.title}</h3>
            <div className="flex items-center gap-1 text-textMuted text-sm">
              <MapPin className="w-4 h-4" />
              <span>{datePackage.location}</span>
            </div>
            <div className="flex items-center gap-1 text-textMuted text-sm">
              <Clock className="w-4 h-4" />
              <span>{datePackage.duration}</span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-surfaceElevated border border-border rounded-lg px-3 py-2 text-text"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Select Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full bg-surfaceElevated border border-border rounded-lg px-3 py-2 text-text"
          >
            <option value="">Choose time</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="6:30 PM">6:30 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="7:30 PM">7:30 PM</option>
            <option value="8:00 PM">8:00 PM</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Number of Guests</label>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-textMuted" />
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="bg-surfaceElevated border border-border rounded-lg px-3 py-2 text-text"
            >
              <option value={2}>2 people</option>
              <option value={3}>3 people</option>
              <option value={4}>4 people</option>
            </select>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Date package</span>
              <span>${datePackage.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Booking fee</span>
              <span>${bookingFee}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleBooking}
          loading={isBooking}
          disabled={!selectedDate || !selectedTime}
          className="w-full"
        >
          <CreditCard className="w-4 h-4" />
          Pay with USDC
        </Button>
      </div>
    </Modal>
  );
};