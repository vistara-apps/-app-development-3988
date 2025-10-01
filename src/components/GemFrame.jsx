import React, { useState } from 'react';
import { MapPin, Star, Unlock, Heart, Share } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { usePaymentContext } from '../hooks/usePaymentContext';

export function GemFrame({ gem, variant = 'locked' }) {
  const { dispatch } = useApp();
  const { unlockGem, isWalletConnected } = usePaymentContext();
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleUnlock = async () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet to unlock this gem');
      return;
    }

    setIsUnlocking(true);
    try {
      await unlockGem(gem.unlockPrice);
      
      dispatch({ type: 'UNLOCK_GEM', payload: gem });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          message: `💎 Unlocked ${gem.title}! Check out the insider tips.`,
          type: 'success',
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.error('Unlock failed:', error);
      alert('Failed to unlock gem. Please try again.');
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    dispatch({ type: 'SAVE_SPOT', payload: { ...gem, type: 'gem' } });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: gem.title,
        text: gem.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out this hidden gem: ${gem.title}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="card card-hover bg-surface border border-border rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={gem.image}
          alt={gem.title}
          className={`w-full h-48 object-cover transition-all duration-300 ${
            gem.isLocked ? 'blur-sm brightness-50' : ''
          }`}
        />
        
        {gem.isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center">
              <Unlock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-white font-semibold">Hidden Gem</p>
              <p className="text-textMuted text-sm">Unlock for ${gem.unlockPrice}</p>
            </div>
          </div>
        )}

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

        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            {gem.category}
          </span>
          <div className="flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
            <Star className="w-3 h-3 fill-current text-warning" />
            <span>{gem.saves}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text mb-2">{gem.title}</h3>
        <p className="text-textMuted text-sm mb-4 leading-relaxed">
          {gem.isLocked ? 'A secret romantic spot waiting to be discovered...' : gem.description}
        </p>

        <div className="flex items-center space-x-2 text-sm text-textMuted mb-4">
          <MapPin className="w-4 h-4" />
          <span>{gem.location}</span>
        </div>

        {!gem.isLocked && (
          <div className="mb-4 p-4 bg-surfaceElevated rounded-md">
            <h4 className="font-semibold text-accent text-sm mb-2">Insider Tips:</h4>
            <p className="text-textMuted text-sm mb-2">{gem.insiderTips}</p>
            <p className="text-textMuted text-xs">
              <strong>Best time:</strong> {gem.bestTime}
            </p>
          </div>
        )}

        <div className="flex space-x-3">
          {gem.isLocked ? (
            <button
              onClick={handleUnlock}
              disabled={isUnlocking}
              className="btn-primary flex-1 flex items-center justify-center space-x-2"
            >
              <Unlock className="w-4 h-4" />
              <span>{isUnlocking ? 'Unlocking...' : `Unlock for $${gem.unlockPrice}`}</span>
            </button>
          ) : (
            <button className="btn-secondary flex-1">
              View Booking Options
            </button>
          )}
        </div>
      </div>
    </div>
  );
}