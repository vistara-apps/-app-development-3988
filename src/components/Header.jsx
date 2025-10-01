import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Heart, Menu, Bell } from 'lucide-react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

export const Header = ({ onMenuToggle }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-bg/80 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="md:hidden p-2 w-10 h-10 min-h-0"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">DateBase</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 w-10 h-10 min-h-0"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
            </Button>
            
            <div className="hidden sm:block">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};