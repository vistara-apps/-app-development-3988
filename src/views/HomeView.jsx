import React from 'react';
import { Heart, Sparkles, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { DateCard } from '../components/DateCard';
import { GemFrame } from '../components/GemFrame';

export function HomeView() {
  const { state, dispatch } = useApp();

  const featuredPackages = state.datePackages.slice(0, 3);
  const featuredGems = state.hiddenGems.slice(0, 2);

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/20 via-accent/10 to-bg">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text mb-6 animate-fade-in">
            Curated Romantic
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text block">
              Experiences
            </span>
          </h1>
          <p className="text-xl text-textMuted mb-8 max-w-2xl mx-auto leading-relaxed">
            Book perfect date nights, discover hidden gems, and create unforgettable moments—all in seconds, right from your wallet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'packages' })}
              className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <Calendar className="w-5 h-5" />
              <span>Browse Date Packages</span>
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'gems' })}
              className="btn-secondary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <MapPin className="w-5 h-5" />
              <span>Discover Hidden Gems</span>
            </button>
          </div>
        </div>

        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-primary/20 animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-textMuted">Curated Experiences</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">10K+</div>
              <div className="text-textMuted">Happy Couples</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-warning">150</div>
              <div className="text-textMuted">Hidden Gems</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-success">98%</div>
              <div className="text-textMuted">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Date Packages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text mb-2">Featured Date Packages</h2>
              <p className="text-textMuted">Perfect romantic evenings, curated just for you</p>
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'packages' })}
              className="text-primary hover:text-primaryHover transition-colors font-semibold"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <DateCard key={pkg.id} package={pkg} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Hidden Gems Preview */}
      <section className="py-16 bg-surfaceElevated">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text mb-2">Hidden Romantic Gems</h2>
              <p className="text-textMuted">Secret spots locals love to keep to themselves</p>
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'gems' })}
              className="text-accent hover:text-accent/80 transition-colors font-semibold"
            >
              Explore More →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGems.map((gem) => (
              <GemFrame key={gem.id} gem={gem} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">How DateBase Works</h2>
            <p className="text-textMuted text-lg">From discovery to memories in just three steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Discover</h3>
              <p className="text-textMuted">Browse curated date packages and hidden gems in your area</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Book</h3>
              <p className="text-textMuted">One-tap booking with USDC—everything confirmed instantly</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Experience</h3>
              <p className="text-textMuted">Show up and enjoy—we handle all the coordination</p>
            </div>
          </div>
        </div>
      </section>

      {/* Date Night Ritual CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-text mb-4">Never Miss Date Night Again</h2>
          <p className="text-textMuted text-lg mb-8">
            Set up monthly date night rituals and build your romantic streak. Get personalized recommendations and unlock couple rewards.
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'concierge' })}
            className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 text-lg mx-auto"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Start Your Ritual</span>
          </button>
        </div>
      </section>
    </div>
  );
}