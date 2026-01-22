import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { RightPanel } from './components/Layout/RightPanel';
import { CastingCard } from './components/Feed/CastingCard';
import { SocialPostCard } from './components/Feed/SocialPostCard';
import { DiscoverFeed } from './components/Discover/DiscoverFeed';
import { MessagesView } from './components/Messages/MessagesView';
import { NotificationsView } from './components/Notifications/NotificationsView';
import { ProfileView } from './components/Profile/ProfileView';
import { AuthScreen } from './components/Auth/AuthScreen';
import { CURRENT_USER, MOCK_POSTS } from './constants';
import { PostType } from './types';
import { Menu, Briefcase, Hash, Search } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('FEED'); // 'FEED' | 'JOBS' | 'DISCOVER' | 'MESSAGES' | 'NOTIFICATIONS' | 'PROFILE'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If not authenticated, show the Auth Flow
  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  // Filter posts based on active View
  const displayedPosts = MOCK_POSTS.filter(post => {
    if (activeView === 'JOBS') {
      return post.type === PostType.CASTING;
    } else if (activeView === 'FEED') {
      return post.type === PostType.SOCIAL || post.type === PostType.PREMIUM;
    }
    return false;
  });

  const getHeaderTitle = () => {
    switch(activeView) {
      case 'JOBS': return 'Job Board & Castings';
      case 'DISCOVER': return 'Discover Talent';
      case 'MESSAGES': return 'Messages';
      case 'NOTIFICATIONS': return 'Notifications';
      case 'PROFILE': return 'My Profile';
      default: return 'Professional Feed';
    }
  };

  const renderContent = () => {
    if (activeView === 'DISCOVER') return <DiscoverFeed />;
    if (activeView === 'MESSAGES') return <MessagesView />;
    if (activeView === 'NOTIFICATIONS') return <NotificationsView />;
    if (activeView === 'PROFILE') return <ProfileView user={CURRENT_USER} />;

    return (
      <>
        {/* Context Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
           <div>
             <h3 className="font-bold text-frames-navy text-lg mb-1">
               {activeView === 'JOBS' ? 'Find Your Next Opportunity' : 'Network & Discover'}
             </h3>
             <p className="text-slate-500 text-sm">
               {activeView === 'JOBS' 
                 ? 'Browse verified casting calls from top agencies.' 
                 : 'Connect with professionals, see BTS, and unlock exclusives.'}
             </p>
           </div>
           <div className="w-12 h-12 bg-frames-ice rounded-full flex items-center justify-center">
              {activeView === 'JOBS' 
                  ? <Briefcase className="text-frames-azure" size={24} />
                  : <Hash className="text-frames-azure" size={24} />
              }
           </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {displayedPosts.length > 0 ? (
            displayedPosts.map(post => {
               if (post.type === PostType.CASTING) {
                  return <CastingCard key={post.id} post={post} />;
               }
               return <SocialPostCard key={post.id} post={post} />;
            })
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                  <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-slate-600 font-medium">No posts found in this section.</h3>
              <p className="text-slate-400 text-sm mt-2">Try switching tabs or checking back later.</p>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-frames-ice">
      {/* Sidebar Navigation */}
      <Sidebar 
        user={CURRENT_USER} 
        activeView={activeView} 
        onNavigate={(view) => {
            setActiveView(view);
            window.scrollTo(0, 0);
        }}
      />

      {/* Main Layout Grid */}
      <div className="md:pl-64 lg:pr-80 min-h-screen transition-all duration-300">
        
        {/* Top Header (Sticky) */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Trigger */}
             <button className="md:hidden text-frames-navy" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               <Menu size={24} />
             </button>
             <h2 className="text-lg font-bold text-frames-navy">
               {getHeaderTitle()}
             </h2>
          </div>
          
          <div className="hidden md:flex items-center text-xs font-medium text-slate-400">
             Frames v1.0 • Professional Network
          </div>
        </header>

        {/* Main Content Area */}
        {activeView === 'PROFILE' ? (
           // Profile view takes full width inside main area, no padding container here
           <main>
             {renderContent()}
           </main>
        ) : (
           <main className="max-w-2xl mx-auto px-4 py-8">
             {renderContent()}
           </main>
        )}
      </div>

      {/* Right Discovery Panel */}
      <RightPanel isProfessionalMode={activeView === 'JOBS'} />
    </div>
  );
};

export default App;