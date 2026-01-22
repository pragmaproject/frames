import React, { useState } from 'react';
import { Search, MoreVertical, Send, Paperclip } from 'lucide-react';
import { Badge } from '../UI/Badge';
import { VerificationLevel } from '../../types';

const CONVERSATIONS = [
  {
    id: 1,
    name: 'Lumina Agency',
    avatar: 'https://picsum.photos/200/200?random=1',
    lastMessage: 'We have reviewed your portfolio and would like to schedule a call.',
    time: '2m ago',
    unread: 2,
    badge: VerificationLevel.SAFE_SET_CERTIFIED
  },
  {
    id: 2,
    name: 'Sarah V.',
    avatar: 'https://picsum.photos/200/200?random=2',
    lastMessage: 'The photos turned out amazing! Just sent the raw files.',
    time: '1h ago',
    unread: 1,
    badge: VerificationLevel.ID_VERIFIED
  },
  {
    id: 3,
    name: 'Marcus Chen',
    avatar: 'https://picsum.photos/200/200?random=4',
    lastMessage: 'Are you available for a shoot next Tuesday?',
    time: '1d ago',
    unread: 0,
    badge: VerificationLevel.PROFESSIONAL_VERIFIED
  }
];

export const MessagesView: React.FC = () => {
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Left Pane: Conversation List */}
      <div className="w-1/3 border-r border-slate-100 flex flex-col">
        <div className="p-4 border-b border-slate-100">
           <h2 className="text-lg font-bold text-frames-navy mb-4">Messages</h2>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input 
               type="text" 
               placeholder="Search inbox..." 
               className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm border border-transparent focus:bg-white focus:border-frames-azure focus:outline-none transition-all"
             />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
           {CONVERSATIONS.map((chat) => (
             <div 
               key={chat.id}
               onClick={() => setActiveChat(chat)}
               className={`p-4 flex gap-3 cursor-pointer transition-colors hover:bg-frames-ice/50 ${activeChat.id === chat.id ? 'bg-frames-ice border-r-2 border-frames-azure' : ''}`}
             >
               <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                     <span className={`text-sm font-semibold truncate ${activeChat.id === chat.id ? 'text-frames-azure' : 'text-frames-navy'}`}>
                       {chat.name}
                     </span>
                     <span className="text-[10px] text-slate-400">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{chat.lastMessage}</p>
               </div>
               {chat.unread > 0 && (
                 <div className="w-2 h-2 rounded-full bg-frames-azure mt-1.5 shrink-0"></div>
               )}
             </div>
           ))}
        </div>
      </div>

      {/* Right Pane: Chat Window */}
      <div className="w-2/3 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-sm">
           <div className="flex items-center gap-3">
              <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                 <div className="flex items-center gap-1">
                    <h3 className="font-bold text-frames-navy">{activeChat.name}</h3>
                    <Badge type={activeChat.badge} />
                 </div>
                 <p className="text-xs text-green-500 flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                 </p>
              </div>
           </div>
           <button className="text-slate-400 hover:text-frames-navy"><MoreVertical size={20} /></button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-4">
           <div className="flex justify-center">
             <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Today</span>
           </div>
           
           {/* Received Message */}
           <div className="flex gap-3">
              <img src={activeChat.avatar} alt="Sender" className="w-8 h-8 rounded-full self-end" />
              <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-bl-none shadow-sm max-w-[80%]">
                 <p className="text-sm text-frames-navy">{activeChat.lastMessage}</p>
              </div>
           </div>

           {/* Sent Message */}
           <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center self-end text-xs font-bold text-slate-500">You</div>
              <div className="bg-frames-azure text-white p-3 rounded-2xl rounded-br-none shadow-sm shadow-blue-100 max-w-[80%]">
                 <p className="text-sm">That sounds great! I'm free to chat now if you have a moment.</p>
              </div>
           </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
           <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2 pr-3">
              <button className="p-2 text-slate-400 hover:text-frames-azure hover:bg-white rounded-lg transition-colors">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-transparent text-sm focus:outline-none text-frames-navy placeholder-slate-400"
              />
              <button className="p-2 bg-frames-azure text-white rounded-lg hover:bg-sky-600 transition-colors shadow-sm">
                <Send size={18} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};