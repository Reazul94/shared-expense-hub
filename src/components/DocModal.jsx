import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

export default function DocModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl glass-panel shadow-2xl border border-slate-700/50">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-2">
            {isPrivacy ? (
              <Shield className="w-5 h-5 text-indigo-400" />
            ) : (
              <FileText className="w-5 h-5 text-indigo-400" />
            )}
            <h3 className="text-base font-semibold text-white">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[400px] overflow-y-auto text-sm text-slate-300 space-y-4 leading-relaxed">
          {isPrivacy ? (
            <>
              <p className="font-semibold text-white">1. Data Storage & Privacy Options</p>
              <p>
                This application supports two data storage modes:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Local Storage (Offline)</strong>: By default, all bazar lists, user logins, and roommate contributions are stored entirely client-side in your browser's local cache (<code>localStorage</code>). No data is transmitted to external servers.</li>
                <li><strong>Cloud Sync Mode (External Database)</strong>: If you configure external storage, your data is synced in real-time with your personal bin on JSONBin.io. Your credentials (API Key and Bin ID) are stored only in your local browser cache to enable direct API communication.</li>
              </ul>
              <p className="font-semibold text-white">2. Third-Party Integrations & Security</p>
              <p>
                We do not track, collect, or store your JSONBin API credentials or personal expense data. All traffic to JSONBin.io is executed directly from your web browser using HTTPS encryption. Export operations (PDF and Excel generation) are executed completely in-memory inside your browser without contacting external APIs.
              </p>
              <p className="font-semibold text-white">3. Clear Cached Data</p>
              <p>
                Clearing your browser cache or site data will reset your offline logs and disconnect any active Cloud Sync configurations.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-white">1. Agreement to Terms</p>
              <p>
                By using this Shared Expense Tracker, you agree to track house grocer expenses and settle balances according to these terms. This utility is provided solely for convenience.
              </p>
              <p className="font-semibold text-white">2. Split Calculations Ratio</p>
              <p>
                Splits are calculated based on the fixed ratio configured for roommates <strong>Reza</strong> (split weight: <strong>58.33%</strong>) and <strong>Reaz</strong> (split weight: <strong>41.67%</strong>).
              </p>
              <p className="font-semibold text-white">3. Data Backups & Cloud Sync Responsibility</p>
              <p>
                When using Local Storage, you risk data loss if you clear browser caches. When using Cloud Sync Mode, you are solely responsible for creating and securing your own JSONBin.io account, API keys, and database bins. We do not provide backup restoration services.
              </p>
              <p className="font-semibold text-white">4. License & Attribution</p>
              <p>
                This software is open source under the MIT License. The creator (Reazul) and contributors provide this code "as is" without warranties of any kind.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-800 bg-slate-900/20">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
