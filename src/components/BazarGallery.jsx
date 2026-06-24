import React, { useState } from 'react';
import { Search, Eye, Filter, Plus, Calendar, Edit2, Trash2, ArrowUpDown, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function BazarGallery({
  bazarList,
  onAddBazar,
  onEditBazar,
  onDeleteBazar,
  searchQuery,
  setSearchQuery,
  filterRoommate,
  setFilterRoommate,
  showUnrecorded,
  setShowUnrecorded,
  sortBy,
  setSortBy,
  highlightedDate
}) {
  const [selectedNote, setSelectedNote] = useState(null);

  // Get days in the current month (June 2026 based on local time / mock data)
  // Let's deduce year and month from the current local time or default to June 2026
  const getDaysInMonth = () => {
    const year = 2026;
    const month = 5; // June (0-indexed)
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      days.push(`${yyyy}-${mm}-${dd}`);
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Filter and sort Bazar items
  const filteredBazar = bazarList.filter((item) => {
    // Search filter
    const matchesSearch = item.note.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Roommate filter
    let matchesRoommate = true;
    if (filterRoommate === 'Vaia') matchesRoommate = item.buyer === 'Vaia';
    else if (filterRoommate === 'Reazul') matchesRoommate = item.buyer === 'Reazul';
    else if (filterRoommate === 'Shared') matchesRoommate = item.buyer === 'Shared';

    return matchesSearch && matchesRoommate;
  });

  // Compile final items including unrecorded days if enabled
  let displayItems = [];

  if (showUnrecorded) {
    const allDays = getDaysInMonth();
    allDays.forEach((day) => {
      // Find items matching this day
      const dayItems = filteredBazar.filter((item) => item.date === day);
      if (dayItems.length > 0) {
        dayItems.forEach((item) => displayItems.push({ type: 'record', data: item }));
      } else {
        // Only include if no search query / filter blocks it
        if (!searchQuery && filterRoommate === 'All') {
          displayItems.push({ type: 'empty', date: day });
        }
      }
    });
  } else {
    filteredBazar.forEach((item) => displayItems.push({ type: 'record', data: item }));
  }

  // Sort displayItems
  displayItems.sort((a, b) => {
    const dateA = a.type === 'record' ? a.data.date : a.date;
    const dateB = b.type === 'record' ? b.data.date : b.date;
    const costA = a.type === 'record' ? a.data.cost : 0;
    const costB = b.type === 'record' ? b.data.cost : 0;

    switch (sortBy) {
      case 'date-desc':
        return new Date(dateB) - new Date(dateA);
      case 'date-asc':
        return new Date(dateA) - new Date(dateB);
      case 'cost-high':
        return costB - costA;
      case 'cost-low':
        return costA - costB;
      default:
        return new Date(dateB) - new Date(dateA);
    }
  });

  const getAvatar = (buyer) => {
    if (buyer === 'Vaia') return { text: 'V', style: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20' };
    if (buyer === 'Reazul') return { text: 'R', style: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' };
    return { text: 'S', style: 'bg-amber-500/15 text-amber-400 border-amber-500/20' };
  };

  return (
    <div className="space-y-6">
      {/* Filtering and Search Controls */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by details, item note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Roommate Filter */}
          <div className="flex items-center space-x-1 bg-slate-950/40 p-1 rounded-xl border border-slate-800/50">
            {['All', 'Vaia', 'Reazul', 'Shared'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterRoommate(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterRoommate === tab
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="cost-high">Cost (High to Low)</option>
              <option value="cost-low">Cost (Low to High)</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <ChevronDown className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Toggle Unrecorded Days */}
          <button
            onClick={() => setShowUnrecorded(!showUnrecorded)}
            className={`flex items-center space-x-1.5 px-3 py-2 border rounded-xl text-xs font-medium transition-all ${
              showUnrecorded
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Unrecorded Days</span>
          </button>

          {/* Add Bazar Button */}
          <button
            onClick={() => onAddBazar()}
            className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium text-xs rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md shadow-indigo-600/10"
          >
            <Plus className="w-4 h-4" />
            <span>Add Bazar</span>
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayItems.length > 0 ? (
          displayItems.map((item, index) => {
            if (item.type === 'record') {
              const { id, date, buyer, cost, note } = item.data;
              const avatar = getAvatar(buyer);
              const isHighlighted = highlightedDate === date;

              return (
                <div
                  key={`record-${id}`}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl glass-panel p-5 border transition-all duration-300 hover:scale-[1.02] ${
                    isHighlighted
                      ? 'border-indigo-400 bg-indigo-950/20 shadow-indigo-500/10 animate-pulse-subtle'
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{date}</span>
                      </span>
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-xs border ${avatar.style}`}>
                        {avatar.text}
                      </div>
                    </div>

                    {/* Cost */}
                    <div className="mb-3">
                      <span className="text-xs text-slate-500">Spent Amount</span>
                      <p className="text-xl font-black text-white mt-0.5">৳ {cost.toFixed(2)}</p>
                    </div>

                    {/* Short note or button */}
                    <div className="mt-2 min-h-[40px]">
                      {note ? (
                        <div className="flex items-start justify-between space-x-2">
                          <p className="text-xs text-slate-300 line-clamp-2 italic">
                            "{note}"
                          </p>
                          <button
                            onClick={() => setSelectedNote({ date, buyer, note })}
                            className="p-1 rounded-md text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 transition-colors shrink-0"
                            title="View Full Note"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-600 italic">No notes provided</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-800/50 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditBazar(item.data)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-[10px]"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteBazar(id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/20 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            } else {
              // Unrecorded Day
              return (
                <div
                  key={`empty-${item.date}`}
                  className="flex flex-col justify-between rounded-2xl border border-dashed border-slate-800 bg-slate-950/20 p-5 opacity-60 hover:opacity-85 transition-opacity"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-slate-600" />
                      <span>{item.date}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md">
                      Empty
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-400">Unrecorded Day</p>
                    <p className="text-xs text-slate-600 mt-1">No grocery costs logged for this date.</p>
                  </div>
                  <button
                    onClick={() => {
                      const selectedDay = item.date;
                      onAddBazar({ date: selectedDay });
                    }}
                    className="mt-6 w-full flex items-center justify-center space-x-1 py-1.5 border border-dashed border-slate-700 hover:border-slate-500 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>
              );
            }
          })
        ) : (
          <div className="col-span-full py-16 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-400">No items matches the filter</p>
            <p className="text-xs text-slate-600 mt-1">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md overflow-hidden rounded-2xl glass-panel shadow-2xl border border-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-850 bg-slate-900/40">
              <h3 className="text-sm font-bold text-slate-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Bazar Purchase details</span>
              </h3>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-2 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Buyer: <strong className="text-slate-200">{selectedNote.buyer}</strong></span>
                <span>Date: <strong className="text-slate-200">{selectedNote.date}</strong></span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900">
                <p className="text-sm text-slate-200 font-medium whitespace-pre-wrap leading-relaxed">
                  {selectedNote.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
