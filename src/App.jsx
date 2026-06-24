import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import BazarGallery from './components/BazarGallery';
import PaymentsTab from './components/PaymentsTab';
import AnalyticsTab from './components/AnalyticsTab';
import BazarModal from './components/BazarModal';
import ContributionModal from './components/ContributionModal';
import Auth from './components/Auth';
import DocModal from './components/DocModal';
import DbSettingsModal from './components/DbSettingsModal';
import StorageGuide from './components/StorageGuide';
import { fetchCloudData, updateCloudData } from './utils/db';
import { Calendar, DollarSign, BarChart3, Receipt, Wallet2, Settings, Sparkles, LogOut, User, Cloud, CloudOff, CloudLightning, Database, HelpCircle } from 'lucide-react';
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

// Helper to migrate legacy names ("Vaia" -> "Reza", "Reazul" -> "Reaz") in all data structures
const migrateLegacyNames = (data) => {
  if (!data) return data;
  
  // 1. Migrate bazarList
  let bazarList = data.bazarList;
  if (Array.isArray(bazarList)) {
    bazarList = bazarList.map(item => {
      if (item.buyer === 'Vaia') return { ...item, buyer: 'Reza' };
      if (item.buyer === 'Reazul') return { ...item, buyer: 'Reaz' };
      return item;
    });
  }

  // 2. Migrate baseContributions
  let baseContributions = data.baseContributions;
  if (baseContributions) {
    if ('Vaia' in baseContributions || 'Reazul' in baseContributions) {
      baseContributions = {
        Reza: baseContributions.Reza ?? baseContributions.Vaia ?? INITIAL_CONTRIBUTIONS.Reza,
        Reaz: baseContributions.Reaz ?? baseContributions.Reazul ?? INITIAL_CONTRIBUTIONS.Reaz,
      };
    }
  }

  // 3. Migrate registeredUsers
  let registeredUsers = data.registeredUsers;
  if (Array.isArray(registeredUsers)) {
    registeredUsers = registeredUsers.map(user => {
      if (user.name === 'Vaia') return { ...user, name: 'Reza' };
      if (user.name === 'Reazul') return { ...user, name: 'Reaz' };
      return user;
    });
  }

  // 4. Migrate currentUser
  let currentUser = data.currentUser;
  if (currentUser) {
    if (currentUser.name === 'Vaia') {
      currentUser = { ...currentUser, name: 'Reza' };
    } else if (currentUser.name === 'Reazul') {
      currentUser = { ...currentUser, name: 'Reaz' };
    }
  }

  return {
    ...data,
    bazarList,
    baseContributions,
    registeredUsers,
    currentUser
  };
};

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('gallery');

  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);

  // State
  const [bazarList, setBazarList] = useState(() => {
    const saved = localStorage.getItem('bazar_list');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        const migrated = migrateLegacyNames({ bazarList: list });
        if (JSON.stringify(migrated.bazarList) !== JSON.stringify(list)) {
          localStorage.setItem('bazar_list', JSON.stringify(migrated.bazarList));
        }
        return migrated.bazarList;
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
        const base = JSON.parse(savedBase);
        const migrated = migrateLegacyNames({ baseContributions: base });
        if (JSON.stringify(migrated.baseContributions) !== JSON.stringify(base)) {
          localStorage.setItem('base_contributions', JSON.stringify(migrated.baseContributions));
        }
        return migrated.baseContributions;
      } catch (e) {
        return INITIAL_CONTRIBUTIONS;
      }
    }
    const savedOld = localStorage.getItem('contributions');
    if (savedOld) {
      try {
        const old = JSON.parse(savedOld);
        const migrated = migrateLegacyNames({ baseContributions: old });
        localStorage.setItem('base_contributions', JSON.stringify(migrated.baseContributions));
        return migrated.baseContributions;
      } catch (e) {
        return INITIAL_CONTRIBUTIONS;
      }
    }
    return INITIAL_CONTRIBUTIONS;
  });

  // Registered Users State
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('registered_users');
    if (saved) {
      try {
        const users = JSON.parse(saved);
        const migrated = migrateLegacyNames({ registeredUsers: users });
        if (JSON.stringify(migrated.registeredUsers) !== JSON.stringify(users)) {
          localStorage.setItem('registered_users', JSON.stringify(migrated.registeredUsers));
        }
        return migrated.registeredUsers;
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Cloud Sync Settings States
  const [dbApiKey, setDbApiKey] = useState(() => localStorage.getItem('db_api_key') || '');
  const [dbBinId, setDbBinId] = useState(() => localStorage.getItem('db_bin_id') || '');
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudError, setCloudError] = useState('');
  const [isDbSettingsOpen, setIsDbSettingsOpen] = useState(false);

  const isCloudActive = !!(dbApiKey && dbBinId);

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

  useEffect(() => {
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Cloud Sync API Actions
  const pullFromCloud = async (key = dbApiKey, id = dbBinId) => {
    if (!key || !id) return;
    setIsCloudSyncing(true);
    setCloudError('');
    try {
      const rawData = await fetchCloudData(key, id);
      if (rawData) {
        const data = migrateLegacyNames(rawData);
        if (Array.isArray(data.bazarList)) {
          setBazarList(data.bazarList);
        }
        if (data.baseContributions) {
          setBaseContributions(data.baseContributions);
        }
        if (Array.isArray(data.registeredUsers)) {
          setRegisteredUsers(data.registeredUsers);
        }
        // Also migrate current session user if active
        if (currentUser) {
          const migratedUser = migrateLegacyNames({ currentUser }).currentUser;
          if (migratedUser.name !== currentUser.name) {
            setCurrentUser(migratedUser);
          }
        }
      }
    } catch (err) {
      console.error(err);
      setCloudError(err.message || 'Failed to pull cloud database');
    } finally {
      setIsCloudSyncing(false);
    }
  };

  const pushToCloud = async (list, contribs, users) => {
    if (!dbApiKey || !dbBinId) return;
    setIsCloudSyncing(true);
    setCloudError('');
    try {
      const migrated = migrateLegacyNames({
        bazarList: list,
        baseContributions: contribs,
        registeredUsers: users
      });
      await updateCloudData(dbApiKey, dbBinId, {
        bazarList: migrated.bazarList,
        baseContributions: migrated.baseContributions,
        registeredUsers: migrated.registeredUsers,
      });
    } catch (err) {
      console.error(err);
      setCloudError(err.message || 'Failed to sync with cloud database');
    } finally {
      setIsCloudSyncing(false);
    }
  };

  const handleSaveDbSettings = (key, id) => {
    setDbApiKey(key);
    setDbBinId(id);
    if (key && id) {
      localStorage.setItem('db_api_key', key);
      localStorage.setItem('db_bin_id', id);
      pullFromCloud(key, id);
    } else {
      localStorage.removeItem('db_api_key');
      localStorage.removeItem('db_bin_id');
      setDbApiKey('');
      setDbBinId('');
    }
  };

  // Initial pull if cloud is active
  useEffect(() => {
    if (isCloudActive) {
      pullFromCloud();
    }
  }, []);

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
    let updated;
    if (editingItem) {
      updated = bazarList.map(x => x.id === item.id ? item : x);
      setEditingItem(null);
    } else {
      updated = [...bazarList, item];
    }
    setBazarList(updated);
    if (isCloudActive) {
      pushToCloud(updated, baseContributions, registeredUsers);
    }
  };

  const handleEditBazarClick = (item) => {
    setEditingItem(item);
    setIsBazarOpen(true);
  };

  const handleDeleteBazar = (id) => {
    if (confirm('Are you sure you want to delete this bazar cost?')) {
      const updated = bazarList.filter(x => x.id !== id);
      setBazarList(updated);
      if (isCloudActive) {
        pushToCloud(updated, baseContributions, registeredUsers);
      }
    }
  };

  const handleAddBazarClick = (initialState = null) => {
    setEditingItem(initialState);
    setIsBazarOpen(true);
  };

  // Save Contributions
  const handleSaveContributions = (updatedContributions) => {
    setBaseContributions(updatedContributions);
    if (isCloudActive) {
      pushToCloud(bazarList, updatedContributions, registeredUsers);
    }
  };

  // Register user callback
  const handleRegisterUser = (newUser) => {
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    if (isCloudActive) {
      pushToCloud(bazarList, baseContributions, updatedUsers);
    }
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
    return (
      <Auth 
        onLoginSuccess={(user) => setCurrentUser(user)} 
        registeredUsers={registeredUsers}
        onRegisterUser={handleRegisterUser}
      />
    );
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
            {/* Database status button */}
            <button
              onClick={() => setIsDbSettingsOpen(true)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                isCloudActive
                  ? isCloudSyncing
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse'
                    : cloudError
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-450'
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-slate-800 border-slate-700/50 text-slate-450 hover:text-slate-200'
              }`}
              title={isCloudActive ? (cloudError ? `Sync Error: ${cloudError}` : 'Cloud Synced. Click to configure settings.') : 'Configure External Storage'}
            >
              {isCloudActive ? (
                isCloudSyncing ? (
                  <>
                    <CloudLightning className="w-3.5 h-3.5 animate-bounce text-amber-450" />
                    <span>Syncing...</span>
                  </>
                ) : cloudError ? (
                  <>
                    <CloudOff className="w-3.5 h-3.5" />
                    <span>Sync Error</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Cloud Active</span>
                  </>
                )
              ) : (
                <>
                  <CloudOff className="w-3.5 h-3.5" />
                  <span>Local Mode</span>
                </>
              )}
            </button>

            {isCloudActive && (
              <button
                onClick={() => pullFromCloud()}
                disabled={isCloudSyncing}
                className="p-1.5 bg-slate-800 border border-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-350 hover:text-white transition-colors"
                title="Force Cloud Refresh"
              >
                <Database className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
              </button>
            )}

            <div className="h-6 w-px bg-slate-800" />
            
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
              onClick={() => setActiveTab('storage-guide')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                activeTab === 'storage-guide'
                  ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400 font-bold'
                  : 'bg-slate-800 border-slate-700/50 text-slate-350 hover:text-white'
              }`}
              title="View Instructions & Storage Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Instruction</span>
            </button>
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
              { id: 'storage-guide', label: 'Instruction', icon: HelpCircle },
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

          {activeTab === 'storage-guide' && (
            <StorageGuide
              isCloudActive={isCloudActive}
              onOpenSettings={() => setIsDbSettingsOpen(true)}
            />
          )}
        </main>

        {/* Footer with Copyright */}
        <footer className="pt-8 pb-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-semibold gap-3">
          <span>&copy; {new Date().getFullYear()} Reazul. All Rights Reserved.</span>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setActiveTab('storage-guide')} 
              className="hover:text-indigo-300 text-indigo-400 font-bold transition-colors"
            >
              Instruction
            </button>
            <span className="text-slate-700">&bull;</span>
            <button 
              onClick={() => setDocModalType('privacy')} 
              className="hover:text-slate-300 text-slate-400 font-semibold transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">&bull;</span>
            <button 
              onClick={() => setDocModalType('terms')} 
              className="hover:text-slate-300 text-slate-400 font-semibold transition-colors"
            >
              Terms of Service
            </button>
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

      <DbSettingsModal
        isOpen={isDbSettingsOpen}
        onClose={() => setIsDbSettingsOpen(false)}
        onSave={handleSaveDbSettings}
        apiKey={dbApiKey}
        binId={dbBinId}
        isCloudActive={isCloudActive}
      />
    </div>
  );
}
