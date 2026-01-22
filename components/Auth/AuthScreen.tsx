import React, { useState } from 'react';
import { LoginView } from './LoginView';
import { RegisterFlow } from './RegisterFlow';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const [view, setView] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-frames-azure rounded-xl mb-4 shadow-lg shadow-sky-200">
           <div className="w-6 h-6 bg-white rounded-md transform rotate-45"></div>
        </div>
        <h1 className="text-3xl font-bold text-frames-navy tracking-tight">Frames.</h1>
        <p className="text-slate-400 text-sm mt-1 font-medium">The Professional Network for Creators</p>
      </div>

      {/* Main Card */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 overflow-hidden relative">
        
        {view === 'LOGIN' ? (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-2xl font-bold text-frames-navy mb-1">Welcome back</h2>
             <p className="text-slate-500 text-sm mb-8">Enter your credentials to access your workspace.</p>
             <LoginView onLogin={onAuthenticated} />
           </div>
        ) : (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <RegisterFlow onComplete={onAuthenticated} />
           </div>
        )}

        {/* Toggle Footer */}
        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
           <p className="text-sm text-slate-500">
             {view === 'LOGIN' ? "Don't have an account? " : "Already have an account? "}
             <button 
               onClick={() => setView(view === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
               className="font-bold text-frames-azure hover:underline"
             >
               {view === 'LOGIN' ? 'Join Frames' : 'Sign In'}
             </button>
           </p>
        </div>

      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-300">
          By continuing, you agree to our Terms of Service <br/> and Privacy Policy. 18+ Only.
        </p>
      </div>
    </div>
  );
};