import React, { useState } from 'react';
import { Search, MapPin, Star, Unlock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { GemFrame } from '../components/GemFrame';

export function GemsView() {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const categories = ['all', 'cocktails', 'scenic', 'dining', 'activities', 'culture'];

  const filteredGems = state.hiddenGems.filter(gem => {
    const matchesSearch = gem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gem.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || gem.category === selectedCategory;
    const matchesUnlocked = !showUnlockedOnly || !gem.isLocked;
    
    return matchesSearch && matchesCategory && matchesUnlocked;
  });

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Hidden Romantic Gems</h1>
          <p className="text-textMuted text-lg">
            Secret spots locals love to keep to themselves
          </p>
        </div>

        {/* Weekly Drops Banner */}
        <div className="bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-text mb-2">
                ✨ New Weekly Gems
              </h3>
              <p className="text-textMuted">
                Fresh hidden spots drop every Friday at 5 PM. Unlock them before they're gone!
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">3</div>
              <div className="text-sm text-textMuted">New This Week</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted w-5 h-5" />
              <input
                type="text"
                placeholder="Search hidden gems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surfaceElevated border border-border rounded-lg text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-surfaceElevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Show Unlocked Toggle */}
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnlockedOnly}
                  onChange={(e) => setShowUnlockedOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  showUnlockedOnly ? 'bg-accent' : 'bg-border'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
                    showUnlockedOnly ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`} />
                </div>
                <span className="text-text text-sm">My Unlocked Gems</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-textMuted">
            {filteredGems.length} gem{filteredGems.length !== 1 ? 's' : ''} found
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-textMuted">
            <div className="flex items-center space-x-1">
              <Unlock className="w-4 h-4" />
              <span>Unlock Price: $5-$25</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>San Francisco Bay Area</span>
            </div>
          </div>
        </div>

        {/* Gems Grid */}
        {filteredGems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGems.map((gem) => (
              <GemFrame key={gem.id} gem={gem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Star className="w-16 h-16 text-textMuted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">No gems found</h3>
            <p className="text-textMuted">Try adjusting your search or filters</p>
          </div>
        )}

        {/* How Gems Work */}
        <section className="mt-16 bg-surfaceElevated rounded-lg p-8">
          <h2 className="text-2xl font-bold text-text mb-6 text-center">How Hidden Gems Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-text mb-2">Discover</h3>
              <p className="text-textMuted text-sm">
                Browse curated secret spots shared by local couples and relationship experts
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Unlock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-text mb-2">Unlock</h3>
              <p className="text-textMuted text-sm">
                Pay a small fee to reveal insider tips, best times to visit, and booking details
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-text mb-2">Experience</h3>
              <p className="text-textMuted text-sm">
                Visit with confidence knowing you have the local insider knowledge
              </p>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-accent">150+</div>
            <div className="text-textMuted text-sm">Hidden Gems</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">2.5K+</div>
            <div className="text-textMuted text-sm">Gems Unlocked</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-warning">47</div>
            <div className="text-textMuted text-sm">Local Curators</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-success">4.9</div>
            <div className="text-textMuted text-sm">Avg Rating</div>
          </div>
        </section>
      </div>
    </div>
  );
}