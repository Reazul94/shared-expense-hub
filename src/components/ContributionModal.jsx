import React, { useState, useEffect } from 'react';
import { X, DollarSign, Sparkles } from 'lucide-react';

export default function ContributionModal({ isOpen, onClose, onSave, contributions }) {
  const [rezaPaid, setRezaPaid] = useState('');
  const [reazPaid, setReazPaid] = useState('');

  useEffect(() => {
    if (contributions) {
      setRezaPaid(contributions.Reza.toString());
      setReazPaid(contributions.Reaz.toString());
    }
  }, [contributions, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const vVal = parseFloat(rezaPaid);
    const rVal = parseFloat(reazPaid);

    if (isNaN(vVal) || vVal < 0 || isNaN(rVal) || rVal < 0) {
      alert('Please enter valid positive amounts.');
      return;
    }

    onSave({
      Reza: vVal,
      Reaz: rVal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md overflow-hidden rounded-2xl glass-panel shadow-2xl border border-slate-700/50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">
              Edit Monthly Contributions
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-slate-400">
            Update the cash contributed by each roommate to the house fund this month. This pool is split based on the fixed ratio (Reza: 58.33%, Reaz: 41.67%).
          </p>

          {/* Reza Contribution */}
          <div>
            <label className="block mb-2 text-sm font-medium text-indigo-300">
              Reza Paid Amount (৳)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-indigo-400 font-semibold">৳</span>
              <input
                type="number"
                step="any"
                required
                min="0"
                placeholder="0.00"
                value={rezaPaid}
                onChange={(e) => setRezaPaid(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Reaz Contribution */}
          <div>
            <label className="block mb-2 text-sm font-medium text-emerald-300">
              Reaz Paid Amount (৳)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-emerald-400 font-semibold">৳</span>
              <input
                type="number"
                step="any"
                required
                min="0"
                placeholder="0.00"
                value={reazPaid}
                onChange={(e) => setReazPaid(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md shadow-indigo-500/20"
            >
              Save Contributions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
