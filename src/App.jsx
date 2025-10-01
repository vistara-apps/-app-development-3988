import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Navigation } from './components/Navigation';
import { HomeView } from './views/HomeView';
import { PackagesView } from './views/PackagesView';
import { GemsView } from './views/GemsView';
import { ConciergeView } from './views/ConciergeView';
import { GetawaysView } from './views/GetawaysView';
import { SocialView } from './views/SocialView';

function AppContent() {
  const { state } = useApp();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'packages':
        return <PackagesView />;
      case 'gems':
        return <GemsView />;
      case 'concierge':
        return <ConciergeView />;
      case 'getaways':
        return <GetawaysView />;
      case 'social':
        return <SocialView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <Navigation />
      <main className="animate-fade-in">
        {renderCurrentView()}
      </main>
      
      {/* Notifications */}
      {state.notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {state.notifications.slice(-3).map((notification) => (
            <div
              key={notification.id}
              className={`bg-surface border rounded-lg p-4 shadow-elevated max-w-sm animate-slide-up ${
                notification.type === 'success' ? 'border-success' :
                notification.type === 'error' ? 'border-primary' :
                'border-border'
              }`}
            >
              <p className="text-text text-sm">{notification.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;