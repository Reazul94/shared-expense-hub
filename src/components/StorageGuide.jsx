import React from 'react';
import { Database, Shield, Share2, Info, ArrowRight, ExternalLink, HelpCircle, HardDrive, Wifi, Settings } from 'lucide-react';

export default function StorageGuide({ isCloudActive, onOpenSettings }) {
  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* Overview Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-[30%] h-[150%] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">Database Storage Systems</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">How is your data saved?</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            This Settlement Hub supports two storage modes: <strong>Local Mode</strong> (standalone browser database) and <strong>Cloud Sync Mode</strong> (real-time shared database). Understand how to switch between them below.
          </p>
        </div>
        
        {/* Status Badge */}
        <div className="shrink-0 flex flex-col items-start md:items-end justify-center">
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 block mb-1">Current Active Mode</span>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border text-xs font-bold ${
            isCloudActive 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-450 shadow-lg shadow-emerald-500/5'
              : 'bg-slate-850 border-slate-800 text-slate-350'
          }`}>
            {isCloudActive ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Cloud Sync Mode (Active)</span>
              </>
            ) : (
              <>
                <HardDrive className="w-4 h-4 text-indigo-400" />
                <span>Local Mode (Active)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Storage Modes Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Local Storage Card */}
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-850 hover:border-slate-800 transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">1. Local Mode (Offline Browser Storage)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Data is saved directly in your web browser's <code>localStorage</code> cache. Only you can view or modify the logs on this specific device.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-bold">✔</span>
                <span><strong>No Setup Required</strong>: Start logging expenses instantly.</span>
              </div>
              <div className="flex items-start space-x-2 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-bold">✔</span>
                <span><strong>Lightning Fast</strong>: Zero latency network operations.</span>
              </div>
              <div className="flex items-start space-x-2 text-[11px] text-rose-455">
                <span className="text-rose-455 font-bold">✖</span>
                <span><strong>No Synchronization</strong>: Other roommates cannot see your edits.</span>
              </div>
              <div className="flex items-start space-x-2 text-[11px] text-rose-455">
                <span className="text-rose-455 font-bold">✖</span>
                <span><strong>Risk of Data Loss</strong>: Clearing browser history/cache deletes the data.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850/60">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">How to Switch to Local Mode:</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              If currently in Cloud Mode, click the database button in the header (currently shows <strong>Cloud Active</strong>) to open settings, and click the red <strong>Disconnect</strong> button. Your data will immediately fall back to local storage.
            </p>
          </div>
        </div>

        {/* Cloud Sync Card */}
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-850 hover:border-slate-800 transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">2. Cloud Sync Mode (Shared Database)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Data is stored securely on JSONBin.io. Both Reza and Reaz can read, write, and sync data simultaneously across different mobile devices or PCs.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-bold">✔</span>
                <span><strong>Multi-Device Sync</strong>: Changes reflect instantly for both users.</span>
              </div>
              <div className="flex items-start space-x-2 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-bold">✔</span>
                <span><strong>Auto-Backup</strong>: Data is safely stored in the cloud, even if you clear your browser.</span>
              </div>
              <div className="flex items-start space-x-2 text-[11px] text-amber-455">
                <span className="text-amber-455 font-bold">⚠</span>
                <span><strong>Setup Required</strong>: Requires creating a free JSONBin.io database bin.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850/60">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">How to Switch to Cloud Sync Mode:</h4>
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                Click the database status button in the header to open settings, register a free JSONBin, and paste your API Credentials.
              </p>
              <button
                onClick={onOpenSettings}
                className="shrink-0 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors shadow-md shadow-indigo-600/10"
              >
                <span>Setup Cloud</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Step-by-Step Cloud Configuration Details */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Settings className="w-4 h-4 text-indigo-400" />
          <span>Step-by-Step JSONBin.io Integration Guide</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] text-slate-400">
          <div className="space-y-2">
            <div className="font-bold text-slate-350 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center">1</span>
              <span>Create Account</span>
            </div>
            <p className="leading-relaxed">
              Sign up for a free developer account at <a href="https://jsonbin.io" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center space-x-0.5"><span>jsonbin.io</span><ExternalLink className="w-2.5 h-2.5 inline" /></a>. It takes less than a minute.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-350 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center">2</span>
              <span>Generate Master API Key</span>
            </div>
            <p className="leading-relaxed">
              Navigate to the <strong>API Keys</strong> page in your dashboard. Copy the auto-generated <strong>Master Key</strong> (starts with <code>$2b$</code>).
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-350 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center">3</span>
              <span>Create Bin & Paste Template</span>
            </div>
            <p className="leading-relaxed">
              Go to <strong>Bins</strong>, click <strong>Create Bin</strong>, and paste the database template structure. Save the Bin and copy its **Bin ID**.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/65 border border-slate-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[11px] text-slate-300 block">Initial Bin JSON Template</span>
              <span className="text-[10px] text-slate-500 leading-normal block mt-0.5">
                Paste this exact template into your Bin editor when creating your JSONBin:
              </span>
            </div>
          </div>
          <pre className="bg-slate-950 border border-slate-850 rounded p-2.5 text-[9px] font-mono text-slate-400 overflow-x-auto select-all w-full md:w-auto shrink-0">
            {`{
  "bazarList": [],
  "baseContributions": { "Reza": 8500, "Reaz": 5000 },
  "registeredUsers": []
}`}
          </pre>
        </div>
      </div>

    </div>
  );
}
