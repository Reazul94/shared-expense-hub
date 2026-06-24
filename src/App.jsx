import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import BazarGallery from './components/BazarGallery';
import PaymentsTab from './components/PaymentsTab';
import AnalyticsTab from './components/AnalyticsTab';
import BazarModal from './components/BazarModal';
import ContributionModal from './components/ContributionModal';
import Auth from './components/Auth';
import DocModal from './components/DocModal';
import { Calendar, DollarSign, BarChart3, Receipt, Wallet2, Settings, Sparkles, LogOut, User } from 'lucide-react';
import './App.css';

// Initial Mock Data
const INITIAL_BAZAR_DATA = [
  { id: 1, date: '2026-06-01', buyer: 'Reza', cost: 1200, note: 'Daily Groceries (Rice, Lentils, Oil)' },
  { id: 2, date: '2026-06-03', buyer: 'Reaz', cost: 850, note: 'Fresh Chicken & Eggs' },
  { id: 3, date: '2026-06-05', buyer: 'Reza', cost: 1500, note: 'Fish and Fresh Vegetables' },
  { id: 4, date: '2026-06-08', buyer: 'Reaz', cost: 650, note: 'Summer Fruits & Liquid Milk' },
  { id: 5, date: '2026-06-12', buyer: 'Reza', cost: 400, note: 'Spices, Ginger & Garlic' },
  { id: 6, date: '2026-06-15', buyer: 'Reaz', cost: 1100, note: 'Cleaning Supplies & Toiletries' },
  { id: 7, date: '2026-06-18', buyer: 'Reza', cost: 2200, note: 'Mutton & Extra Spices' },
  { id: 8, date: '2026-06-22', buyer: 'Reaz', cost: 450, note: 'Evening Snacks & Tea Pack' },
];

