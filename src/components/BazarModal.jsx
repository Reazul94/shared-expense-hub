import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, User, FileText } from 'lucide-react';

export default function BazarModal({ isOpen, onClose, onSave, item }) {
  const [date, setDate] = useState('');
  const [buyer, setBuyer] = useState('Reza');
  const [cost, setCost] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (item && item.id) {
      setDate(item.date || '');
      setBuyer(item.buyer || 'Reza');
      setCost(item.cost !== undefined && item.cost !== null ? item.cost.toString() : '');
      setNote(item.note || '');
    } else {
      const today = item && item.date ? item.date : new Date().toISOString().split('T')[0];
      setDate(today);
      setBuyer('Reza');
      setCost('');
      setNote('');
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !buyer || !cost || parseFloat(cost) <= 0) {
      alert('Please fill in all fields with valid data.');
      return;
    }
    onSave({
      id: item?.id || Date.now(),
      date,
      buyer,
      cost: parseFloat(cost),
      note: note.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md overflow-hidden rounded-2xl glass-panel shadow-2xl border border-slate-700/50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <h3 className="text-lg font-semibold text-white">
            {item ? 'Edit Bazar Entry' : 'Add Bazar Entry'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Date */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Buyer */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">Buyer</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
              <select
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
              >
                <option value="Reza">Reza</option>
                <option value="Reaz">Reaz</option>
                <option value="Shared">Shared (Split Equally)</option>
              </select>
            </div>
          </div>

          {/* Cost */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">Cost (৳)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-medium">৳</span>
              <input
                type="number"
                step="any"
                required
                min="0.01"
                placeholder="0.00"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">Note / Details</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
              <textarea
                placeholder="What did you buy? e.g., Rice, Potato, Eggs..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="3"
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
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
              {item ? 'Save Changes' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
