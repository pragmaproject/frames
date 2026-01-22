import React, { useState } from 'react';
import { Heart, UserPlus, Briefcase, Unlock, Eye, Info } from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'PROFESSIONAL',
    icon: Briefcase,
    title: 'New Casting Match',
    description: 'Lumina Agency posted a casting call matching your profile.',
    time: '2h ago',
    read: false
  },
  {
    id: 2,
    type: 'PREMIUM',
    icon: Unlock,
    title: 'Content Unlocked',
    description: 'User @johndoe unlocked your "Studio Sessions" set ($15.00).',
    time: '3h ago',
    read: false
  },
  {
    id: 3,
    type: 'SOCIAL',
    icon: Heart,
    title: 'New Like',
    description: 'Sarah V. liked your recent post.',
    time: '5h ago',
    read: true
  },
  {
    id: 4,
    type: 'PROFESSIONAL',
    icon: UserPlus,
    title: 'Profile View',
    description: 'Top scout from Elite Models viewed your profile.',
    time: '1d ago',
    read: true
  },
   {
    id: 5,
    type: 'PREMIUM',
    icon: Eye,
    title: 'Traffic Spike',
    description: 'Your profile views are up 20% this week.',
    time: '2d ago',
    read: true
  }
];

const FILTERS = ['All', 'Professional', 'Social', 'Premium'];

export const NotificationsView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredNotifications = NOTIFICATIONS.filter(n => 
    activeFilter === 'All' || n.type === activeFilter.toUpperCase()
  );

  const getIconColor = (type: string) => {
    switch(type) {
        case 'PROFESSIONAL': return 'text-frames-azure bg-frames-ice';
        case 'PREMIUM': return 'text-amber-500 bg-amber-50';
        case 'SOCIAL': return 'text-pink-500 bg-pink-50';
        default: return 'text-slate-500 bg-slate-100';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header & Filter */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-frames-navy">Notifications</h2>
        <button className="text-xs text-frames-azure font-medium hover:underline">Mark all as read</button>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
              activeFilter === filter
                ? 'bg-frames-azure text-white border-frames-azure shadow-md shadow-sky-100'
                : 'bg-white text-slate-500 border-slate-200 hover:border-frames-azure hover:text-frames-azure'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredNotifications.map((notif) => (
          <div 
            key={notif.id}
            className={`p-4 rounded-xl border flex gap-4 transition-all hover:shadow-md ${notif.read ? 'bg-white border-slate-100' : 'bg-blue-50/30 border-blue-100'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getIconColor(notif.type)}`}>
               <notif.icon size={20} />
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-start">
                 <h4 className={`text-sm font-semibold ${notif.read ? 'text-frames-navy' : 'text-frames-azure'}`}>{notif.title}</h4>
                 <span className="text-[10px] text-slate-400 font-medium">{notif.time}</span>
               </div>
               <p className="text-xs text-slate-500 mt-1">{notif.description}</p>
            </div>
            {!notif.read && (
                <div className="self-center">
                    <div className="w-2 h-2 rounded-full bg-frames-azure"></div>
                </div>
            )}
          </div>
        ))}

        {filteredNotifications.length === 0 && (
            <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-slate-100 border-dashed">
                <Info size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notifications in this category.</p>
            </div>
        )}
      </div>
    </div>
  );
};