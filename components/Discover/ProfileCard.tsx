import React from 'react';
import { MapPin, Hash, Briefcase } from 'lucide-react';
import { User, VerificationLevel } from '../../types';
import { Badge } from '../UI/Badge';

interface ProfileCardProps {
  profile: User & { location: string; category: string };
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col h-full">
      {/* 3-Line Header Stack */}
      <div className="flex items-start gap-3 mb-4">
        <img 
          src={profile.avatar} 
          alt={profile.name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-slate-50 shadow-sm shrink-0"
        />
        
        <div className="flex flex-col min-w-0">
          {/* Line 1: Name + Badge */}
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-frames-navy text-base leading-tight truncate">{profile.name}</h3>
            {profile.badges.map((badge, i) => <Badge key={i} type={badge} size={14} />)}
          </div>
          
          {/* Line 2: Role */}
          <span className="text-[10px] font-bold text-frames-azure uppercase tracking-wider mt-0.5">
            {profile.role}
          </span>

          {/* Line 3: Location */}
          <div className="flex items-center gap-1 text-slate-400 mt-0.5">
            <MapPin size={10} />
            <span className="text-[11px] font-medium truncate">{profile.location}</span>
          </div>
        </div>
      </div>

      {/* Category Pill (Simplified Metadata) */}
      <div className="flex-1">
        <div className="inline-flex items-center gap-1.5 bg-frames-ice text-frames-azure px-3 py-1.5 rounded-lg border border-blue-50/50 mb-6">
          <Hash size={12} className="opacity-70" />
          <span className="text-xs font-semibold">{profile.category}</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-frames-navy text-white text-sm font-bold py-2.5 rounded-lg hover:bg-slate-700 transition-colors shadow-sm shadow-slate-200">
        View Portfolio
      </button>
    </div>
  );
};