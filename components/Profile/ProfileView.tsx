import React, { useState } from 'react';
import { MapPin, Globe, Instagram, Twitter, ShieldCheck, Lock, Star, MessageCircle, Eye, EyeOff, Send, X, Briefcase } from 'lucide-react';
import { User, PostType, VerificationLevel } from '../../types';
import { Badge } from '../UI/Badge';
import { SocialPostCard } from '../Feed/SocialPostCard';
import { MOCK_POSTS } from '../../constants';

interface ProfileViewProps {
  user: User;
}

// Mock Data specific to Profile Page
const PROFILE_EXTENDED = {
  coverImage: 'https://picsum.photos/1200/400?grayscale',
  availability: 'Disponibile per Set',
  stats: [
    { label: 'Height', value: '175cm' },
    { label: 'Ethnicity', value: 'Latin / Mixed' },
    { label: 'Languages', value: 'English, Spanish' },
    { label: 'Location', value: 'Milan, Italy' },
  ],
  bio: "Professional visual artist and creator focusing on high-fashion editorial and artistic nude photography. My work explores the contrast between industrial architecture and organic forms.\n\nOpen for commercial bookings and verified collaborations only.",
  socialProof: "Followed by Lumina Agency, Elite Models + 12 others",
  socials: [
    { icon: Instagram, label: 'Instagram', link: '#' },
    { icon: Twitter, label: 'X', link: '#' },
    { icon: Globe, label: 'Website', link: '#' },
  ]
};

const REVIEWS = [
  { id: 1, author: 'Lumina Agency', rating: 5, text: 'Exceptional professionalism on set. Punctual and prepared.', date: 'Oct 2023' },
  { id: 2, author: 'Marco Ph.', rating: 5, text: 'Great energy and easy to work with. Highly recommended.', date: 'Sep 2023' },
];

const PREMIUM_PREVIEWS = [1, 2, 3, 4, 5, 6];

