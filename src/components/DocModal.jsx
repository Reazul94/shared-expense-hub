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
        <div className="p-6 max-h-[420px] overflow-y-auto text-sm text-slate-300 space-y-5 leading-relaxed scrollbar-thin">
          {isPrivacy ? (
            <>
              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>1. Data Storage & Privacy Options</span>
                </p>
                <p className="text-slate-400 mb-2">
                  This application supports two distinct data storage modes to give you full control over your privacy:
                </p>
                <ul className="space-y-2 pl-3">
                  <li className="text-slate-300">
                    <strong className="text-indigo-400">Local Storage (Offline):</strong> By default, all bazar lists, user logins, and roommate contributions are stored entirely client-side in your browser's local cache (<code>localStorage</code>). No data is transmitted to external servers.
                  </li>
                  <li className="text-slate-300">
                    <strong className="text-emerald-400">Cloud Sync Mode (External Database):</strong> If you configure external storage, your data is synced in real-time with your personal bin on JSONBin.io. Your credentials (API Key and Bin ID) are stored only in your local browser cache to enable direct API communication.
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>2. Third-Party Integrations & Security</span>
                </p>
                <p className="text-slate-400">
                  We do not track, collect, or store your JSONBin API credentials or personal expense data. All traffic to JSONBin.io is executed directly from your web browser using HTTPS encryption. Export operations (PDF and Excel generation) are executed completely in-memory inside your browser without contacting external APIs.
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>3. Clear Cached Data</span>
                </p>
                <p className="text-slate-400">
                  Clearing your browser cache or site data will reset your offline logs and disconnect any active Cloud Sync configurations. Make sure to back up your data or keep cloud credentials safe before clearing cache.
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>4. Transparency & Contact</span>
                </p>
                <p className="text-slate-400">
                  For questions, security concerns, or bug reports regarding this Expense Hub, please contact the developer (<strong className="text-indigo-400">Reazul</strong>) directly or submit an issue on the project's GitHub repository.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>1. Agreement to Terms</span>
                </p>
                <p className="text-slate-400">
                  By using this Shared Expense Tracker, you agree to track house grocer expenses and settle balances according to these terms. This utility is provided solely for convenience and cooperative living organization.
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>2. Split Calculations Ratio</span>
                </p>
                <p className="text-slate-400">
                  Splits are calculated based on the fixed ratio configured for roommates <strong className="text-white">Reza</strong> (split weight: <strong className="text-indigo-400">58.33%</strong>) and <strong className="text-white">Reaz</strong> (split weight: <strong className="text-emerald-400">41.67%</strong>).
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>3. Data Backups & Cloud Sync Responsibility</span>
                </p>
                <p className="text-slate-400">
                  When using Local Storage, you risk data loss if you clear browser caches. When using Cloud Sync Mode, you are solely responsible for creating and securing your own JSONBin.io account, API keys, and database bins. We do not provide backup restoration services or database hosting.
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>4. License & Attribution</span>
                </p>
                <p className="text-slate-400">
                  This software is open source under the MIT License. The creator (<strong className="text-indigo-400">Reazul</strong>) and contributors provide this code "as is" without warranties of any kind.
                </p>
              </div>
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
