import React from 'react';
import { Camera, Briefcase, Heart, Sparkles } from 'lucide-react';

interface RoleSelectionProps {
  selectedRole: string | null;
  onSelect: (role: string) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ selectedRole, onSelect }) => {
  const roles = [
    { id: 'CREATOR', label: 'Creator', icon: Sparkles, desc: 'Monetize content & network' },
    { id: 'PHOTOGRAPHER', label: 'Photographer', icon: Camera, desc: 'Build portfolio & find talent' },
    { id: 'AGENCY', label: 'Agency', icon: Briefcase, desc: 'Scout talent & post jobs' },
    { id: 'FAN', label: 'Fan / Scout', icon: Heart, desc: 'Discover & support talent' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelect(role.id)}
          className={`p-5 rounded-xl border-2 text-left transition-all duration-200 group ${
            selectedRole === role.id
              ? 'border-frames-azure bg-frames-ice shadow-sm ring-1 ring-frames-azure'
              : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-md'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors ${
             selectedRole === role.id ? 'bg-frames-azure text-white' : 'bg-slate-50 text-slate-400 group-hover:text-frames-azure group-hover:bg-blue-50'
          }`}>
            <role.icon size={20} />
          </div>
          <h3 className={`font-bold text-sm ${selectedRole === role.id ? 'text-frames-navy' : 'text-slate-700'}`}>
            {role.label}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{role.desc}</p>
        </button>
      ))}
    </div>
  );
};