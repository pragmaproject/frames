import React from 'react';
import { Shield, ExternalLink, Info } from 'lucide-react';

interface RightPanelProps {
  isProfessionalMode: boolean;
}

export const RightPanel: React.FC<RightPanelProps> = ({ isProfessionalMode }) => {
  return (
    <div className="w-80 fixed right-0 h-screen p-6 border-l border-slate-200 overflow-y-auto hidden lg:block bg-white z-10">
      
      {/* Recommended Tech Stack (As requested by User) */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Architecture Info</h3>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <Shield size={14} className="text-frames-azure" />
                 <span className="text-sm font-semibold text-frames-navy">Trust & Safety</span>
              </div>
              <p className="text-xs text-slate-500">
                Recommended: Yoti or Veriff for biometric ID verification to award "ID Verified" badges.
              </p>
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <Info size={14} className="text-frames-azure" />
                 <span className="text-sm font-semibold text-frames-navy">Payments</span>
              </div>
              <p className="text-xs text-slate-500">
                 High-Risk Compatible: SpankPay (Crypto), Segpay, or CCBill. 
              </p>
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <ExternalLink size={14} className="text-frames-azure" />
                 <span className="text-sm font-semibold text-frames-navy">Video Hosting</span>
              </div>
              <p className="text-xs text-slate-500">
                 Cloudflare Stream with signed URLs for DRM and bandwidth control.
              </p>
           </div>
        </div>
      </div>

      {/* Dynamic Content based on Mode */}
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
        {isProfessionalMode ? 'Trending Agencies' : 'Recommended Creators'}
      </h3>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                 <img src={`https://picsum.photos/200/200?random=${i + 10}`} alt="Suggest" />
              </div>
              <div>
                <p className="text-sm font-semibold text-frames-navy group-hover:text-frames-azure transition-colors">
                  {isProfessionalMode ? `Elite Models ${i}` : `Creator ${i}`}
                </p>
                <p className="text-xs text-slate-400">
                   {isProfessionalMode ? 'Looking for talent' : 'New content'}
                </p>
              </div>
            </div>
            <button className="text-xs font-medium text-frames-azure border border-slate-200 rounded-full px-3 py-1 hover:bg-frames-azure hover:text-white transition-all">
              Follow
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-xs text-slate-400 text-center leading-relaxed">
          Frames © 2024<br/>
          Privacy • Terms • Safety Center
        </p>
      </div>
    </div>
  );
};