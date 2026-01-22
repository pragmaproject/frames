import React from 'react';
import { ShieldCheck, UserCheck, CheckCircle } from 'lucide-react';
import { VerificationLevel } from '../../types';

interface BadgeProps {
  type: VerificationLevel;
  size?: number;
}

export const Badge: React.FC<BadgeProps> = ({ type, size = 16 }) => {
  switch (type) {
    case VerificationLevel.SAFE_SET_CERTIFIED:
      return (
        <div className="group relative inline-flex items-center justify-center ml-1 text-frames-azure" title="Safe Set Certified">
           <ShieldCheck size={size} fill="#E0F2FE" />
        </div>
      );
    case VerificationLevel.PROFESSIONAL_VERIFIED:
      return (
        <div className="group relative inline-flex items-center justify-center ml-1 text-emerald-500" title="Professional Verified">
          <CheckCircle size={size} fill="#ECFDF5" />
        </div>
      );
    case VerificationLevel.ID_VERIFIED:
      return (
        <div className="group relative inline-flex items-center justify-center ml-1 text-frames-navy/60" title="ID Verified">
          <UserCheck size={size} />
        </div>
      );
    default:
      return null;
  }
};