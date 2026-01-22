import React, { useState } from 'react';
import { Home, Search, Briefcase, MessageSquare, Bell, User, Sparkles } from 'lucide-react';
import { User as UserType } from '../../types';
import { generateProfessionalBio } from '../../services/geminiService';
import { NotificationBadge } from '../UI/NotificationBadge';

interface SidebarProps {
  user: UserType;
  activeView: string;
  onNavigate: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, activeView, onNavigate }) => {
  const [showAiModal, setShowAiModal] = useState(false);
  const [bioDraft, setBioDraft] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock Notification Counts
  const notificationCounts: Record<string, number> = {
    MESSAGES: 3,
    NOTIFICATIONS: 12,
  };

  const navItems = [
    { id: 'FEED', icon: Home, label: 'Social Feed' },
    { id: 'DISCOVER', icon: Search, label: 'Discover' },
    { id: 'JOBS', icon: Briefcase, label: 'Job Board' },
    { id: 'MESSAGES', icon: MessageSquare, label: 'Messages' },
    { id: 'NOTIFICATIONS', icon: Bell, label: 'Notifications' },
    { id: 'PROFILE', icon: User, label: 'Profile' },
  ];

  const handleAiAssist = async () => {
    if(!bioDraft) return;
    setLoading(true);
    const result = await generateProfessionalBio(bioDraft, user.role);
    setAiResult(result);
    setLoading(false);
  }

  return (
    <div className="w-64 fixed h-screen p-6 border-r border-slate-200 flex flex-col justify-between bg-white z-10 hidden md:flex">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-frames-azure rounded-lg flex items-center justify-center">
             <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-frames-navy">Frames.</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            const count = notificationCounts[item.id] || 0;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                  isActive
                    ? 'bg-frames-ice text-frames-azure font-medium'
                    : 'text-slate-500 hover:bg-frames-ice hover:text-frames-azure'
                }`}
              >
                {/* Active Indicator Bar (3px width) */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] bg-frames-azure rounded-r-md"></div>
                )}
                
                {/* Icon Wrapper for Badge Positioning */}
                <div className="relative">
                  <item.icon 
                    size={20} 
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-frames-azure' : 'group-hover:text-frames-azure text-slate-400'
                    }`} 
                  />
                  <NotificationBadge count={count} />
                </div>
                
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* AI Tool */}
      <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 mb-2 text-frames-navy font-semibold text-sm">
          <Sparkles size={16} className="text-amber-500" />
          <span>Frames AI Assistant</span>
        </div>
        <p className="text-xs text-slate-500 mb-3">Optimize your bio for professional agencies.</p>
        <button 
          onClick={() => setShowAiModal(true)}
          className="w-full bg-white border border-slate-200 text-frames-navy text-xs font-medium py-2 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
        >
          Refine Bio
        </button>
      </div>

      {/* Mini Profile */}
      <div className="flex items-center gap-3 pt-6 border-t border-slate-100 cursor-pointer hover:opacity-80 transition-opacity">
        <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full" />
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-semibold text-frames-navy truncate">{user.name}</p>
          <p className="text-xs text-slate-400 truncate">@{user.handle}</p>
        </div>
        {user.badges.includes('PROFESSIONAL_VERIFIED' as any) && (
             <div title="Verified Pro" className="w-2 h-2 rounded-full bg-emerald-500"></div>
        )}
      </div>

      {/* AI Modal Overlay */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
           <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-frames-navy mb-4 flex items-center gap-2">
                 <Sparkles className="text-frames-azure" size={20} />
                 Bio Enhancer
              </h3>
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Your Draft</label>
                    <textarea 
                      className="w-full mt-1 p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-frames-azure/20"
                      rows={4}
                      value={bioDraft}
                      onChange={(e) => setBioDraft(e.target.value)}
                      placeholder="e.g. I take photos and do videos. Looking for work."
                    />
                 </div>
                 {aiResult && (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                       <label className="text-xs font-semibold text-green-700 uppercase">Professional Version</label>
                       <p className="text-sm text-green-900 mt-1">{aiResult}</p>
                    </div>
                 )}
                 <div className="flex justify-end gap-2 pt-2">
                    <button 
                      onClick={() => setShowAiModal(false)}
                      className="px-4 py-2 text-slate-500 text-sm hover:bg-slate-50 rounded-lg"
                    >
                      Close
                    </button>
                    <button 
                      onClick={handleAiAssist}
                      disabled={loading}
                      className="px-4 py-2 bg-frames-azure text-white text-sm font-medium rounded-lg hover:bg-sky-600 disabled:opacity-50"
                    >
                      {loading ? 'Generating...' : 'Enhance'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};