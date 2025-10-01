import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { DateCard } from './components/DateCard';
import { GemFrame } from './components/GemFrame';
import { SocialFeed } from './components/SocialFeed';
import { CoupleWishlist } from './components/CoupleWishlist';
import { StreakWidget } from './components/StreakWidget';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { 
  Home, 
  Search, 
  Heart, 
  Calendar, 
  User, 
  Sparkles, 
  MapPin,
  Clock,
  Gift,
  Users
} from 'lucide-react';
import { 
  sampleDatePackages, 
  sampleHiddenGems, 
  sampleSocialPosts, 
  sampleWishlist 
} from './data/sampleData';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [savedSpots, setSavedSpots] = useState(sampleWishlist);

  const handleSaveSpot = (spot) => {
    setSavedSpots(prev => {
      const exists = prev.find(item => item.id === spot.id);
      if (exists) {
        return prev.filter(item => item.id !== spot.id);
      } else {
        return [...prev, { ...spot, savedBy: 'You' }];
      }
    });
  };

  const handleRemoveFromWishlist = (spotId) => {
    setSavedSpots(prev => prev.filter(item => item.id !== spotId));
  };

  const handleUnlockGem = (gem) => {
    console.log('Gem unlocked:', gem);
  };

  const handleShareSpot = (spot) => {
    if (navigator.share) {
      navigator.share({
        title: spot.title,
        text: `Check out this romantic spot: ${spot.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out ${spot.title} on DateBase!`);
      alert('Link copied to clipboard!');
    }
  };

  const tabs = [
    { id: 'home', icon: Home, label: 'Discover' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'social', icon: Users, label: 'Social' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                Curated Romantic Experiences
              </h1>
              <p className="text-textMuted text-lg max-w-2xl mx-auto">
                Bookable in seconds—right from your wallet. Discover hidden gems, 
                book complete date packages, and create lasting memories.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="sm:w-auto">
                  <Sparkles className="w-5 h-5" />
                  Book Your First Date
                </Button>
                <Button variant="secondary" size="lg" className="sm:w-auto">
                  <MapPin className="w-5 h-5" />
                  Explore Hidden Gems
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-textMuted text-sm">Curated Dates</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">50+</div>
                <div className="text-textMuted text-sm">Hidden Gems</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-success">1.2k</div>
                <div className="text-textMuted text-sm">Happy Couples</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-warning">98%</div>
                <div className="text-textMuted text-sm">5-Star Rated</div>
              </Card>
            </div>

            {/* Streak Widget */}
            <StreakWidget streakCount={3} />

            {/* Featured Date Packages */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Featured Date Packages</h2>
                <Button variant="ghost">View All</Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sampleDatePackages.map(pkg => (
                  <DateCard
                    key={pkg.id}
                    datePackage={pkg}
                    onSave={handleSaveSpot}
                    onShare={handleShareSpot}
                  />
                ))}
              </div>
            </div>

            {/* Hidden Gems */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Weekly Hidden Gems</h2>
                <Button variant="ghost">Discover More</Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {sampleHiddenGems.map(gem => (
                  <GemFrame
                    key={gem.id}
                    gem={gem}
                    onUnlock={handleUnlockGem}
                    onSave={handleSaveSpot}
                    onShare={handleShareSpot}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 text-center">
                <Gift className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Anniversary Concierge</h3>
                <p className="text-textMuted text-sm mb-4">
                  Let us plan your perfect anniversary celebration
                </p>
                <Button variant="secondary" size="sm">
                  Plan Anniversary
                </Button>
              </Card>
              
              <Card className="p-6 text-center">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Weekend Getaways</h3>
                <p className="text-textMuted text-sm mb-4">
                  2-3 day romantic escapes with everything planned
                </p>
                <Button variant="secondary" size="sm">
                  Browse Getaways
                </Button>
              </Card>
              
              <Card className="p-6 text-center">
                <Clock className="w-12 h-12 text-success mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Date Night Ritual</h3>
                <p className="text-textMuted text-sm mb-4">
                  Monthly automated date suggestions for busy couples
                </p>
                <Button variant="secondary" size="sm">
                  Setup Ritual
                </Button>
              </Card>
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search date packages, locations, or activities..."
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder-textMuted"
                />
              </div>
              <Button className="sm:w-auto">
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['Romantic Dinner', 'Adventure', 'Arts & Culture', 'Nightlife', 'Outdoor'].map(tag => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-surfaceElevated hover:bg-border rounded-full text-sm transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sampleDatePackages.map(pkg => (
                <DateCard
                  key={pkg.id}
                  datePackage={pkg}
                  variant="compact"
                  onSave={handleSaveSpot}
                  onShare={handleShareSpot}
                />
              ))}
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <CoupleWishlist
            wishlist={savedSpots}
            onRemove={handleRemoveFromWishlist}
            onBook={(item) => console.log('Booking:', item)}
            variant="shared"
          />
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Community Feed</h2>
              <p className="text-textMuted">
                See what other couples are experiencing and share your own adventures
              </p>
            </div>
            
            <Card className="p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">You</span>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your latest date experience..."
                    className="w-full bg-transparent border-none resize-none text-text placeholder-textMuted"
                    rows="2"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <Button variant="ghost" size="sm">Add Photos</Button>
                    <Button size="sm">Share Experience</Button>
                  </div>
                </div>
              </div>
            </Card>
            
            <SocialFeed
              posts={sampleSocialPosts}
              onLike={(id) => console.log('Liked:', id)}
              onComment={(id) => console.log('Comment on:', id)}
              onShare={(post) => handleShareSpot(post)}
              onSave={handleSaveSpot}
            />
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">You</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Your Profile</h2>
                  <p className="text-textMuted">Manage your dating preferences and history</p>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">Relationship Status</label>
                  <select className="w-full bg-surfaceElevated border border-border rounded-lg px-3 py-2 text-text">
                    <option>Dating</option>
                    <option>Engaged</option>
                    <option>Married</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Anniversary Date</label>
                  <input
                    type="date"
                    className="w-full bg-surfaceElevated border border-border rounded-lg px-3 py-2 text-text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Monthly Budget</label>
                  <select className="w-full bg-surfaceElevated border border-border rounded-lg px-3 py-2 text-text">
                    <option>$100-200</option>
                    <option>$200-300</option>
                    <option>$300-500</option>
                    <option>$500+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Your city"
                    className="w-full bg-surfaceElevated border border-border rounded-lg px-3 py-2 text-text placeholder-textMuted"
                  />
                </div>
              </div>
              
              <Button className="w-full mt-6">Save Preferences</Button>
            </Card>
            
            <StreakWidget streakCount={3} />
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Booking History</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surfaceElevated rounded-lg">
                  <div>
                    <h4 className="font-semibold text-sm">Sunset Harbor Romance</h4>
                    <p className="text-textMuted text-xs">Feb 14, 2024</p>
                  </div>
                  <span className="text-success text-sm">Completed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surfaceElevated rounded-lg">
                  <div>
                    <h4 className="font-semibold text-sm">Rooftop Stargazing</h4>
                    <p className="text-textMuted text-xs">Jan 20, 2024</p>
                  </div>
                  <span className="text-success text-sm">Completed</span>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 min-h-screen bg-surface border-r border-border">
          <nav className="p-4 space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-textMuted hover:text-text hover:bg-surfaceElevated'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border md:hidden"
            >
              <nav className="p-4 space-y-2 pt-20">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-textMuted hover:text-text hover:bg-surfaceElevated'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border md:hidden">
        <div className="flex">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-textMuted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;