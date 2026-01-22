import React from 'react';
import { Lock, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '../../types';
import { Badge } from '../UI/Badge';

interface ContentCardProps {
  post: Post;
}

export const ContentCard: React.FC<ContentCardProps> = ({ post }) => {
  if (!post.media) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-0 mb-4 overflow-hidden">
       {/* Minimal Header */}
       <div className="flex items-center gap-3 p-4">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
             <div className="flex items-center gap-1">
              <h3 className="font-semibold text-frames-navy text-sm">{post.author.name}</h3>
              {post.author.badges.map((badge, i) => <Badge key={i} type={badge} />)}
            </div>
            <p className="text-xs text-slate-400">@{post.author.handle}</p>
          </div>
       </div>

      {/* Media Content */}
      <div className="relative aspect-[4/3] bg-slate-900 w-full group cursor-pointer">
        {post.media.isLocked ? (
          <>
            {/* Blurry Background */}
            <img 
              src={post.media.thumbnail} 
              className="w-full h-full object-cover opacity-30 blur-xl"
              alt="Locked content" 
            />
            {/* Lock Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-all group-hover:bg-black/50">
               <div className="bg-white/10 p-4 rounded-full mb-3 backdrop-blur-md border border-white/20">
                  <Lock className="text-white" size={32} />
               </div>
               <p className="text-white font-medium mb-4">Unlock this post</p>
               <button className="bg-frames-azure text-white px-6 py-2 rounded-full font-bold hover:bg-sky-500 transition-colors flex items-center gap-2">
                 Unlock for ${post.media.price}
               </button>
            </div>
          </>
        ) : (
           <img 
              src={post.media.thumbnail} 
              className="w-full h-full object-cover"
              alt="Content" 
            />
        )}
      </div>

      {/* Caption & Actions */}
      <div className="p-4">
        <p className="text-frames-navy text-sm mb-3">{post.content}</p>
        <div className="flex items-center justify-between text-slate-500">
           <div className="flex gap-4">
              <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                <Heart size={18} /> <span className="text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-frames-azure transition-colors">
                <MessageCircle size={18} /> <span className="text-xs">{post.comments}</span>
              </button>
           </div>
           <button className="hover:text-frames-navy transition-colors">
             <Share2 size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};