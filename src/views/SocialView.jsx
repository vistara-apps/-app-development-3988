import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Users, TrendingUp, Camera, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function SocialView() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('feed');

  const mockPosts = [
    {
      id: 1,
      author: { username: 'romantic_wanderers', fid: '12345' },
      content: 'Just had the most magical evening at the Golden Hour Rooftop Romance package! The sunset views were incredible and the photographer captured our love perfectly. 💕',
      images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600'],
      relatedPackage: state.datePackages[0],
      likes: 47,
      comments: 12,
      shares: 8,
      timestamp: '2 hours ago',
      tags: ['romantic', 'rooftop', 'photography']
    },
    {
      id: 2,
      author: { username: 'adventure_couple', fid: '67890' },
      content: 'Discovered this hidden gem last weekend - the secret garden picnic was absolutely dreamy! The live acoustic music made it so special. Thanks DateBase! 🌹',
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'],
      relatedPackage: state.datePackages[1],
      likes: 63,
      comments: 18,
      shares: 15,
      timestamp: '1 day ago',
      tags: ['nature', 'picnic', 'music']
    }
  ];

  const mockCouples = [
    {
      id: 1,
      names: 'Sarah & Mike',
      username: 'sarahandmike',
      coupleSince: '2019-06-15',
      streak: 8,
      favoriteCategory: 'Luxury',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      recentDates: 3
    },
    {
      id: 2,
      names: 'Emma & James',
      username: 'emmajames',
      coupleSince: '2020-02-14',
      streak: 12,
      favoriteCategory: 'Adventure',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      recentDates: 5
    }
  ];

  const tabs = [
    { id: 'feed', label: 'Feed', icon: Heart },
    { id: 'couples', label: 'Couples', icon: Users },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'trending', label: 'Trending', icon: TrendingUp }
  ];

  const handleLike = (postId) => {
    // Handle like action
    console.log('Liked post:', postId);
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: `Date experience by ${post.author.username}`,
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out this date experience: ${post.content}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Social Feed</h1>
          <p className="text-textMuted text-lg">
            Connect with other couples and share your romantic adventures
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-surface border border-border rounded-lg p-2 mb-8">
          <div className="flex space-x-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                  activeTab === id
                    ? 'bg-primary text-white'
                    : 'text-textMuted hover:text-text hover:bg-surfaceElevated'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {/* Create Post */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <button className="w-full text-left px-4 py-3 bg-surfaceElevated border border-border rounded-lg text-textMuted hover:bg-surfaceElevated/80 transition-colors">
                    Share your latest date experience...
                  </button>
                </div>
                <button className="p-3 bg-primary text-white rounded-lg hover:bg-primaryHover transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Posts */}
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-surface border border-border rounded-lg overflow-hidden">
                {/* Post Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-text">@{post.author.username}</div>
                      <div className="text-textMuted text-sm">{post.timestamp}</div>
                    </div>
                    <button className="text-textMuted hover:text-text">
                      <Share className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-text mb-4">{post.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-surfaceElevated text-textMuted text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Images */}
                {post.images && (
                  <div className="px-6">
                    <img
                      src={post.images[0]}
                      alt="Date experience"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Related Package */}
                {post.relatedPackage && (
                  <div className="mx-6 mt-4 bg-surfaceElevated border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.relatedPackage.image}
                        alt={post.relatedPackage.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-text text-sm">{post.relatedPackage.title}</div>
                        <div className="text-textMuted text-xs flex items-center space-x-2">
                          <MapPin className="w-3 h-3" />
                          <span>{post.relatedPackage.location}</span>
                          <span>•</span>
                          <span>${post.relatedPackage.price}</span>
                        </div>
                      </div>
                      <button className="btn-primary text-xs px-3 py-1">
                        Book
                      </button>
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className="p-6 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 text-textMuted hover:text-primary transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-textMuted hover:text-accent transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post)}
                        className="flex items-center space-x-2 text-textMuted hover:text-warning transition-colors"
                      >
                        <Share className="w-5 h-5" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                    <button className="text-textMuted hover:text-text transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'couples' && (
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-text mb-4">Featured Couples</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockCouples.map((couple) => (
                  <div key={couple.id} className="bg-surfaceElevated border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={couple.avatar}
                        alt={couple.names}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-text">{couple.names}</div>
                        <div className="text-textMuted text-sm">@{couple.username}</div>
                      </div>
                      <button className="btn-secondary text-xs px-3 py-1">
                        Follow
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary">{couple.streak}</div>
                        <div className="text-xs text-textMuted">Month Streak</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent">{couple.recentDates}</div>
                        <div className="text-xs text-textMuted">Recent Dates</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-warning">2019</div>
                        <div className="text-xs text-textMuted">Together Since</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="text-sm text-textMuted">
                        Loves: <span className="text-text">{couple.favoriteCategory}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="text-center py-16">
            <Bookmark className="w-16 h-16 text-textMuted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">Your Saved Spots</h3>
            <p className="text-textMuted">
              Your saved date packages and hidden gems will appear here
            </p>
            <div className="mt-6">
              <p className="text-sm text-textMuted">
                {state.savedSpots.length} saved spot{state.savedSpots.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-text mb-4">Trending This Week</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div className="flex-1">
                    <div className="font-medium text-text">#rooftop</div>
                    <div className="text-textMuted text-sm">245 posts</div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div className="flex-1">
                    <div className="font-medium text-text">#hiddengem</div>
                    <div className="text-textMuted text-sm">189 posts</div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div className="flex-1">
                    <div className="font-medium text-text">#anniversary</div>
                    <div className="text-textMuted text-sm">156 posts</div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}