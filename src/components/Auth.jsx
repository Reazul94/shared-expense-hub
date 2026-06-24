import React, { useState } from 'react';
import { Phone, Lock, User, LogIn, UserPlus, Sparkles, AlertCircle } from 'lucide-react';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  // Form fields
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!mobile || !password) {
      setError('Please enter both mobile number and password.');
      return;
    }

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const user = users.find(u => u.mobile === mobile);

    if (!user || user.password !== password) {
      setError('Invalid mobile number or password.');
      return;
    }

    onLoginSuccess(user);
  };

  // Handle Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !mobile || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Basic mobile validation (e.g. at least 10 digits)
    const mobileDigits = mobile.replace(/\D/g, '');
    if (mobileDigits.length < 10) {
      setError('Please enter a valid mobile number (at least 10 digits).');
      return;
    }

    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.mobile === mobile)) {
      setError('A user with this mobile number is already registered.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      mobile,
      password
    };

    users.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(users));
    
    // Automatically log in
    onLoginSuccess(newUser);
  };

  // Demo accounts for quick testing
  const handleDemoLogin = (roommateName, demoMobile) => {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    let user = users.find(u => u.mobile === demoMobile);

    if (!user) {
      // Register demo user if not exists
      user = {
        id: Date.now(),
        name: roommateName,
        mobile: demoMobile,
        password: 'password123'
      };
      users.push(user);
      localStorage.setItem('registered_users', JSON.stringify(users));
    }

    onLoginSuccess(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md p-8 rounded-3xl glass-panel shadow-2xl border border-slate-800/80 relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-4 animate-pulse-subtle">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-black text-white text-center">Expense & Settlement</h2>
        <p className="text-xs text-slate-400 mt-1 mb-8 text-center">Roommate grocery tracker and split ledger</p>

        {/* Tab switcher */}
        <div className="flex w-full bg-slate-950/60 p-1 rounded-xl border border-slate-850 mb-6">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              isLogin ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              !isLogin ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="w-full p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-medium flex items-center space-x-2 mb-4 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
            <div>
              <label className="block mb-1.5 text-xs font-semibold text-slate-400">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 01712345678"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-semibold text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/10 mt-6"
            >
              Sign In
            </button>
          </form>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegisterSubmit} className="w-full space-y-4">
            <div>
              <label className="block mb-1.5 text-xs font-semibold text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Reazul"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-semibold text-slate-400">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 01712345678"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-semibold text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-semibold text-slate-400">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/10 mt-6"
            >
              Register & Sign In
            </button>
          </form>
        )}

        {/* Demo Fast Login divider */}
        <div className="w-full flex items-center justify-between my-6">
          <div className="h-[1px] bg-slate-800/80 flex-1" />
          <span className="text-[10px] text-slate-500 font-bold uppercase px-3 tracking-widest">Or Demo Login</span>
          <div className="h-[1px] bg-slate-800/80 flex-1" />
        </div>

        {/* Demo buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            onClick={() => handleDemoLogin('Vaia', '01711111111')}
            className="py-2 bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 hover:text-indigo-300 font-semibold text-xs rounded-xl transition-colors"
          >
            Log in as Vaia
          </button>
          <button
            onClick={() => handleDemoLogin('Reazul', '01822222222')}
            className="py-2 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 font-semibold text-xs rounded-xl transition-colors"
          >
            Log in as Reazul
          </button>
        </div>
      </div>
    </div>
  );
}