export const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  // Default to PORTFOLIO as requested
  const [activeTab, setActiveTab] = useState<'FEED' | 'PORTFOLIO' | 'PREMIUM' | 'REVIEWS'>('PORTFOLIO');
  const [sfwMode, setSfwMode] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Filter posts for the Feed tab
  const feedPosts = MOCK_POSTS.filter(p => p.type !== PostType.CASTING);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    alert(`Message sent to ${user.name}: ${messageText}`);
    setShowMessageModal(false);
    setMessageText('');
  };

  return (
    <div className="bg-white min-h-screen pb-20 relative">

      {/* --- MESSAGING MODAL OVERLAY --- */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-frames-navy/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
                {/* Modal Header */}
                <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                            <img src={user.avatar} className="w-10 h-10 rounded-full border border-slate-200 object-cover" alt="Avatar" />
                            <div>
                                <h3 className="font-bold text-frames-navy text-sm">Message {user.name}</h3>
                                <p className="text-xs text-slate-500">Professional Inquiry</p>
                            </div>
                    </div>
                    <button 
                        onClick={() => setShowMessageModal(false)} 
                        className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-frames-navy transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
                {/* Modal Body */}
                <form onSubmit={handleSendMessage} className="p-5">
                    <textarea 
                        className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-frames-navy focus:outline-none focus:bg-white focus:border-frames-azure focus:ring-2 focus:ring-frames-azure/10 resize-none transition-all"
                        placeholder="Hi, I'm interested in booking you for a shoot..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        autoFocus
                    ></textarea>
                    <div className="mt-5 flex justify-end">
                        <button type="submit" className="bg-frames-azure text-white font-bold py-2.5 px-6 rounded-xl hover:bg-sky-500 transition-colors shadow-lg shadow-sky-100 flex items-center gap-2 text-sm">
                            <Send size={16} /> Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
      
      {/* 1. HEADER SECTION */}
      <div className="relative mb-8">
        {/* Full Width Banner */}
        <div className="h-64 w-full bg-slate-200 overflow-hidden">
          <img src={PROFILE_EXTENDED.coverImage} alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col xl:flex-row items-start xl:items-end gap-6 -mt-16 relative z-10">
            {/* Large Avatar */}
            <div className="p-1.5 bg-white rounded-full shrink-0">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-36 h-36 rounded-full object-cover border-4 border-slate-50 shadow-md"
              />
            </div>

            {/* The 3-Line Identity Stack */}
            <div className="flex-1 pb-2 min-w-0">
              <div className="flex flex-col">
                {/* Line 1: Name + Badge */}
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold text-frames-navy truncate">{user.name}</h1>
                  {user.badges.map((badge, i) => <Badge key={i} type={badge} size={24} />)}
                </div>
                
                {/* Line 2: Role */}
                <span className="text-xs font-bold text-frames-azure uppercase tracking-[0.2em] mb-1 truncate">
                  {user.role} & RETOUCHER
                </span>

                {/* Line 3: Location */}
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin size={14} />
                  <span className="text-sm font-medium">{PROFILE_EXTENDED.stats.find(s => s.label === 'Location')?.value}</span>
                </div>
              </div>
            </div>

            {/* CTA Group: The Action Buttons */}
            <div className="flex flex-wrap gap-3 pb-2 w-full xl:w-auto mt-4 xl:mt-0">
               {/* Button 1: Navy Fill */}
               <button className="flex-1 xl:flex-none h-12 px-6 bg-frames-navy text-white font-bold rounded-xl hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200 text-sm whitespace-nowrap flex items-center justify-center gap-2">
                 Inizia Collaborazione
               </button>
               
               {/* Button 2: Azure Outline (Triggers Modal) */}
               <button 
                  onClick={() => setShowMessageModal(true)}
                  className="flex-1 xl:flex-none h-12 px-6 border-2 border-frames-azure text-frames-azure font-bold rounded-xl hover:bg-frames-ice transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap"
               >
                 <MessageCircle size={18} /> Messaggio
               </button>
               
               {/* Button 3: Azure Fill */}
               <button className="flex-1 xl:flex-none h-12 px-6 bg-frames-azure text-white font-bold rounded-xl hover:bg-sky-500 transition-colors shadow-lg shadow-sky-200 text-sm whitespace-nowrap">
                 Abbonati
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* 2. LEFT SIDEBAR (30% - 4 cols) */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Availability Pill */}
          <div className="bg-frames-ice border border-blue-100 rounded-xl p-4 flex items-center gap-3">
             <div className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-frames-azure opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-frames-azure"></span>
              </div>
              <span className="text-frames-azure font-bold text-sm tracking-wide uppercase truncate">
                {PROFILE_EXTENDED.availability}
              </span>
          </div>

          {/* Professional Specs */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Professional Specs</h3>
             <div className="space-y-3">
                {PROFILE_EXTENDED.stats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                     <span className="text-sm text-slate-500">{stat.label}</span>
                     <span className="text-sm font-semibold text-frames-navy text-right">{stat.value}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Social Proof */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 bg-emerald-50 border border-emerald-100 p-3 rounded-lg">
               <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
               <span className="font-medium text-emerald-700">{PROFILE_EXTENDED.socialProof}</span>
            </div>
            
            <div className="flex gap-3">
               {PROFILE_EXTENDED.socials.map((social, idx) => (
                 <a key={idx} href={social.link} className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-frames-azure hover:text-frames-azure transition-all bg-white">
                    <social.icon size={18} />
                 </a>
               ))}
            </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT (70% - 8 cols) */}
        <div className="md:col-span-8">
          
          {/* Statement of Work (Bio) */}
          <div className="mb-8">
             <h2 className="text-lg font-bold text-frames-navy mb-3">Statement of Work</h2>
             <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
               {PROFILE_EXTENDED.bio}
             </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-slate-200 mb-6 overflow-x-auto no-scrollbar">
             {['FEED', 'PORTFOLIO', 'PREMIUM', 'REVIEWS'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`px-6 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                   activeTab === tab 
                     ? 'border-frames-azure text-frames-azure' 
                     : 'border-transparent text-slate-400 hover:text-frames-navy'
                 }`}
               >
                 {tab.charAt(0) + tab.slice(1).toLowerCase()}
               </button>
             ))}
          </div>

          {/* TAB VIEWS */}
          <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {activeTab === 'FEED' && (
              <div className="space-y-6">
                {feedPosts.map(post => <SocialPostCard key={post.id} post={post} />)}
              </div>
            )}

            {activeTab === 'PORTFOLIO' && (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
                    <div key={i} className="aspect-square bg-slate-100 group overflow-hidden cursor-pointer relative">
                       <img 
                         src={`https://picsum.photos/400/400?random=${i+20}`} 
                         alt="Portfolio" 
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                       />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
               </div>
            )}

            {activeTab === 'PREMIUM' && (
              <div>
                 <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-slate-500">Exclusive content for subscribers.</p>
                    <button 
                      onClick={() => setSfwMode(!sfwMode)}
                      className="flex items-center gap-2 text-xs font-bold text-frames-navy bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors"
                    >
                      {sfwMode ? <EyeOff size={14} /> : <Eye size={14} />}
                      {sfwMode ? 'SFW Mode: ON' : 'SFW Mode: OFF'}
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {PREMIUM_PREVIEWS.map((i) => (
                      <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm group">
                         <img 
                            src={`https://picsum.photos/400/600?random=${i+50}`}
                            alt="Premium"
                            className={`w-full h-full object-cover transition-all duration-300 ${sfwMode ? 'blur-xl' : 'blur-0'}`}
                         />
                         <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-center">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-2">
                               <Lock className="text-white" size={18} />
                            </div>
                            <span className="text-white font-bold text-sm">Unlock Set</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'REVIEWS' && (
               <div className="grid grid-cols-1 gap-4">
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                             <div className="w-8 h-8 bg-frames-azure text-white rounded-full flex items-center justify-center font-bold text-xs">
                                {review.author.charAt(0)}
                             </div>
                             <span className="font-bold text-frames-navy text-sm">{review.author}</span>
                             <Badge type={VerificationLevel.PROFESSIONAL_VERIFIED} />
                          </div>
                          <div className="flex text-amber-400">
                             {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                          </div>
                       </div>
                       <p className="text-slate-600 text-sm mb-2">{review.text}</p>
                       <span className="text-xs text-slate-400">{review.date}</span>
                    </div>
                  ))}
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};