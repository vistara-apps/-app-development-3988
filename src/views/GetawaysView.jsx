import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Star, Users, Car } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { BookingFlow } from '../components/BookingFlow';

export function GetawaysView() {
  const { state } = useApp();
  const [selectedGetaway, setSelectedGetaway] = useState(null);
  const [durationFilter, setDurationFilter] = useState('all');

  const durationOptions = ['all', '2 days', '3 days', '4+ days'];

  const filteredGetaways = durationFilter === 'all' 
    ? state.getaways 
    : state.getaways.filter(getaway => getaway.duration === durationFilter);

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Romantic Getaways</h1>
          <p className="text-textMuted text-lg">
            Escape routine with curated weekend experiences designed for connection
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-lg font-bold text-text">25+</div>
            <div className="text-sm text-textMuted">Destinations</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <Calendar className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-lg font-bold text-text">2-4</div>
            <div className="text-sm text-textMuted">Day Packages</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <Car className="w-6 h-6 text-warning mx-auto mb-2" />
            <div className="text-lg font-bold text-text">3hr</div>
            <div className="text-sm text-textMuted">Max Drive</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <Star className="w-6 h-6 text-success mx-auto mb-2" />
            <div className="text-lg font-bold text-text">4.9</div>
            <div className="text-sm text-textMuted">Avg Rating</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-textMuted" />
              <span className="text-text font-medium">Duration:</span>
            </div>
            {durationOptions.map((duration) => (
              <button
                key={duration}
                onClick={() => setDurationFilter(duration)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  durationFilter === duration
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-textMuted text-text'
                }`}
              >
                {duration === 'all' ? 'All Durations' : duration}
              </button>
            ))}
          </div>
        </div>

        {/* Getaways Grid */}
        {filteredGetaways.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredGetaways.map((getaway) => (
              <div key={getaway.id} className="card card-hover bg-surface border border-border rounded-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={getaway.image}
                    alt={getaway.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ${getaway.price}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {getaway.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text mb-2">{getaway.title}</h3>
                  <p className="text-textMuted text-sm mb-4 leading-relaxed">{getaway.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-textMuted mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{getaway.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>2 Guests</span>
                    </div>
                  </div>

                  {/* Lodging */}
                  <div className="bg-surfaceElevated rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-text text-sm mb-2">Accommodation</h4>
                    <p className="text-textMuted text-sm">{getaway.lodging}</p>
                  </div>

                  {/* Activities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-text text-sm mb-3">Included Activities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {getaway.activities.slice(0, 4).map((activity) => (
                        <div key={activity} className="flex items-center space-x-2 text-sm text-textMuted">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          <span>{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sample Itinerary */}
                  <div className="bg-surfaceElevated rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-text text-sm mb-3">Sample Itinerary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold">1</div>
                        <div>
                          <div className="text-text font-medium">Arrival & Check-in</div>
                          <div className="text-textMuted">Welcome cocktails, room tour, sunset viewing</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent text-xs font-bold">2</div>
                        <div>
                          <div className="text-text font-medium">Morning Adventures</div>
                          <div className="text-textMuted">Private activities, couple's experiences</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center text-warning text-xs font-bold">3</div>
                        <div>
                          <div className="text-text font-medium">Departure</div>
                          <div className="text-textMuted">Farewell breakfast, checkout memories</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedGetaway(getaway)}
                      className="btn-primary flex-1 flex items-center justify-center space-x-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Getaway</span>
                    </button>
                    <button className="btn-secondary px-6">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-textMuted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">No getaways found</h3>
            <p className="text-textMuted">Try adjusting your filters</p>
          </div>
        )}

        {/* Why Choose Our Getaways */}
        <section className="mt-16 bg-surfaceElevated rounded-lg p-8">
          <h2 className="text-2xl font-bold text-text mb-6 text-center">Why Choose DateBase Getaways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-text mb-2">Fully Planned</h3>
              <p className="text-textMuted text-sm">
                Complete itineraries with accommodation, meals, and activities all coordinated
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-text mb-2">Romance Focused</h3>
              <p className="text-textMuted text-sm">
                Every detail designed to enhance connection and create lasting memories
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-text mb-2">Curated Quality</h3>
              <p className="text-textMuted text-sm">
                Hand-selected venues and experiences that exceed expectations
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Additions */}
        <section className="mt-12 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-text mb-2">
              🏖️ New Coastal Getaways Coming Soon
            </h3>
            <p className="text-textMuted mb-4">
              Beachfront villas, private yacht charters, and seaside adventures launching next month
            </p>
            <button className="btn-secondary">
              Get Early Access
            </button>
          </div>
        </section>
      </div>

      {/* Booking Flow Modal */}
      {selectedGetaway && (
        <BookingFlow
          package={selectedGetaway}
          onClose={() => setSelectedGetaway(null)}
          variant="getaway"
        />
      )}
    </div>
  );
}