import React, { useState, useEffect } from 'react';
import { X, Cloud, Key, FileCode, CheckCircle, AlertCircle, Info, ExternalLink } from 'lucide-react';

export default function DbSettingsModal({ isOpen, onClose, onSave, apiKey, binId, isCloudActive }) {
  const [localApiKey, setLocalApiKey] = useState('');
  const [localBinId, setLocalBinId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  useEffect(() => {
    setLocalApiKey(apiKey || '');
    setLocalBinId(binId || '');
    setStatusMessage('');
  }, [apiKey, binId, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Connecting & validating database...');
    setStatusType('info');

    const trimmedKey = localApiKey.trim();
    const trimmedBin = localBinId.trim();

    if (!trimmedKey || !trimmedBin) {
      setStatusMessage('Please fill in both the Master Key and Bin ID.');
      setStatusType('error');
      return;
    }

    try {
      // Test read to validate credentials
      const res = await fetch(`https://api.jsonbin.io/v3/b/${trimmedBin}`, {
        method: 'GET',
        headers: {
          'X-Master-Key': trimmedKey,
          'X-Bin-Meta': 'false',
        }
      });

      if (!res.ok) {
        throw new Error(`Connection failed: ${res.statusText}`);
      }

      const testData = await res.json();
      
      // Basic schema check
      if (testData && typeof testData === 'object') {
        setStatusMessage('Success! Database connected and synced.');
        setStatusType('success');
        
        // Pass credentials back
        setTimeout(() => {
          onSave(trimmedKey, trimmedBin);
          onClose();
        }, 1000);
      } else {
        throw new Error('Database schema invalid. Bin must contain a JSON object.');
      }
    } catch (err) {
      console.error(err);
      setStatusMessage(`Error: ${err.message || 'Invalid API Key or Bin ID.'}`);
      setStatusType('error');
    }
  };

  const handleDisconnect = () => {
    if (confirm('Disconnect from external storage? You will fall back to local storage.')) {
      onSave('', '');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl glass-panel shadow-2xl border border-slate-700/50">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-white">External Database Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Status Message */}
          {statusMessage && (
            <div className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center space-x-2 animate-fade-in ${
              statusType === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
              statusType === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-450' :
              'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
            }`}>
              {statusType === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> :
               statusType === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> :
               <Info className="w-4 h-4 shrink-0" />}
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Guidelines */}
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-900/50 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <span>Setup Guide</span>
            </h4>
            <ol className="text-[11px] text-slate-400 list-decimal list-inside space-y-1">
              <li>Sign up for a free account at <a href="https://jsonbin.io" target="_blank" rel="noreferrer" className="text-indigo-455 hover:underline inline-flex items-center space-x-0.5"><span>jsonbin.io</span><ExternalLink className="w-2.5 h-2.5 inline" /></a></li>
              <li>Go to <strong>API Keys</strong> page and copy your <strong>Master Key</strong>.</li>
              <li>Go to <strong>Bins</strong>, click <strong>Create Bin</strong>, paste this template, and click Create:</li>
            </ol>
            <pre className="bg-slate-950 border border-slate-900 rounded p-2 text-[9px] font-mono text-slate-500 overflow-x-auto select-all">
              {`{
  "bazarList": [],
  "baseContributions": { "Reza": 0, "Reaz": 0 },
  "registeredUsers": []
}`}
            </pre>
            <p className="text-[10px] text-indigo-455 font-medium">4. Copy the Bin ID and enter both values below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* API Key */}
            <div>
              <label className="block mb-1.5 text-xs font-semibold text-slate-400">Master API Key</label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="e.g. $2b$10$..."
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Bin ID */}
            <div>
              <label className="block mb-1.5 text-xs font-semibold text-slate-400">Bin ID</label>
              <div className="relative">
                <FileCode className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 60f785..."
                  value={localBinId}
                  onChange={(e) => setLocalBinId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div>
                {isCloudActive && (
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-455 border border-rose-500/25 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Disconnect
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-xs rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md shadow-indigo-500/20"
                >
                  Connect & Sync
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
