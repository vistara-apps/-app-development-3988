import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Heart, Share, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { BookingModal } from './BookingModal';

export const DateCard = ({ datePackage, variant = 'featured', onSave, onShare }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(datePackage);
  };
  
  const isCompact = variant === 'compact';
  
  return (
    <>
      <Card hover className={isCompact ? 'max-w-sm' : 'max-w-md'}>
        <div className="relative">
          <img
            src={datePackage.image}
            alt={datePackage.title}
            className={`w-full object-cover ${isCompact ? 'h-40' : 'h-48'}`}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className={`p-2 rounded-full backdrop-blur-sm ${
                isSaved ? 'bg-primary text-white' : 'bg-black/30 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onShare?.(datePackage)}
              className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm"
            >
              <Share className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              ${datePackage.price}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className={`font-semibold mb-2 ${isCompact ? 'text-lg' : 'text-xl'}`}>
            {datePackage.title}
          </h3>
          
          <div className="flex items-center gap-4 text-textMuted text-sm mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{datePackage.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{datePackage.duration}</span>
            </div>
          </div>
          
          <p className="text-textMuted text-sm mb-4 line-clamp-2">
            {datePackage.description}
          </p>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setIsBookingOpen(true)}
              className="flex-1"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </Button>
            <Button
              variant="secondary"
              className="px-4"
              onClick={() => setIsBookingOpen(true)}
            >
              Details
            </Button>
          </div>
        </div>
      </Card>
      
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        datePackage={datePackage}
      />
    </>
  );
};