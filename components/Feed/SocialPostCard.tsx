import React, { useState } from 'react';
import { MapPin, Heart, MessageCircle, Share2, Lock, Unlock, Eye, EyeOff, Hash } from 'lucide-react';
import { Post, PostType } from '../../types';
import { Badge } from '../UI/Badge';

interface SocialPostCardProps {
  post: Post;
}

export const SocialPostCard: React.FC<SocialPostCardProps> = ({ post }) => {
  const [isBlurred, setIsBlurred] = useState(post.media?.isSensitive || false);
  
  if (post.type === PostType.CASTING) return null;

  const isPremium = post.type === PostType.PREMIUM;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mb-6">
      
      {/* 1. HEADER SECTION: Vertical Hierarchy */}
      <div className="p-5 pb-3 flex justify-between items-start">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-slate-50 shadow-sm"
          />
          
          {/* Vertical Text Stack */}
          <div className="flex flex-col">
            {/* Line 1: Name + Badge */}
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-frames-navy text-base leading-tight">{post.author.name}</h3>
              {post.author.badges.map((badge, i) => <Badge key={i} type={badge} size={14} />)}
            </div>
            
            {/* Line 2: Role */}
            <span className="text-[10px] font-bold text-frames-azure uppercase tracking-wider mt-0.5">
              {post.author.role}
            </span>

            {/* Line 3: Location */}
            {post.social?.location && (
              <div className="flex items-center gap-1 text-slate-400 mt-0.5">
                <MapPin size={10} />
                <span className="text-[11px] font-medium">{post.social.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Optional: Premium Indicator Top Right */}
        {isPremium && (
          <div className="bg-frames-navy/5 px-2 py-0.5 rounded text-[10px] font-bold text-frames-navy uppercase tracking-wide">
            Premium
          </div>
        )}
      </div>

      {/* 2. MEDIA CONTENT AREA */}
      {post.media && (
        <div className="relative w-full aspect-[4/3] bg-slate-50 group mt-1">
          {post.media.isSensitive && (
            <button 
              onClick={(e) => { e.stopPropagation(); setIsBlurred(!isBlurred); }}
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-all"
            >
              {isBlurred ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          )}

          <img 
            src={post.media.thumbnail} 
            alt="Content"
            className={`w-full h-full object-cover transition-all duration-500 ${isBlurred ? 'blur-2xl scale-105' : 'blur-0'}`}
          />
          
          {/* Lock Overlay for Premium */}
          {post.media.isLocked && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-6">
              <div className="bg-white/10 p-4 rounded-full border border-white/20 backdrop-blur-md mb-3 shadow-xl">
                <Lock size={24} className="text-white" />
              </div>
              <h3 className="text-white font-bold text-lg">Subscribers Only</h3>
            </div>
          )}
        </div>
      )}

      <div className="p-5 pt-4">
        {/* 3. CONTENT & DESCRIPTION */}
        <p className="text-frames-navy text-sm leading-relaxed mb-3">
          {post.content}
        </p>

        {/* 4. INFORMATION PILLS (Simplified) */}
        {/* We only show Category here to keep it clean, as requested */}
        {post.social?.category && (
          <div className="flex gap-2 mb-5">
            <div className="flex items-center gap-1.5 bg-frames-ice text-frames-azure px-3 py-1.5 rounded-lg border border-blue-50/50">
              <Hash size={12} className="opacity-70" />
              <span className="text-xs font-semibold">{post.social.category}</span>
            </div>
          </div>
        )}

        {/* 5. INTERACTION BAR (Footer) */}
        <div className="flex items-center gap-3 pt-1">
           {/* Primary Full-Width Button */}
           <button 
             className={`flex-1 h-11 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
               isPremium 
                 ? 'bg-frames-azure text-white hover:bg-sky-600 shadow-sky-100' 
                 : 'bg-frames-navy text-white hover:bg-slate-700 shadow-slate-200'
             }`}
           >
             {isPremium ? (
               <>
                 <Unlock size={16} /> Unlock Full Set ${post.media?.price}
               </>
             ) : (
               <>
                 <MessageCircle size={18} /> Message for Collab
               </>
             )}
           </button>

           {/* Secondary Minimalist Icons */}
           <div className="flex items-center gap-1">
             <button className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all border border-transparent hover:border-pink-100">
               <Heart size={20} />
             </button>
             <button className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-frames-azure hover:bg-blue-50 rounded-full transition-all border border-transparent hover:border-blue-100">
               <Share2 size={20} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};