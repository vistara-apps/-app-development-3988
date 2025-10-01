export const sampleDatePackages = [
  {
    id: 1,
    title: "Sunset Harbor Romance",
    description: "Waterfront dining, boat tour, and private photo session at golden hour",
    location: "Marina District",
    price: 89,
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&h=300&fit=crop",
    activities: ["Fine dining", "Boat tour", "Photography"],
    availability: ["2024-02-15", "2024-02-16", "2024-02-17"]
  },
  {
    id: 2,
    title: "Rooftop Stargazing",
    description: "Wine tasting, gourmet appetizers, and telescope session under the stars",
    location: "Downtown Heights",
    price: 75,
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
    activities: ["Wine tasting", "Stargazing", "Rooftop dining"],
    availability: ["2024-02-15", "2024-02-16", "2024-02-17"]
  },
  {
    id: 3,
    title: "Art District Adventure",
    description: "Gallery walk, artist studio visit, and creative cocktail experience",
    location: "Arts Quarter",
    price: 65,
    duration: "3.5 hours",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop",
    activities: ["Gallery tour", "Art workshop", "Craft cocktails"],
    availability: ["2024-02-15", "2024-02-16", "2024-02-17"]
  }
];

export const sampleHiddenGems = [
  {
    id: 1,
    title: "Secret Garden Terrace",
    teaser: "Hidden rooftop garden with city views...",
    fullDescription: "A private rooftop garden accessible only through an unmarked door. Features rare plants, string lights, and panoramic city views.",
    location: "Old Town",
    category: "Romantic Spot",
    rating: 4.8,
    unlockPrice: 5,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
    insiderTips: "Visit during sunset for the best lighting. Bring a blanket for the perfect picnic setup.",
    isUnlocked: false
  },
  {
    id: 2,
    title: "Underground Jazz Lounge",
    teaser: "Speakeasy-style venue with live music...",
    fullDescription: "Intimate underground venue with live jazz every Friday. Password required for entry: 'moonlight serenade'.",
    location: "Historic District",
    category: "Nightlife",
    rating: 4.9,
    unlockPrice: 8,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
    insiderTips: "Arrive early for the best seating. The bartender makes incredible vintage cocktails.",
    isUnlocked: false
  }
];

export const sampleSocialPosts = [
  {
    id: 1,
    author: {
      name: "Sarah & Mike",
      avatar: "SM"
    },
    content: "Just had the most magical evening at the Marina! The sunset boat tour was absolutely perfect 🌅",
    timeAgo: "2 hours ago",
    likes: 24,
    comments: 8,
    rating: 5,
    datePackage: {
      id: 1,
      title: "Sunset Harbor Romance",
      location: "Marina District",
      price: 89,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=100&h=100&fit=crop"
    },
    images: [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop"
    ]
  },
  {
    id: 2,
    author: {
      name: "Emma & James",
      avatar: "EJ"
    },
    content: "Anniversary dinner at the rooftop was incredible! The stargazing session made it extra special ⭐",
    timeAgo: "1 day ago",
    likes: 31,
    comments: 12,
    rating: 5,
    datePackage: {
      id: 2,
      title: "Rooftop Stargazing",
      location: "Downtown Heights",
      price: 75,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop"
    }
  }
];

export const sampleWishlist = [
  {
    id: 1,
    title: "Sunset Harbor Romance",
    location: "Marina District",
    type: "package",
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&h=200&fit=crop",
    savedBy: "You"
  },
  {
    id: 2,
    title: "Secret Garden Terrace",
    location: "Old Town",
    type: "gem",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
    savedBy: "Partner"
  }
];