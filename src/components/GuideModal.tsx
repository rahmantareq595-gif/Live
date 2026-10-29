import React from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Award,
  Globe,
  Sliders,
  DollarSign
} from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#0f141d] p-6 shadow-2xl text-slate-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'bn' ? 'কোটেক্স লাইভ কাস্টমাইজার গাইড' : 'Quotex Live Customizer User Guide'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'bn'
                  ? 'সবুজ লেখা, লাইভ ইমোজি, ইউআরএল ক্লোকার ও ওয়াটারমার্ক রিমুভাল'
                  : 'Complete walkthrough of features and deployment'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs leading-relaxed">
          {/* Feature 1: Demo to Live & Green text & Live emoji */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-1.5">
              <DollarSign className="h-4 w-4" />
              <span>
                {lang === 'bn' ? '১. ডেমো টু লাইভ সবুজ লেখা এবং লাইভ ইমোজি (🟢 Live)' : '1. Demo to Live Green Text & Live Emoji'}
              </span>
            </div>
            <p className="text-slate-300">
              {lang === 'bn'
                ? 'স্ক্রিপ্টটি রান হওয়ামাত্র কোটেক্সের টপ হেডারের "Demo Account" বা "ডেমো" লেখাটি পরিবর্তিত হয়ে "🟢 Live Account" হবে। টেক্সটের কালার হবে কোটেক্সের আসল উজ্জ্বল নিয়ন সবুজ (#00e676) এবং ব্যালেন্স আপনার পছন্দমতো (যেমন $14,850.50 বা ৳ 1,650,000) বসে যাবে।'
                : 'Instantly converts Quotex top header "Demo Account" text to "🟢 Live Account" with bright Quotex neon emerald styling (#00e676) and updates the balance to your configured amount.'}
            </p>
          </div>

          {/* Feature 2: URL Cloaker /en/trade */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-1.5">
              <Globe className="h-4 w-4" />
              <span>
                {lang === 'bn' ? '২. ইউআরএল রিপ্লেস /en/trade (URL Replace)' : '2. URL Cloaker to /en/trade'}
              </span>
            </div>
            <p className="text-slate-300">
              {lang === 'bn'
                ? 'ব্রাউজারের অ্যাড্রেস বারে ডেমো ট্রেডের লিংক (/demo-trade বা ?demo=1) লুকিয়ে ফেলে সরাসরি আসল লাইভ ট্রেডিং লিংক "https://qxbroker.com/en/trade" এবং ট্যাবের টাইটেল "Quotex - Online Trading Platform / Live" সেট করে দেয়।'
                : 'Replaces the browser address bar path with /en/trade and sets document tab title to official live trading without causing page reload.'}
            </p>
          </div>

          {/* Feature 3: Background Demo Watermark Remover */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>
                {lang === 'bn' ? '৩. ব্যাকগ্রাউন্ড ডেমো ওয়াটারমার্ক রিমুভার (Background Watermark Remove)' : '3. Background Demo Watermark Purger'}
              </span>
            </div>
            <p className="text-slate-300">
              {lang === 'bn'
                ? 'কোটেক্সের চার্টের পেছনে যে বড় "DEMO" বা "DEMO ACCOUNT" ঝাপসা জলছাপ থাকে, স্ক্রিপ্টটি HTML DOM ওয়াটারমার্ক এবং ক্যানভাস ড্রয়িং (Canvas2D fillText) উভয় জায়গা থেকেই সম্পূর্ণ নিষ্ক্রিয় করে একদম পরিষ্কার লাইভ চার্ট তৈরি করে।'
                : 'Hooks into both CSS layers and HTML5 Canvas2D rendering pipeline to intercept and eliminate the background "DEMO" watermark on trading charts.'}
            </p>
          </div>

          {/* Feature 4: Leaderboard Customizer */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-1.5">
              <Award className="h-4 w-4" />
              <span>
                {lang === 'bn' ? '৪. লিডারবোর্ড কাস্টমাইজেশন (Leaderboard Customize)' : '4. Top Traders Leaderboard Customizer'}
              </span>
            </div>
            <p className="text-slate-300">
              {lang === 'bn'
                ? 'কোটেক্সের লিডারবোর্ড বা টপ ট্রেডার লিস্ট ওপেন করলে আপনার নির্ধারিত নাম (যেমন Tareq Rahman), দেশের পতাকা (🇧🇩), র‍্যাংক (#1 বা #2), এবং আজকের প্রফিট (যেমন +$5,480.20) সবার শীর্ষে সুন্দরভাবে প্রদর্শিত হবে।'
                : 'Injects your custom nickname, flag, position (#1 or user specified), and daily profit into the Quotex Top Traders drawer.'}
            </p>
          </div>

          {/* Feature 5: F2 In-Page HUD */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-1.5">
              <Sliders className="h-4 w-4" />
              <span>
                {lang === 'bn' ? '৫. অন-স্ক্রিন F2 কন্ট্রোল HUD' : '5. On-Screen F2 Quick HUD'}
              </span>
            </div>
            <p className="text-slate-300">
              {lang === 'bn'
                ? 'কোটেক্সে ট্রেড করার সময় কীবোর্ডের F2 বাটন চাপলেই একটি সুন্দর ছোট কন্ট্রোল পপআপ আসবে। সেখান থেকে আপনি সাথে সাথে ব্যালেন্স ও লিডারবোর্ড প্রফিট বাড়িয়ে বা কমিয়ে Apply বাটনে চাপ দিয়ে পরিবর্তন করতে পারবেন।'
                : 'Press F2 at any time on Quotex to trigger the HUD overlay, update your displayed numbers, and apply immediately without reloading.'}
            </p>
          </div>

          {/* Educational notice */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-300/90 leading-relaxed">
              <strong className="text-amber-300 block mb-0.5">
                {lang === 'bn' ? 'সচেতনতা বার্তা ও শিক্ষামূলক তথ্য:' : 'Technical Architecture Notice:'}
              </strong>
              {lang === 'bn'
                ? 'এই বুকমার্কলেট স্ক্রিপ্টটি একটি ফ্রন্ট-এন্ড ক্লায়েন্ট-সাইড DOM কাস্টমাইজার। এটি ব্রাউজারের ডিসপ্লে পরিবর্তন করে কন্টেন্ট ক্রিয়েশন, ইউজার ইন্টারফেস টেস্টিং এবং ভিডিও রেকর্ডিংয়ের জন্য। এটি ব্রোকারের সার্ভার-সাইড আসল ফান্ড পরিবর্তন করে না।'
                : 'This script is a client-side visual DOM transformation tool built for UI testing, simulation, and visual content production. Visual scripts do not alter broker server-side balance or ledger.'}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end border-t border-slate-800 pt-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'ঠিক আছে, বুঝেছি' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};
