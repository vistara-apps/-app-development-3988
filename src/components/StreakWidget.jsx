import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, Trophy } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export const StreakWidget = ({ 
  streakCount = 0, 
  variant = 'compact', 
  nextMilestone = 3,
  onCelebrate 
}) => {
  const isCelebration = variant === 'celebration';
  const progress = (streakCount % nextMilestone) / nextMilestone * 100;
  
  const getBadgeLevel = (count) => {
    if (count >= 12) return { level: 'Gold', color: 'text-yellow-400', icon: '🏆' };
    if (count >= 6) return { level: 'Silver', color: 'text-gray-300', icon: '🥈' };
    if (count >= 3) return { level: 'Bronze', color: 'text-orange-400', icon: '🥉' };
    return { level: 'Starter', color: 'text-textMuted', icon: '🌟' };
  };
  
  const badge = getBadgeLevel(streakCount);
  
  if (isCelebration) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: 3, duration: 0.5 }}
          className="text-6xl mb-4"
        >
          {badge.icon}
        </motion.div>
        
        <h2 className="text-2xl font-bold mb-2">
          {streakCount} Month Streak! 🔥
        </h2>
        
        <p className="text-textMuted mb-4">
          You've reached {badge.level} level! Keep the romance alive.
        </p>
        
        <div className="bg-surfaceElevated rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2">Unlocked Rewards:</h3>
          <ul className="text-sm text-textMuted space-y-1">
            <li>• Free concierge upgrade</li>
            <li>• Early access to new packages</li>
            <li>• Exclusive couple's events</li>
          </ul>
        </div>
        
        <Button onClick={onCelebrate} className="w-full">
          Claim Rewards
        </Button>
      </motion.div>
    );
  }
  
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Date Night Streak</h3>
            <p className="text-textMuted text-sm">{badge.level} Level</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{streakCount}</div>
          <p className="text-textMuted text-xs">months</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-textMuted">Next milestone</span>
            <span className="font-semibold">{nextMilestone} months</span>
          </div>
          <div className="w-full bg-surfaceElevated rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-textMuted">
            <Calendar className="w-3 h-3" />
            <span>Last date: 3 days ago</span>
          </div>
          <div className={`flex items-center gap-1 ${badge.color}`}>
            <Trophy className="w-3 h-3" />
            <span>{badge.level}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};