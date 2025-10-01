import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share, Calendar, MapPin, Clock, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export const CoupleWishlist = ({ wishlist = [], onRemove, onBook, variant = 'shared' }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  
  const isShared = variant === 'shared';
  
  if (wishlist.length === 0) {
    return (
      <Card className="text-center py-8">
        <Heart className="w-12 h-12 text-textMuted mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          {isShared ? 'Your Shared Wishlist is Empty' : 'Your Wishlist is Empty'}
        </h3>
        <p className="text-textMuted mb-4">
          {isShared 
            ? 'Start saving date ideas together. When one partner saves a spot, the other gets notified!'
            : 'Save romantic spots and date packages to build your perfect wishlist.'
          }
        </p>
        <Button>Discover Date Ideas</Button>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {isShared ? '💕 Shared Wishlist' : '❤️ My Wishlist'}
        </h2>
        <span className="text-textMuted text-sm">{wishlist.length} saved</span>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="relative">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={() => onRemove?.(item.id)}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </button>
                {isShared && item.savedBy && (
                  <div className="absolute bottom-2 left-2 bg-accent/90 text-white px-2 py-1 rounded text-xs">
                    Saved by {item.savedBy}
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <div className="flex items-center gap-1 text-textMuted text-xs mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                
                {item.type === 'package' && (
                  <div className="flex items-center gap-1 text-textMuted text-xs mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration}</span>
                  </div>
                )}
                
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    onClick={() => onBook?.(item)}
                    className="flex-1 text-xs py-2"
                  >
                    <Calendar className="w-3 h-3" />
                    Book
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedItem(item)}
                    className="px-3 py-2"
                  >
                    <Share className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};