import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, MapPin, Star, Heart, Share } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { usePaymentContext } from '../hooks/usePaymentContext';

export const GemFrame = ({ gem, onUnlock, onSave, onShare }) => {
  const [isUnlocked, setIsUnlocked] = useState(gem.isUnlocked || false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { createPayment, isConnected } = usePaymentContext();
  
  const handleUnlock = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    
    setIsUnlocking(true);
    try {
      await createPayment(gem.unlockPrice);
      setIsUnlocked(true);
      onUnlock?.(gem);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsUnlocking(false);
    }
  };
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(gem);
  };
  
  return (
    <Card className="max-w-md frame-card">
      <div className="relative">
        <img
          src={gem.image}
          alt={gem.title}
          className={`w-full h-48 object-cover transition-all duration-300 ${
            !isUnlocked ? 'blur-sm filter grayscale' : ''
          }`}
        />
        
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-semibold">Hidden Gem</p>
              <p className="text-white/80 text-sm">Unlock for ${gem.unlockPrice}</p>
            </div>
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex gap-2">
          {isUnlocked && (
            <>
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
                onClick={() => onShare?.(gem)}
                className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm"
              >
                <Share className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>
        
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm">
            <Star className="w-3 h-3 fill-current text-yellow-400" />
            <span>{gem.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{gem.title}</h3>
        
        <div className="flex items-center gap-1 text-textMuted text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{gem.location}</span>
        </div>
        
        <p className="text-textMuted text-sm mb-4">
          {isUnlocked ? gem.fullDescription : gem.teaser}
        </p>
        
        {isUnlocked && (
          <div className="bg-surfaceElevated rounded-lg p-3 mb-4">
            <h4 className="font-semibold text-sm mb-2 text-accent">Insider Tips</h4>
            <p className="text-textMuted text-sm">{gem.insiderTips}</p>
          </div>
        )}
        
        <div className="flex gap-2">
          {!isUnlocked ? (
            <Button
              onClick={handleUnlock}
              loading={isUnlocking}
              className="flex-1"
            >
              <Unlock className="w-4 h-4" />
              Unlock for ${gem.unlockPrice}
            </Button>
          ) : (
            <Button className="flex-1">
              Book Experience
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};