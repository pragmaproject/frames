import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login delay
    setTimeout(() => {
        onLogin();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-frames-navy uppercase tracking-wider mb-2">
          Email or Username
        </label>
        <div className="relative">
           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input
             type="text"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-frames-navy focus:outline-none focus:bg-white focus:border-frames-azure focus:ring-2 focus:ring-frames-azure/20 transition-all"
             placeholder="name@example.com"
             required
           />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-frames-navy uppercase tracking-wider">
              Password
            </label>
            <a href="#" className="text-xs font-medium text-frames-azure hover:text-sky-600">Forgot Password?</a>
        </div>
        <div className="relative">
           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-frames-navy focus:outline-none focus:bg-white focus:border-frames-azure focus:ring-2 focus:ring-frames-azure/20 transition-all"
             placeholder="••••••••"
             required
           />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-frames-navy text-white font-bold py-3.5 rounded-xl hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200 mt-2"
      >
        Sign In to Frames
      </button>
    </form>
  );
};