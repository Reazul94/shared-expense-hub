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
        <div className="p-6 max-h-[440px] overflow-y-auto text-sm text-slate-300 space-y-5 leading-relaxed scrollbar-thin">
          {isPrivacy ? (
            <>
              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>1. Data Storage & Privacy Options / ডেটা সংরক্ষণ এবং গোপনীয়তা অপশন</span>
                </p>
                <p className="text-slate-300 mb-1">
                  This application supports two distinct data storage modes to give you full control over your privacy:
                </p>
                <p className="text-slate-450 text-[11px] mb-2 italic">
                  আপনার গোপনীয়তার উপর সম্পূর্ণ নিয়ন্ত্রণ দিতে এই অ্যাপ্লিকেশনটি দুটি ভিন্ন ডেটা স্টোরেজ মোড সমর্থন করে:
                </p>
                <ul className="space-y-3 pl-3">
                  <li className="text-slate-300 border-l border-slate-800 pl-3">
                    <strong className="text-indigo-400 block mb-0.5">Local Storage (Offline):</strong>
                    <span>By default, all bazar lists, user logins, and roommate contributions are stored entirely client-side in your browser's local cache (<code>localStorage</code>). No data is transmitted to external servers.</span>
                    <span className="text-slate-450 text-[11px] block mt-1 italic"><strong className="text-indigo-400/80">লোকাল স্টোরেজ (অফলাইন):</strong> ডিফল্টভাবে, সকল বাজারের তালিকা, ব্যবহারকারীর লগইন এবং রুমমেটদের অবদানের ডেটা সম্পূর্ণরূপে আপনার ব্রাউজারের লোকাল ক্যাশে (localStorage) ক্লায়েন্ট-সাইডে সংরক্ষিত হয়। কোনো ডেটা বহিরাগত সার্ভারে পাঠানো হয় না।</span>
                  </li>
                  <li className="text-slate-300 border-l border-slate-800 pl-3">
                    <strong className="text-emerald-400 block mb-0.5">Cloud Sync Mode (External Database):</strong>
                    <span>If you configure external storage, your data is synced in real-time with your personal bin on JSONBin.io. Your credentials (API Key and Bin ID) are stored only in your local browser cache to enable direct API communication.</span>
                    <span className="text-slate-450 text-[11px] block mt-1 italic"><strong className="text-emerald-400/80">ক্লাউড সিঙ্ক মোড (বহিরাগত ডাটাবেস):</strong> আপনি যদি ক্লাউড স্টোরেজ সেটআপ করেন, তবে আপনার ডেটা রিয়েল-টাইমে JSONBin.io-তে আপনার ব্যক্তিগত বিনে সিঙ্ক হবে। সরাসরি এপিআই (API) যোগাযোগের জন্য আপনার ক্রেডেন্সিয়াল (API Key এবং Bin ID) শুধুমাত্র আপনার লোকাল ব্রাউজার ক্যাশে সংরক্ষিত থাকে।</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>2. Third-Party Integrations & Security / থার্ড-পার্টি ইন্টিগ্রেশন এবং নিরাপত্তা</span>
                </p>
                <p className="text-slate-300">
                  We do not track, collect, or store your JSONBin API credentials or personal expense data. All traffic to JSONBin.io is executed directly from your web browser using HTTPS encryption. Export operations (PDF and Excel generation) are executed completely in-memory inside your browser without contacting external APIs.
                </p>
                <p className="text-slate-450 text-[11px] mt-1.5 italic">
                  আমরা আপনার JSONBin API ক্রেডেন্সিয়াল বা ব্যক্তিগত খরচের ডেটা ট্র্যাক, সংগ্রহ বা সংরক্ষণ করি না। JSONBin.io-এর সমস্ত ট্রাফিক সরাসরি আপনার ওয়েব ব্রাউজার থেকে HTTPS এনক্রিপশন ব্যবহার করে সম্পাদিত হয়। এক্সপোর্ট অপারেশনগুলো (PDF এবং Excel জেনারেশন) কোনো বহিরাগত API-এর সাথে যোগাযোগ না করেই সম্পূর্ণভাবে আপনার ব্রাউজারের মেমোরিতে সম্পন্ন হয়।
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>3. Clear Cached Data / ক্যাশ ডেটা মুছে ফেলা</span>
                </p>
                <p className="text-slate-300">
                  Clearing your browser cache or site data will reset your offline logs and disconnect any active Cloud Sync configurations. Make sure to back up your data or keep cloud credentials safe before clearing cache.
                </p>
                <p className="text-slate-450 text-[11px] mt-1.5 italic">
                  আপনার ব্রাউজারের ক্যাশ বা সাইটের ডেটা মুছে ফেললে আপনার অফলাইন লগগুলো রিসেট হয়ে যাবে এবং যেকোনো सक्रिय ক্লাউড সিঙ্ক কনফিগারেশন ডিসকানেক্ট হয়ে যাবে। ক্যাশ মুছে ফেলার আগে আপনার ডেটা ব্যাকআপ বা ক্লাউড ক্রেডেন্সিয়ালগুলো সুরক্ষিত আছে কিনা তা নিশ্চিত করুন।
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>4. Transparency & Contact / স্বচ্ছতা এবং যোগাযোগ</span>
                </p>
                <p className="text-slate-300">
                  For questions, security concerns, or bug reports regarding this Expense Hub, please contact the developer (<strong className="text-indigo-455">Reazul</strong>) directly or submit an issue on the project's GitHub repository.
                </p>
                <p className="text-slate-455 text-[11px] mt-1.5 italic">
                  এই এক্সপেন্স হাব সম্পর্কে যেকোনো প্রশ্ন, নিরাপত্তা উদ্বেগ, বা বাগ রিপোর্টের জন্য সরাসরি ডেভেলপার (<strong className="text-indigo-400/80">রিয়াজুল</strong>) এর সাথে যোগাযোগ করুন অথবা প্রজেক্টের গিটহাব (GitHub) রিপোজিটরি-তে একটি ইস্যু সাবমিট করুন।
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>1. Agreement to Terms / শর্তাবলীর সাথে সম্মতি</span>
                </p>
                <p className="text-slate-300">
                  By using this Shared Expense Tracker, you agree to track house grocer expenses and settle balances according to these terms. This utility is provided solely for convenience and cooperative living organization.
                </p>
                <p className="text-slate-450 text-[11px] mt-1.5 italic">
                  এই শেয়ার্ড এক্সপেন্স ট্র্যাকারটি ব্যবহার করার মাধ্যমে, আপনি এই শর্তাবলী অনুযায়ী ঘরের বাজারের খরচ ট্র্যাক করতে এবং ব্যালেন্স নিষ্পত্তি করতে সম্মত হচ্ছেন। এই ইউটিলিটিটি শুধুমাত্র পারস্পরিক সুবিধা এবং সহযোগিতামূলক জীবনযাত্রা পরিচালনার জন্য প্রদান করা হয়েছে।
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>2. Split Calculations Ratio / হিসাব বন্টন অনুপাত</span>
                </p>
                <p className="text-slate-300">
                  Splits are calculated based on the fixed ratio configured for roommates <strong className="text-white">Reza</strong> (split weight: <strong className="text-indigo-400">58.33%</strong>) and <strong className="text-white">Reaz</strong> (split weight: <strong className="text-emerald-400">41.67%</strong>).
                </p>
                <p className="text-slate-450 text-[11px] mt-1.5 italic">
                  রুমমেট <strong className="text-slate-300 font-bold">রেজা</strong> (শেয়ার অনুপাত: <strong className="text-indigo-400/80">৫৮.৩৩%</strong>) এবং <strong className="text-slate-300 font-bold">রিয়াজ</strong> (শেয়ার অনুপাত: <strong className="text-emerald-400/80">৪১.৬৭%</strong>) এর জন্য কনফিগার করা নির্দিষ্ট অনুপাতের ভিত্তিতে খরচ হিসাব করা হয়।
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>3. Data Backups & Cloud Sync Responsibility / ডেটা ব্যাকআপ এবং ক্লাউড সিঙ্কের দায়িত্ব</span>
                </p>
                <p className="text-slate-300">
                  When using Local Storage, you risk data loss if you clear browser caches. When using Cloud Sync Mode, you are solely responsible for creating and securing your own JSONBin.io account, API keys, and database bins. We do not provide backup restoration services or database hosting.
                </p>
                <p className="text-slate-450 text-[11px] mt-1.5 italic">
                  লোকাল স্টোরেজ ব্যবহার করার সময়, আপনি যদি ব্রাউজারের ক্যাশ মুছে ফেলেন তবে ডেটা হারানোর ঝুঁকি থাকে। ক্লাউড সিঙ্ক মোড ব্যবহার করার সময়, আপনার নিজস্ব JSONBin.io অ্যাকাউন্ট, API কী এবং ডাটাবেস বিন তৈরি এবং সুরক্ষিত রাখার জন্য আপনি নিজেই সম্পূর্ণরূপে দায়ী। আমরা কোনো ডেটা ব্যাকআপ পুনরুদ্ধার বা ডাটাবেস হোস্টিং সেবা প্রদান করি না।
                </p>
              </div>

              <div>
                <p className="font-bold text-white mb-1.5 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>4. License & Attribution / লাইসেন্স এবং স্বীকৃতি</span>
                </p>
                <p className="text-slate-300">
                  This software is open source under the MIT License. The creator (<strong className="text-indigo-400">Reazul</strong>) and contributors provide this code "as is" without warranties of any kind.
                </p>
                <p className="text-slate-450 text-[11px] mt-1.5 italic">
                  এই সফটওয়্যারটি MIT লাইসেন্সের অধীনে ওপেন সোর্স। নির্মাতা (<strong className="text-indigo-400/80">রিয়াজুল</strong>) এবং অবদানকারীরা এই কোডটি কোনো ধরনের ওয়ারেন্টি ছাড়াই "যেভাবে আছে (as is)" সেভাবে প্রদান করছেন।
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
