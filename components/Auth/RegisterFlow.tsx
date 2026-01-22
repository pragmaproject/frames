import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ShieldCheck, UserCheck } from 'lucide-react';
import { RoleSelection } from './RoleSelection';

interface RegisterFlowProps {
  onComplete: () => void;
}

export const RegisterFlow: React.FC<RegisterFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    username: '',
    password: '',
    fullName: '',
    professionalTitle: '',
    location: ''
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
    } else {
      onComplete();
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map(i => (
          <div 
            key={i} 
            className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-frames-azure' : 'bg-slate-100'}`} 
          />
        ))}
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-bold text-frames-navy mb-1">Select your path</h2>
          <p className="text-sm text-slate-500 mb-6">Choose how you want to use Frames.</p>
          
          <RoleSelection 
            selectedRole={formData.role} 
            onSelect={(role) => updateField('role', role)} 
          />
        </div>
      )}

      {/* Step 2: Account Details */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
           <h2 className="text-xl font-bold text-frames-navy mb-1">Account Setup</h2>
           <p className="text-sm text-slate-500 mb-4">Create your secure credentials.</p>

           <div>
              <label className="block text-xs font-bold text-frames-navy uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-frames-azure focus:ring-2 focus:ring-frames-azure/20"
                placeholder="name@work.com"
                value={formData.email}
                onChange={e => updateField('email', e.target.value)}
              />
           </div>
           <div>
              <label className="block text-xs font-bold text-frames-navy uppercase tracking-wider mb-2">Username</label>
              <div className="flex items-center">
                 <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg px-3 py-3 text-slate-500 text-sm">@</span>
                 <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-r-lg text-sm focus:outline-none focus:border-frames-azure focus:ring-2 focus:ring-frames-azure/20"
                    placeholder="username"
                    value={formData.username}
                    onChange={e => updateField('username', e.target.value)}
                 />
              </div>
           </div>
           <div>
              <label className="block text-xs font-bold text-frames-navy uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-frames-azure focus:ring-2 focus:ring-frames-azure/20"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => updateField('password', e.target.value)}
              />
           </div>
        </div>
      )}

      {/* Step 3: Identity */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
           <h2 className="text-xl font-bold text-frames-navy mb-1">Professional Identity</h2>
           <p className="text-sm text-slate-500 mb-4">Build trust with verified agencies.</p>

           <div>
              <label className="block text-xs font-bold text-frames-navy uppercase tracking-wider mb-2">Legal Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-frames-azure focus:ring-2 focus:ring-frames-azure/20"
                placeholder="Jane Doe"
                value={formData.fullName}
                onChange={e => updateField('fullName', e.target.value)}
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-frames-navy uppercase tracking-wider mb-2">Role Title</label>
                <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-frames-azure focus:ring-2 focus:ring-frames-azure/20"
                    placeholder="e.g. Visual Artist"
                    value={formData.professionalTitle}
                    onChange={e => updateField('professionalTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-frames-navy uppercase tracking-wider mb-2">Location</label>
                <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-frames-azure focus:ring-2 focus:ring-frames-azure/20"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={e => updateField('location', e.target.value)}
                />
              </div>
           </div>

           {/* KYC Placeholder */}
           <div className="bg-frames-ice border border-blue-100 rounded-xl p-4 flex items-start gap-3 mt-2">
              <ShieldCheck className="text-frames-azure shrink-0" size={24} />
              <div>
                  <h4 className="text-sm font-bold text-frames-navy">ID Verification</h4>
                  <p className="text-xs text-slate-500 mt-1">To earn the "Verified" badge and process payments, you'll need to submit a government ID later.</p>
                  <div className="flex items-center gap-1 mt-2 text-xs font-medium text-slate-400">
                     <UserCheck size={12} /> Verification Pending
                  </div>
              </div>
           </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 pt-4">
         {step > 1 && (
           <button 
             type="button" 
             onClick={handleBack}
             className="px-5 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
           >
             <ChevronLeft size={20} />
           </button>
         )}
         
         <button 
           type="submit"
           disabled={step === 1 && !formData.role}
           className="flex-1 bg-frames-navy text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           {step === 3 ? 'Create Account' : 'Next Step'}
           {step < 3 && <ChevronRight size={18} />}
         </button>
      </div>
    </form>
  );
};