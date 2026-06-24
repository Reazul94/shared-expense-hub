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
              <p className="font-semibold text-white">1. Data Storage & Privacy Policy</p>
              <p>
                This application operates entirely client-side. All expense data, roommate contributions, shopping logs, and session settings are stored locally on your device's browser cache using <strong>Local Storage</strong> (<code>localStorage</code>).
              </p>
              <p>
                No data is transmitted, processed, or stored on any external servers. Your financial information, grocery costs, and mobile numbers remain completely private to your local browser environment.
              </p>
              <p className="font-semibold text-white">2. Third-Party Integrations</p>
              <p>
                This application does not integrate with any third-party marketing, analytics, or user-tracking tools. PDF and Excel file generation is executed fully inside your browser without any network API communication.
              </p>
              <p className="font-semibold text-white">3. Cookies and Session Tokens</p>
              <p>
                No HTTP tracking cookies are utilized. Only persistent state records necessary to maintain your login session and bazar entry history are retained. Clearing your browser cookies/site data will reset all logs.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-white">1. Agreement to Terms</p>
              <p>
                By using this Shared Expense & Settlement Hub, you agree to govern house expense splits and settle dues under your own roommate agreement terms. This utility is provided solely for tracking purposes.
              </p>
              <p className="font-semibold text-white">2. Calculation Split Ratio</p>
              <p>
                The calculation engine operates on a fixed ratio split where roommate <strong>Reza</strong> split weight is <strong>58.33%</strong> and roommate <strong>Reaz</strong> split weight is <strong>41.67%</strong>. This split configuration remains fixed as per the project specifications.
              </p>
              <p className="font-semibold text-white">3. Data Backups & Loss of Data</p>
              <p>
                Because this application relies entirely on browser <code>localStorage</code>, your records can be lost if you clear your browser history, reset cache data, or use incognito private browsing sessions. It is highly recommended to export your reports regularly using the <strong>Export Excel (CSV)</strong> feature.
              </p>
              <p className="font-semibold text-white">4. License & Indemnity</p>
              <p>
                This software is open source under the MIT License. The creator (Reazul) and contributors provide this code "as is" and are not responsible for any tracking disputes or data loss.
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