const INITIAL_CONTRIBUTIONS = {
  Reza: 8500,
  Reaz: 5000,
};

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('gallery');

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('active_user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        if (user && user.name === 'Vaia') {
          const migrated = { ...user, name: 'Reza' };
          localStorage.setItem('active_user', JSON.stringify(migrated));
          return migrated;
        }
        if (user && user.name === 'Reazul') {
          const migrated = { ...user, name: 'Reaz' };
          localStorage.setItem('active_user', JSON.stringify(migrated));
          return migrated;
        }
        return user;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('active_user');
    }
  }, [currentUser]);

  // State
  const [bazarList, setBazarList] = useState(() => {
    const saved = localStorage.getItem('bazar_list');
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        let changed = false;
        parsed = parsed.map(item => {
          if (item.buyer === 'Vaia') {
            changed = true;
            return { ...item, buyer: 'Reza' };
          }
          if (item.buyer === 'Reazul') {
            changed = true;
            return { ...item, buyer: 'Reaz' };
          }
          return item;
        });
        if (changed) {
          localStorage.setItem('bazar_list', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        return INITIAL_BAZAR_DATA;
      }
    }
    return INITIAL_BAZAR_DATA;
  });

  const [baseContributions, setBaseContributions] = useState(() => {
    const savedBase = localStorage.getItem('base_contributions');
    if (savedBase) {
      try {
        let parsed = JSON.parse(savedBase);
        if ('Vaia' in parsed || 'Reazul' in parsed) {
          const migrated = {
            Reza: parsed.Reza ?? parsed.Vaia ?? INITIAL_CONTRIBUTIONS.Reza,
            Reaz: parsed.Reaz ?? parsed.Reazul ?? INITIAL_CONTRIBUTIONS.Reaz,
          };
          localStorage.setItem('base_contributions', JSON.stringify(migrated));
          return migrated;
        }
        return parsed;
      } catch (e) {
        return INITIAL_CONTRIBUTIONS;
      }
    }
    const savedOld = localStorage.getItem('contributions');
    if (savedOld) {
      try {
        let parsed = JSON.parse(savedOld);
        if ('Vaia' in parsed || 'Reazul' in parsed) {
          const migrated = {
            Reza: parsed.Reza ?? parsed.Vaia ?? INITIAL_CONTRIBUTIONS.Reza,
            Reaz: parsed.Reaz ?? parsed.Reazul ?? INITIAL_CONTRIBUTIONS.Reaz,
          };
          localStorage.setItem('base_contributions', JSON.stringify(migrated));
          return migrated;
        }
        return parsed;
      } catch (e) {
        return INITIAL_CONTRIBUTIONS;
      }
    }
    return INITIAL_CONTRIBUTIONS;
  });

  // Modal controls
  const [isBazarOpen, setIsBazarOpen] = useState(false);
  const [isContributionOpen, setIsContributionOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [docModalType, setDocModalType] = useState(null); // 'privacy' | 'terms'

  // Gallery Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRoommate, setFilterRoommate] = useState('All');
  const [showUnrecorded, setShowUnrecorded] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');
  const [highlightedDate, setHighlightedDate] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('bazar_list', JSON.stringify(bazarList));
  }, [bazarList]);

  useEffect(() => {
    localStorage.setItem('base_contributions', JSON.stringify(baseContributions));
  }, [baseContributions]);

  // Calculate total bazar spent by each roommate
  const rezaBazarSpent = bazarList
    .filter(item => item.buyer === 'Reza')
    .reduce((sum, item) => sum + item.cost, 0);

  const reazBazarSpent = bazarList
    .filter(item => item.buyer === 'Reaz')
    .reduce((sum, item) => sum + item.cost, 0);

  // Total contribution is sum of base cash and out-of-pocket bazar spent
  const contributions = {
    Reza: baseContributions.Reza + rezaBazarSpent,
    Reaz: baseContributions.Reaz + reazBazarSpent,
  };

  // Calculations
  const calculateEngine = () => {
    const totalPool = contributions.Reza + contributions.Reaz;
    
    // Split percentages
    const splitReza = 0.5833;
    const splitReaz = 0.4167;

    const targetShare = {
      Reza: totalPool * splitReza,
      Reaz: totalPool * splitReaz,
    };

    const balance = {
      Reza: contributions.Reza - targetShare.Reza,
      Reaz: contributions.Reaz - targetShare.Reaz,
    };

    return {
      totalPool,
      targetShare,
      balance,
      baseContributions,
      rezaBazarSpent,
      reazBazarSpent,
    };
  };

  const calculations = calculateEngine();

  // CRUD Bazar list operations
  const handleSaveBazar = (item) => {
    if (editingItem) {
      setBazarList(prev => prev.map(x => x.id === item.id ? item : x));
      setEditingItem(null);
    } else {
      setBazarList(prev => [...prev, item]);
    }
  };

  const handleEditBazarClick = (item) => {
    setEditingItem(item);
    setIsBazarOpen(true);
  };

  const handleDeleteBazar = (id) => {
    if (confirm('Are you sure you want to delete this bazar cost?')) {
      setBazarList(prev => prev.filter(x => x.id !== id));
    }
  };

  const handleAddBazarClick = (initialState = null) => {
    setEditingItem(initialState);
    setIsBazarOpen(true);
  };

  // Save Contributions
  const handleSaveContributions = (updatedContributions) => {
    setBaseContributions(updatedContributions);
  };

  // Interactive Chart click navigation
  const handleBarClick = (date) => {
    setActiveTab('gallery');
    setFilterRoommate('All');
    setSearchQuery('');
    setHighlightedDate(date);
    
    // Smooth scroll to top and clear pulse effect after 3.5s
    window.scrollTo({ top: 200, behavior: 'smooth' });
    setTimeout(() => {
      setHighlightedDate(null);
    }, 3500);
  };

  if (!currentUser) {
    return <Auth onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="min-height-100vh flex flex-col justify-between pb-12">
      {/* Upper Ambient Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-indigo-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10 space-y-6">
        
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Wallet2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                Expense & Settlement Hub
                <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 tracking-wider">
                  Roommates
                </span>
              </h1>
              <p className="text-xs text-slate-400">Fixed Split: Reza 58.33% | Reaz 41.67%</p>
            </div>
          </div>

          {/* Quick Stats overview */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-900/60 border border-slate-800 p-1.5 rounded-xl">
            <div className="px-3 py-1 flex items-center space-x-2 text-xs">
              <User className="w-4 h-4 text-indigo-400" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">User</span>
                <span className="font-semibold text-slate-200">{currentUser.name}</span>
              </div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div className="px-3 py-1">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Contribution Pool</span>
              <span className="text-sm font-bold text-white">৳ {calculations.totalPool.toLocaleString()}</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <button
              onClick={() => setIsContributionOpen(true)}
              className="px-3 py-1.5 bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700/50"
            >
              Adjust Cash
            </button>
            <div className="h-6 w-px bg-slate-800" />
            <button
              onClick={() => setCurrentUser(null)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-450 hover:text-rose-450 text-xs font-bold rounded-lg border border-rose-500/20 transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Banner Info */}
        <Dashboard 
          contributions={contributions} 
          calculations={calculations} 
          onEditContributions={() => setIsContributionOpen(true)} 
        />

        {/* Navigation Tabs Switcher */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-px">
          <div className="flex space-x-2">
            {[
              { id: 'gallery', label: 'Bazar Gallery', icon: Receipt },
              { id: 'payments', label: 'Payments & Settlement', icon: DollarSign },
              { id: 'analytics', label: 'Spending Analytics', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-bold border-b-2 transition-all relative ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-indigo-500 blur-[2px]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Contents */}
        <main className="min-h-[400px] animate-fade-in">
          {activeTab === 'gallery' && (
            <BazarGallery
              bazarList={bazarList}
              onAddBazar={handleAddBazarClick}
              onEditBazar={handleEditBazarClick}
              onDeleteBazar={handleDeleteBazar}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterRoommate={filterRoommate}
              setFilterRoommate={setFilterRoommate}
              showUnrecorded={showUnrecorded}
              setShowUnrecorded={setShowUnrecorded}
              sortBy={sortBy}
              setSortBy={setSortBy}
              highlightedDate={highlightedDate}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsTab
              bazarList={bazarList}
              contributions={contributions}
              calculations={calculations}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab
              bazarList={bazarList}
              onBarClick={handleBarClick}
            />
          )}
        </main>

        {/* Footer with Copyright */}
        <footer className="pt-8 pb-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-semibold gap-3">
          <span>&copy; {new Date().getFullYear()} Reazul. All Rights Reserved.</span>
          <div className="flex items-center space-x-4">
            <span onClick={() => setDocModalType('privacy')} className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span onClick={() => setDocModalType('terms')} className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <BazarModal
        isOpen={isBazarOpen}
        onClose={() => {
          setIsBazarOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveBazar}
        item={editingItem}
      />

      <ContributionModal
        isOpen={isContributionOpen}
        onClose={() => setIsContributionOpen(false)}
        onSave={handleSaveContributions}
        contributions={baseContributions}
      />

      <DocModal
        isOpen={!!docModalType}
        onClose={() => setDocModalType(null)}
        type={docModalType}
      />
    </div>
  );
}
