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
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">Database Storage Systems / ডাটাবেস স্টোরেজ সিস্টেম</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">How is your data saved? / আপনার ডেটা কীভাবে সংরক্ষিত হয়?</h2>
          <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
            This Settlement Hub supports two storage modes: <strong>Local Mode</strong> (standalone browser database) and <strong>Cloud Sync Mode</strong> (real-time shared database). Understand how to switch between them below.
          </p>
          <p className="text-xs text-slate-450 leading-relaxed italic border-l-2 border-indigo-500/30 pl-2">
            এই সেটেলমেন্ট হাবটি দুটি স্টোরেজ মোড সমর্থন করে: <strong>লোকাল মোড</strong> (ব্রাউজারের নিজস্ব ডাটাবেস) এবং <strong>ক্লাউড সিঙ্ক মোড</strong> (রিয়েল-টাইম শেয়ার্ড ডাটাবেস)। নিচে এগুলো কীভাবে পরিবর্তন করতে হয় তা জানুন।
          </p>
        </div>
        
        {/* Status Badge */}
        <div className="shrink-0 flex flex-col items-start md:items-end justify-center">
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 block mb-1">Current Active Mode / বর্তমান সক্রিয় মোড</span>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border text-xs font-bold ${
            isCloudActive 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-450 shadow-lg shadow-emerald-500/5'
              : 'bg-slate-850 border-slate-800 text-slate-350'
          }`}>
            {isCloudActive ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Cloud Sync Mode (Active) / ক্লাউড সিঙ্ক মোড (সক্রিয়)</span>
              </>
            ) : (
              <>
                <HardDrive className="w-4 h-4 text-indigo-400" />
                <span>Local Mode (Active) / লোকাল মোড (সক্রিয়)</span>
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
              <h3 className="text-base font-bold text-white">1. Local Mode / লোকাল মোড (Offline Browser Storage)</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Data is saved directly in your web browser's <code>localStorage</code> cache. Only you can view or modify the logs on this specific device.
              </p>
              <p className="text-xs text-slate-450 mt-1 italic">
                ডেটা সরাসরি আপনার ওয়েব ব্রাউজারের <code>localStorage</code> ক্যাশে সংরক্ষিত হয়। শুধুমাত্র আপনি এই নির্দিষ্ট ডিভাইসে লগগুলো দেখতে বা পরিবর্তন করতে পারবেন।
              </p>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="text-[11px] text-slate-300 border-l-2 border-emerald-500/45 pl-2">
                <div>✔ <strong>No Setup Required</strong>: Start logging expenses instantly.</div>
                <div className="text-slate-450 italic mt-0.5">কোনো সেটআপের প্রয়োজন নেই: তাৎক্ষণিকভাবে খরচ রেকর্ড করা শুরু করুন।</div>
              </div>
              <div className="text-[11px] text-slate-300 border-l-2 border-emerald-500/45 pl-2">
                <div>✔ <strong>Lightning Fast</strong>: Zero latency network operations.</div>
                <div className="text-slate-450 italic mt-0.5">অত্যন্ত দ্রুত: নেটওয়ার্ক লেটেন্সি বা বিলম্ব ছাড়াই কাজ করে।</div>
              </div>
              <div className="text-[11px] text-slate-300 border-l-2 border-rose-500/45 pl-2">
                <div>✖ <strong>No Synchronization</strong>: Other roommates cannot see your edits.</div>
                <div className="text-rose-455/80 italic mt-0.5">কোনো সিনক্রোনাইজেশন নেই: অন্যান্য রুমমেটরা আপনার করা পরিবর্তন দেখতে পাবে না।</div>
              </div>
              <div className="text-[11px] text-slate-300 border-l-2 border-rose-500/45 pl-2">
                <div>✖ <strong>Risk of Data Loss</strong>: Clearing browser cache deletes the data.</div>
                <div className="text-rose-455/80 italic mt-0.5">ডেটা হারানোর ঝুঁকি: ব্রাউজারের ক্যাশ মুছে ফেললে ডেটা ডিলেট হয়ে যাবে।</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850/60">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">How to Switch / কীভাবে পরিবর্তন করবেন:</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If currently in Cloud Mode, click the database button in the header (currently shows <strong>Cloud Active</strong>) to open settings, and click the red <strong>Disconnect</strong> button. Your data will immediately fall back to local storage.
            </p>
            <p className="text-xs text-slate-450 leading-relaxed italic mt-1">
              বর্তমানে ক্লাউড মোডে থাকলে, সেটিং ওপেন করতে হেডার-এর ডাটাবেস বাটনে ক্লিক করুন এবং লাল রঙের <strong>Disconnect</strong> বাটনে ক্লিক করুন। আপনার ডেটা অবিলম্বে লোকাল স্টোরেজে ফিরে আসবে।
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
              <h3 className="text-base font-bold text-white">2. Cloud Sync Mode / ক্লাউড সিঙ্ক মোড (Shared Database)</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Data is stored securely on JSONBin.io. Both Reza and Reaz can read, write, and sync data simultaneously across different mobile devices or PCs.
              </p>
              <p className="text-xs text-slate-450 mt-1 italic">
                ডেটা নিরাপদে JSONBin.io-তে সংরক্ষিত হয়। রেজা এবং রিয়াজ উভয়ই বিভিন্ন মোবাইল বা পিসিতে একই সাথে ডেটা পড়তে, লিখতে এবং সিঙ্ক করতে পারবেন।
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-[11px] text-slate-300 border-l-2 border-emerald-500/45 pl-2">
                <div>✔ <strong>Multi-Device Sync</strong>: Changes reflect instantly for both users.</div>
                <div className="text-slate-450 italic mt-0.5">মাল্টি-ডিভাইস সিঙ্ক: উভয় ব্যবহারকারীর জন্য পরিবর্তনগুলো তাৎক্ষণিকভাবে আপডেট হয়।</div>
              </div>
              <div className="text-[11px] text-slate-300 border-l-2 border-emerald-500/45 pl-2">
                <div>✔ <strong>Auto-Backup</strong>: Data is safely stored in the cloud, even if you clear your browser.</div>
                <div className="text-slate-450 italic mt-0.5">অটো-ব্যাকআপ: আপনার ব্রাউজারের ক্যাশ মুছে ফেললেও ডেটা ক্লাউডে নিরাপদে থাকে।</div>
              </div>
              <div className="text-[11px] text-slate-300 border-l-2 border-amber-500/45 pl-2">
                <div>⚠ <strong>Setup Required</strong>: Requires creating a free JSONBin.io database bin.</div>
                <div className="text-amber-455/80 italic mt-0.5">সেটআপের প্রয়োজন: একটি ফ্রি JSONBin.io ডাটাবেস বিন তৈরি করতে হবে।</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850/60">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">How to Switch / কীভাবে পরিবর্তন করবেন:</h4>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Click the database status button in the header to open settings, register a free JSONBin, and paste your API Credentials.
                </p>
                <p className="text-xs text-slate-450 leading-relaxed italic">
                  সেটিং ওপেন করতে হেডারে ডাটাবেস বাটনে ক্লিক করুন, একটি ফ্রি JSONBin অ্যাকাউন্ট রেজিস্টার করুন এবং আপনার API ক্রেডেন্সিয়াল পেস্ট করুন।
                </p>
              </div>
              <button
                onClick={onOpenSettings}
                className="shrink-0 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors shadow-md shadow-indigo-600/10"
              >
                <span>Setup Cloud / ক্লাউড সেটআপ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Step-by-Step Cloud Configuration Details */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Settings className="w-4 h-4 text-indigo-400" />
          <span>Step-by-Step JSONBin.io Integration Guide / ধাপে ধাপে JSONBin.io সংযোগ নির্দেশিকা</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] text-slate-400">
          <div className="space-y-2 border-l border-slate-800/80 pl-3">
            <div className="font-bold text-slate-300 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">1</span>
              <span>Create Account / অ্যাকাউন্ট তৈরি</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              Sign up for a free developer account at <a href="https://jsonbin.io" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center space-x-0.5"><span>jsonbin.io</span><ExternalLink className="w-2.5 h-2.5 inline" /></a>. It takes less than a minute.
            </p>
            <p className="leading-relaxed text-slate-500 italic">
              jsonbin.io-তে একটি ফ্রি ডেভেলপার অ্যাকাউন্টের জন্য সাইন আপ করুন। এটি করতে এক মিনিটেরও কম সময় লাগে।
            </p>
          </div>

          <div className="space-y-2 border-l border-slate-800/80 pl-3">
            <div className="font-bold text-slate-300 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">2</span>
              <span>Generate API Key / API কী তৈরি</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              Navigate to the <strong>API Keys</strong> page in your dashboard. Copy the auto-generated <strong>Master Key</strong> (starts with <code>$2b$</code>).
            </p>
            <p className="leading-relaxed text-slate-500 italic">
              আপনার ড্যাশবোর্ডে <strong>API Keys</strong> পেজে যান। স্বয়ংক্রিয়ভাবে তৈরি হওয়া <strong>Master Key</strong> কপি করুন (এটি <code>$2b$</code> দিয়ে শুরু হয়)।
            </p>
          </div>

          <div className="space-y-2 border-l border-slate-800/80 pl-3">
            <div className="font-bold text-slate-300 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">3</span>
              <span>Create Bin / বিন তৈরি করা</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              Go to <strong>Bins</strong>, click <strong>Create Bin</strong>, and paste the database template structure. Save the Bin and copy its **Bin ID**.
            </p>
            <p className="leading-relaxed text-slate-500 italic">
              <strong>Bins</strong>-এ যান, <strong>Create Bin</strong>-এ ক্লিক করুন এবং ডাটাবেস টেমপ্লেট স্ট্রাকচারটি পেস্ট করুন। বিনটি সংরক্ষণ করে এর **Bin ID** কপি করুন।
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/65 border border-slate-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[11px] text-slate-300 block">Initial Bin JSON Template / প্রাথমিক বিন JSON টেমপ্লেট</span>
              <span className="text-[10px] text-slate-400 leading-normal block mt-0.5">
                Paste this exact template into your Bin editor when creating your JSONBin:
              </span>
              <span className="text-[10px] text-slate-500 leading-normal block italic">
                আপনার JSONBin তৈরি করার সময় আপনার বিন এডিটরে ঠিক এই টেমপ্লেটটি পেস্ট করুন:
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
