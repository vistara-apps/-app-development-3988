import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, MapPin, Calendar, Star } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export const SocialFeed = ({ posts = [], onLike, onComment, onShare, onSave }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  
  const handleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
    onLike?.(postId);
  };
  
  if (posts.length === 0) {
    return (
      <Card className="text-center py-8">
        <MessageCircle className="w-12 h-12 text-textMuted mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
        <p className="text-textMuted mb-4">
          Be the first to share your romantic experience with the community!
        </p>
        <Button>Share Your Date</Button>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{post.author.name}</h4>
                  <p className="text-textMuted text-xs">{post.timeAgo}</p>
                </div>
              </div>
              
              <p className="mb-3">{post.content}</p>
              
              {post.datePackage && (
                <div className="bg-surfaceElevated rounded-lg p-3 mb-3">
                  <div className="flex gap-3">
                    <img
                      src={post.datePackage.image}
                      alt={post.datePackage.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-sm mb-1">{post.datePackage.title}</h5>
                      <div className="flex items-center gap-1 text-textMuted text-xs mb-1">
                        <MapPin className="w-3 h-3" />
                        <span>{post.datePackage.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-textMuted text-xs">
                        <Star className="w-3 h-3 fill-current text-yellow-400" />
                        <span>{post.rating}/5</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-semibold text-sm">
                        ${post.datePackage.price}
                      </span>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-1 text-xs py-1 px-2 h-6"
                        onClick={() => onSave?.(post.datePackage)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {post.images.map((image, i) => (
                    <img
                      key={i}
                      src={image}
                      alt={`Post image ${i + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      likedPosts.has(post.id) 
                        ? 'text-primary' 
                        : 'text-textMuted hover:text-text'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                    <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                  </button>
                  
                  <button
                    onClick={() => onComment?.(post.id)}
                    className="flex items-center gap-1 text-textMuted hover:text-text text-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                
                <button
                  onClick={() => onShare?.(post)}
                  className="text-textMuted hover:text-text transition-colors"
                >
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};