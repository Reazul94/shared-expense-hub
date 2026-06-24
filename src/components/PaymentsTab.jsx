import React from 'react';
import { ArrowRight, HelpCircle, CheckCircle, Info, ChevronRight, DollarSign, FileSpreadsheet, FileText } from 'lucide-react';
import { exportToExcel, exportToPDF } from '../utils/export';

export default function PaymentsTab({ bazarList, contributions, calculations }) {
  const { totalPool, targetShare, balance } = calculations;

  // Settle math
  const getSettlementAction = () => {
    if (balance.Reza > 0 && balance.Reaz < 0) {
      return {
        from: 'Reaz',
        to: 'Reza',
        amount: Math.abs(balance.Reaz),
      };
    } else if (balance.Reaz > 0 && balance.Reza < 0) {
      return {
        from: 'Reza',
        to: 'Reaz',
        amount: Math.abs(balance.Reza),
      };
    }
    return null;
  };

  const settlement = getSettlementAction();

  // Progress calculations
  const getProgressPercentage = (paid, target) => {
    if (target === 0) return 0;
    return Math.min(100, Math.round((paid / target) * 100));
  };

  const rezaProgress = getProgressPercentage(contributions.Reza, targetShare.Reza);
  const reazProgress = getProgressPercentage(contributions.Reaz, targetShare.Reaz);

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl glass-panel border border-slate-800/80 shadow-md">
        <div>
          <h3 className="font-bold text-white text-base">Monthly Statement Reports</h3>
          <p className="text-xs text-slate-400 mt-1">Download monthly grocery logs, roommate ledger summaries, and payment settlement guides.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => exportToExcel(bazarList, calculations)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-850 hover:bg-slate-750 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-800 hover:border-slate-700 transition-all shadow-md shadow-slate-950/20"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-450" />
            <span>Export Excel (CSV)</span>
          </button>
          <button
            onClick={() => exportToPDF(bazarList, calculations)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-650 hover:from-indigo-600 hover:to-indigo-750 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/10"
          >
            <FileText className="w-4 h-4 text-indigo-100" />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* Flow of Funds (Settlement Action Card) */}
      <div className="overflow-hidden rounded-2xl glass-panel border border-slate-800/80 shadow-lg p-6 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <span>Flow of Funds</span>
        </h3>

        {settlement ? (
          <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${
                  settlement.from === 'Reza' 
                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {settlement.from[0]}
                </div>
                <span className="text-xs font-semibold text-slate-300 mt-1">{settlement.from}</span>
                <span className="text-[10px] text-rose-400 mt-0.5">Owes Money</span>
              </div>

              <div className="flex flex-col items-center px-4">
                <div className="flex items-center space-x-1 py-1.5 px-3 bg-slate-900 border border-slate-800 rounded-full text-sm font-bold text-white">
                  <span>৳ {settlement.amount.toFixed(2)}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 mt-2 animate-pulse" />
              </div>

              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${
                  settlement.to === 'Reza' 
                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {settlement.to[0]}
                </div>
                <span className="text-xs font-semibold text-slate-300 mt-1">{settlement.to}</span>
                <span className="text-[10px] text-emerald-400 mt-0.5">Overpaid</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-300 font-medium">
                To settle the balance, <strong className="text-white">{settlement.from}</strong> needs to transfer:
              </p>
              <p className="text-3xl font-black text-indigo-400 mt-1">৳ {settlement.amount.toFixed(2)}</p>
              <p className="text-xs text-slate-500 mt-0.5">to {settlement.to}</p>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 flex items-center space-x-3 text-emerald-400">
            <CheckCircle className="w-6 h-6 shrink-0" />
            <div>
              <p className="text-sm font-semibold">All Accounts Settled</p>
              <p className="text-xs text-slate-400 mt-0.5">Payments match the split ratios perfectly. No transfers required.</p>
            </div>
          </div>
        )}

        {/* Math explanation */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/40 border border-slate-900/50 flex items-start space-x-3">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">How is this calculated?</p>
            <p>1. Total Contribution Pool = ৳ {totalPool.toLocaleString()} (Reza Paid: ৳ {contributions.Reza.toLocaleString()} + Reaz Paid: ৳ {contributions.Reaz.toLocaleString()})</p>
            <p>2. Reza Target Share (58.33%) = ৳ {Math.round(targetShare.Reza).toLocaleString()}</p>
            <p>3. Reaz Target Share (41.67%) = ৳ {Math.round(targetShare.Reaz).toLocaleString()}</p>
            <p>4. Balance = Paid Amount - Target Share. Negative balance means the roommate has outstanding dues to settle.</p>
          </div>
        </div>
      </div>

      {/* Target Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Reza progress */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-white">Reza's Contribution Progress</span>
            </div>
            <span className="text-xs font-bold text-indigo-400">{rezaProgress}%</span>
          </div>
          
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-0.5">
            <div 
              style={{ width: `${rezaProgress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-500"
            />
          </div>

          <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
            <span>Paid: ৳ {contributions.Reza.toLocaleString()}</span>
            <span>Target: ৳ {Math.round(targetShare.Reza).toLocaleString()}</span>
          </div>
        </div>

        {/* Reaz progress */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-white">Reaz's Contribution Progress</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">{reazProgress}%</span>
          </div>
          
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-0.5">
            <div 
              style={{ width: `${reazProgress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
            />
          </div>

          <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
            <span>Paid: ৳ {contributions.Reaz.toLocaleString()}</span>
            <span>Target: ৳ {Math.round(targetShare.Reaz).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Detailed Settlement Ledger */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 shadow-md">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Detailed Monthly Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase font-semibold">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Paid Amount</th>
                <th className="py-3 px-4">Received Amount</th>
                <th className="py-3 px-4">Target Share</th>
                <th className="py-3 px-4 text-right">Outstanding Dues</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {/* Reza */}
              <tr className="hover:bg-slate-900/20 transition-colors">
                <td className="py-3.5 px-4 font-bold text-white flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center text-xs">V</div>
                  <span>Reza</span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-200">
                  <div>৳ {contributions.Reza.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                    Base: ৳{(calculations.baseContributions?.Reza || 0).toLocaleString()} | Bazar: ৳{(calculations.rezaBazarSpent || 0).toLocaleString()}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-400">
                  ৳ {balance.Reza > 0 ? balance.Reza.toFixed(2) : '0.00'}
                </td>
                <td className="py-3.5 px-4 text-slate-300">৳ {targetShare.Reza.toFixed(2)}</td>
                <td className="py-3.5 px-4 text-right font-bold">
                  <span className={balance.Reza < 0 ? 'text-rose-400' : 'text-emerald-400'}>
                    {balance.Reza < 0 ? `৳ ${Math.abs(balance.Reza).toFixed(2)}` : '৳ 0.00'}
                  </span>
                </td>
              </tr>

              {/* Reaz */}
              <tr className="hover:bg-slate-900/20 transition-colors">
                <td className="py-3.5 px-4 font-bold text-white flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-xs">R</div>
                  <span>Reaz</span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-200">
                  <div>৳ {contributions.Reaz.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                    Base: ৳{(calculations.baseContributions?.Reaz || 0).toLocaleString()} | Bazar: ৳{(calculations.reazBazarSpent || 0).toLocaleString()}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-400">
                  ৳ {balance.Reaz > 0 ? balance.Reaz.toFixed(2) : '0.00'}
                </td>
                <td className="py-3.5 px-4 text-slate-300">৳ {targetShare.Reaz.toFixed(2)}</td>
                <td className="py-3.5 px-4 text-right font-bold">
                  <span className={balance.Reaz < 0 ? 'text-rose-400' : 'text-emerald-400'}>
                    {balance.Reaz < 0 ? `৳ ${Math.abs(balance.Reaz).toFixed(2)}` : '৳ 0.00'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
