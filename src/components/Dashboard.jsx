import React from 'react';
import { TrendingUp, User, Wallet, ArrowUpRight, ArrowDownRight, Edit2 } from 'lucide-react';

export default function Dashboard({ contributions, calculations, onEditContributions }) {
  const { totalPool, targetShare, balance } = calculations;

  const getStatusText = (bal) => {
    if (bal > 0) return 'Overpaid';
    if (bal < 0) return 'Owes Money';
    return 'Settled';
  };

  const getStatusColorClass = (bal) => {
    if (bal > 0) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (bal < 0) return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Split Ratios Bar */}
      <div className="overflow-hidden rounded-2xl glass-panel p-5 border border-slate-800/80 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <h4 className="font-semibold text-white text-sm tracking-wide uppercase">Fixed House Split percentages</h4>
          </div>
          <button
            onClick={onEditContributions}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700/50 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Update Contributions</span>
          </button>
        </div>
        
        {/* Progress Visualizer */}
        <div className="relative h-6 w-full bg-slate-950 rounded-full overflow-hidden flex">
          <div 
            style={{ width: '58.33%' }}
            className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500 relative"
          >
            <span>Reza (58.33%)</span>
          </div>
          <div 
            style={{ width: '41.67%' }}
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500 relative"
          >
            <span>Reaz (41.67%)</span>
          </div>
        </div>
      </div>

      {/* Roommate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Roommate A: Reza */}
        <div className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-slate-800/80 hover:border-slate-700 transition-all group duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 font-bold">
                V
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Reza</h3>
                <p className="text-xs text-slate-400">Split Weight: 58.33%</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${getStatusColorClass(balance.Reza)}`}>
              {getStatusText(balance.Reza)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-900/50">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Paid Contribution</span>
              <p className="text-lg font-bold text-white mt-1">৳ {contributions.Reza.toLocaleString()}</p>
            </div>
            <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-900/50">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Target Share</span>
              <p className="text-lg font-semibold text-slate-300 mt-1">৳ {Math.round(targetShare.Reza).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Balance Status</span>
            <div className={`flex items-center space-x-1 font-bold text-sm ${balance.Reza >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {balance.Reza >= 0 ? (
                <>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+৳ {balance.Reza.toFixed(2)}</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="w-4 h-4" />
                  <span>-৳ {Math.abs(balance.Reza).toFixed(2)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Roommate B: Reaz */}
        <div className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-slate-800/80 hover:border-slate-700 transition-all group duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold">
                R
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Reaz</h3>
                <p className="text-xs text-slate-400">Split Weight: 41.67%</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${getStatusColorClass(balance.Reaz)}`}>
              {getStatusText(balance.Reaz)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-900/50">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Paid Contribution</span>
              <p className="text-lg font-bold text-white mt-1">৳ {contributions.Reaz.toLocaleString()}</p>
            </div>
            <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-900/50">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Target Share</span>
              <p className="text-lg font-semibold text-slate-300 mt-1">৳ {Math.round(targetShare.Reaz).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Balance Status</span>
            <div className={`flex items-center space-x-1 font-bold text-sm ${balance.Reaz >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {balance.Reaz >= 0 ? (
                <>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+৳ {balance.Reaz.toFixed(2)}</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="w-4 h-4" />
                  <span>-৳ {Math.abs(balance.Reaz).toFixed(2)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
