import React, { useState } from 'react';
import { Search, Filter, MapPin, DollarSign } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { DateCard } from '../components/DateCard';
import { BookingFlow } from '../components/BookingFlow';

export function PackagesView() {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const categories = ['all', 'romantic', 'luxury', 'adventure', 'nature', 'photography'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100', label: 'Under $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ];

  const filteredPackages = state.datePackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           pkg.categoryTags.includes(selectedCategory);
    
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === '0-100' && pkg.price < 100) ||
                        (priceRange === '100-200' && pkg.price >= 100 && pkg.price <= 200) ||
                        (priceRange === '200+' && pkg.price > 200);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Date Packages</h1>
          <p className="text-textMuted text-lg">
            Curated romantic experiences ready to book in seconds
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted w-5 h-5" />
              <input
                type="text"
                placeholder="Search date packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surfaceElevated border border-border rounded-lg text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surfaceElevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted w-5 h-5" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surfaceElevated border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-textMuted">
            {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found
          </p>
          
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-textMuted" />
            <span className="text-sm text-textMuted">San Francisco Bay Area</span>
          </div>
        </div>

        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <DateCard 
                key={pkg.id} 
                package={pkg} 
                onBookClick={() => setSelectedPackage(pkg)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-textMuted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">No packages found</h3>
            <p className="text-textMuted">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Featured Categories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-text mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.filter(cat => cat !== 'all').map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-lg border text-center transition-colors ${
                  selectedCategory === category
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-surface hover:bg-surfaceElevated text-text'
                }`}
              >
                <div className="text-sm font-medium capitalize">{category}</div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Booking Flow Modal */}
      {selectedPackage && (
        <BookingFlow
          package={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
}