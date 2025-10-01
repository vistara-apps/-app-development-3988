import React from 'react';
import { Heart, Calendar, MapPin, Users, Gift, Sparkles } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useApp } from '../contexts/AppContext';

const navItems = [
  { id: 'home', label: 'Home', icon: Heart },
  { id: 'packages', label: 'Dates', icon: Calendar },
  { id: 'gems', label: 'Gems', icon: MapPin },
  { id: 'getaways', label: 'Getaways', icon: Sparkles },
  { id: 'social', label: 'Social', icon: Users },
  { id: 'concierge', label: 'Concierge', icon: Gift }
];

export function Navigation() {
  const { state, dispatch } = useApp();

  return (
    <nav className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">DateBase</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: id })}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  state.currentView === id
                    ? 'text-primary bg-primary/10'
                    : 'text-textMuted hover:text-text hover:bg-surfaceElevated'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {state.streakCount > 0 && (
              <div className="flex items-center space-x-1 text-warning">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">{state.streakCount}</span>
              </div>
            )}
            <ConnectButton />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="flex items-center justify-around py-2">
            {navItems.slice(0, 5).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: id })}
                className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-md text-xs transition-colors ${
                  state.currentView === id
                    ? 'text-primary'
                    : 'text-textMuted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}