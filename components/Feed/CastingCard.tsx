import React from 'react';
import { MapPin, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { Post } from '../../types';
import { Badge } from '../UI/Badge';

interface CastingCardProps {
  post: Post;
}

export const CastingCard: React.FC<CastingCardProps> = ({ post }) => {
  if (!post.casting) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-frames-azure/30 transition-all duration-300 p-6 mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-slate-50"
          />
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-frames-navy">{post.author.name}</h3>
              {post.author.badges.map((badge, i) => <Badge key={i} type={badge} />)}
            </div>
            <p className="text-xs text-slate-400">{post.timestamp} • {post.author.role}</p>
          </div>
        </div>
        <span className="bg-frames-azure/10 text-frames-azure text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Casting Call
        </span>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-frames-navy mb-2">{post.content}</h4>
        
        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-frames-ice p-2 rounded-lg">
            <MapPin size={16} className="text-frames-azure" />
            <span>{post.casting.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-frames-ice p-2 rounded-lg">
            <Calendar size={16} className="text-frames-azure" />
            <span>{post.casting.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-frames-ice p-2 rounded-lg">
            <DollarSign size={16} className="text-frames-azure" />
            <span className="font-semibold">{post.casting.rate}</span>
          </div>
           <div className="flex items-center gap-2 text-sm text-slate-600 bg-frames-ice p-2 rounded-lg">
            <Briefcase size={16} className="text-frames-azure" />
            <span>{post.casting.gender}</span>
          </div>
        </div>

        {/* Requirements Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {post.casting.requirements.map((req, index) => (
            <span key={index} className="text-xs text-slate-500 border border-slate-200 px-2 py-1 rounded-md">
              {req}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-slate-100">
        <button className="flex-1 bg-frames-azure text-white font-medium py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors shadow-sm shadow-sky-200">
          Apply Now
        </button>
        <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">
          Save
        </button>
      </div>
    </div>
  );
};