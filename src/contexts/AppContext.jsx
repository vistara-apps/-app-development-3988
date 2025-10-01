import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

// Mock data for development
const mockDatePackages = [
  {
    id: 1,
    title: "Golden Hour Rooftop Romance",
    description: "Private rooftop dinner with sunset views, followed by artisan cocktails and a photographer",
    location: "Downtown Arts District",
    price: 180,
    duration: "4 hours",
    activities: ["Fine Dining", "Photography", "Cocktails"],
    venueIds: [1, 2],
    photoSpots: ["Rooftop Garden", "City Skyline View"],
    availability: ["2024-02-14", "2024-02-15", "2024-02-16"],
    categoryTags: ["romantic", "luxury", "photography"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
  },
  {
    id: 2,
    title: "Secret Garden Picnic",
    description: "Hidden botanical garden access with gourmet picnic basket and live acoustic music",
    location: "Botanical Reserve",
    price: 120,
    duration: "3 hours",
    activities: ["Picnic", "Live Music", "Garden Walk"],
    venueIds: [3],
    photoSpots: ["Rose Garden", "Fountain Courtyard"],
    availability: ["2024-02-17", "2024-02-18"],
    categoryTags: ["nature", "music", "intimate"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  },
  {
    id: 3,
    title: "Moonlight Harbor Cruise",
    description: "Private yacht dinner cruise with chef-prepared meals and stargazing deck",
    location: "Marina Bay",
    price: 250,
    duration: "5 hours",
    activities: ["Cruise", "Fine Dining", "Stargazing"],
    venueIds: [4],
    photoSpots: ["Harbor Bridge", "Moonlit Deck"],
    availability: ["2024-02-19", "2024-02-20"],
    categoryTags: ["luxury", "water", "stargazing"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
  }
];

const mockHiddenGems = [
  {
    id: 1,
    title: "Speakeasy Behind the Bookshelf",
    description: "A secret cocktail bar hidden behind a moving bookshelf in the old library district",
    location: "Library Quarter",
    category: "cocktails",
    insiderTips: "Ask for 'The Hemingway' - it's not on the menu but the bartender's specialty",
    bestTime: "Tuesday-Thursday 8-10pm for intimate atmosphere",
    unlockPrice: 5,
    creatorFid: "12345",
    saves: 47,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800",
    isLocked: true
  },
  {
    id: 2,
    title: "Abandoned Lighthouse Viewpoint",
    description: "Historic lighthouse with 360° ocean views, perfect for sunrise proposals",
    location: "Coastal Highway Mile 23",
    category: "scenic",
    insiderTips: "Bring a blanket and coffee thermos. The caretaker arrives at 7am and gives mini history tours",
    bestTime: "30 minutes before sunrise for magical lighting",
    unlockPrice: 8,
    creatorFid: "67890",
    saves: 82,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    isLocked: true
  }
];

const mockGetaways = [
  {
    id: 1,
    title: "Mountain Cabin Retreat",
    description: "Cozy cabin with hot tub, hiking trails, and private chef dinner",
    location: "Pine Valley Mountains",
    price: 450,
    duration: "2 days",
    activities: ["Hot Tub", "Hiking", "Private Chef", "Stargazing"],
    lodging: "Luxury Mountain Cabin",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"
  },
  {
    id: 2,
    title: "Coastal Wine Weekend",
    description: "Vineyard villa with wine tasting, couples massage, and ocean views",
    location: "Sonoma Coast",
    price: 680,
    duration: "3 days",
    activities: ["Wine Tasting", "Couples Massage", "Beach Walk", "Gourmet Dining"],
    lodging: "Vineyard Villa Suite",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  }
];

const initialState = {
  user: null,
  coupleProfile: null,
  datePackages: mockDatePackages,
  hiddenGems: mockHiddenGems,
  getaways: mockGetaways,
  savedSpots: [],
  bookings: [],
  streakCount: 0,
  currentView: 'home',
  notifications: [],
  isLoading: false
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    case 'ADD_BOOKING':
      return { 
        ...state, 
        bookings: [...state.bookings, action.payload],
        streakCount: state.streakCount + 1
      };
    case 'SAVE_SPOT':
      return { 
        ...state, 
        savedSpots: [...state.savedSpots, action.payload] 
      };
    case 'UNLOCK_GEM':
      return {
        ...state,
        hiddenGems: state.hiddenGems.map(gem =>
          gem.id === action.payload.id
            ? { ...gem, isLocked: false }
            : gem
        ),
        savedSpots: [...state.savedSpots, action.payload]
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Simulate user authentication
  useEffect(() => {
    const mockUser = {
      walletAddress: '0x742d35Cc6aB0532013F23cE0a2e5b4e22b7896b4',
      fid: '12345',
      username: 'romantic_wanderer',
      partnerWalletAddress: '0x853d46Dd6BB1563523F31aC5e7A4b6B22c7896c5',
      relationshipMilestone: 'dating',
      preferences: ['romantic', 'adventure', 'luxury'],
      bookingHistory: [],
      streakCount: 0
    };
    dispatch({ type: 'SET_USER', payload: mockUser });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}