import React, { useState } from 'react';
import { CustomizerConfig } from './types';
import { Header } from './components/Header';
import { ConfigPanel } from './components/ConfigPanel';
import { QuotexSimulator } from './components/QuotexSimulator';
import { BookmarkletExport } from './components/BookmarkletExport';
import { GuideModal } from './components/GuideModal';
import { generateBookmarkletCode } from './utils/bookmarkletGenerator';
import {
  Sparkles,
  Bookmark,
  CheckCircle2,
  Terminal,
  Shield,
  Award,
  Globe,
  Sliders,
  Play
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [activeTab, setActiveTab] = useState<'simulator' | 'generator' | 'guide'>('simulator');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Configuration state with defaults matching user request:
  // "demo to live sobuj lekha and live emoji and url replace en trade and leaderboard customize and background demo remove give full complete bookmark"
  const [config, setConfig] = useState<CustomizerConfig>({
    balance: '$14,850.50',
    currency: '$',
    statusText: '🟢 Live Account',
    statusColor: '#00e676', // Quotex vivid green
    urlReplace: '/en/trade',
    tabTitle: 'Quotex - Online Trading Platform / Live',
    removeWatermark: true,
    interceptCanvas: true,
    continuousSync: true,
    enableHUD: true,
    leaderboard: {
      enabled: true,
      rank: 1,
      name: 'Tareq Rahman 🇧🇩',
      countryFlag: '🇧🇩',
      countryName: 'Bangladesh',
      profit: '+$5,480.20',
      winRate: '94%',
      tradesCount: 52,
    },
  });

  const handleCopyBookmarklet = async () => {
    try {
      const code = generateBookmarkletCode(config);
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {
      // clipboard error fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        onCopyBookmarklet={handleCopyBookmarklet}
        isCopied={isCopied}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        {/* Hero Section Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-[#0d121c] p-5 shadow-lg">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>
                {lang === 'bn'
                  ? 'কোটেক্স ডেমো টু লাইভ কাস্টমাইজার ও বুকমার্কলেট ইঞ্জিন'
                  : 'Quotex Demo to Live Customizer & Bookmarklet Engine'}
              </span>
            </div>
            <h1 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
              {lang === 'bn'
                ? 'সবুজ লেখা, লাইভ ইমোজি, /en/trade ইউআরএল ও ওয়াটারমার্ক রিমুভাল'
                : 'Live Green Text, 🟢 Emoji, /en/trade URL & Watermark Remover'}
            </h1>
            <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
              {lang === 'bn'
                ? 'নিচের সিমুলেটরে লাইভ পরিবর্তন দেখুন এবং সরাসরি আপনার ব্রাউজারের জন্য তৈরি করা পূর্ণাঙ্গ বুকমার্কলেট কোড এক ক্লিকে নিয়ে নিন।'
                : 'Customize your live balance, neon green styling, leaderboard rank, and watermark removal with real-time DOM continuous locking.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'border border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'সিমুলেটর টার্মিনাল' : 'Terminal View'}
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'border border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'কোড ও সেটিংস' : 'Settings & Code'}
            </button>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'নির্দেশিকা' : 'Guide'}
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Simulator Terminal View */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* The Real Quotex Interactive Terminal */}
            <QuotexSimulator config={config} lang={lang} />

            {/* Quick Controls & Bookmarklet Callout under Terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Settings Bar */}
              <div className="lg:col-span-2">
                <ConfigPanel config={config} onChange={setConfig} lang={lang} />
              </div>

              {/* Side Fast Export Box */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Bookmark className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">
                      {lang === 'bn' ? 'বুকমার্কলেট সংগ্রহ করুন' : 'Export Bookmarklet'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'bn'
                      ? 'কোটেক্সে এই স্ক্রিপ্ট চালানোর জন্য নিচের বাটনটি ড্র্যাগ করে ব্রাউজার বুকমার্ক বারে ছেড়ে দিন, অথবা কোড কপি করুন।'
                      : 'Drag this button to your bookmarks bar, then click it on Quotex to instantly transform the page!'}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <a
                      href={generateBookmarkletCode(config)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopyBookmarklet();
                      }}
                      draggable="true"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 cursor-grab active:cursor-grabbing"
                    >
                      <Bookmark className="h-4 w-4 fill-current" />
                      <span>⭐ Quotex Live Pro</span>
                    </a>

                    <button
                      onClick={handleCopyBookmarklet}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-400">
                            {lang === 'bn' ? 'কোড কপি সম্পন্ন!' : 'Code Copied!'}
                          </span>
                        </>
                      ) : (
                        <span>
                          {lang === 'bn' ? '১-ক্লিকে কোড কপি' : '1-Click Copy Code'}
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="border-t border-slate-800 pt-3 text-[11px] text-slate-400 space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-300 font-medium">
                      <Shield className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{lang === 'bn' ? 'ফিচার সামারি:' : 'Active Features:'}</span>
                    </div>
                    <div>✔ 🟢 {config.statusText} (সবুজ লেখা)</div>
                    <div>✔ ব্যালেন্স: {config.balance}</div>
                    <div>✔ ইউআরএল: {config.urlReplace}</div>
                    <div>✔ ব্যাকগ্রাউন্ড DEMO ওয়াটারমার্ক রিমুভড</div>
                    <div>✔ লিডারবোর্ড র‍্যাংক #{config.leaderboard.rank} ({config.leaderboard.name})</div>
                    <div>✔ কীবোর্ড শর্টকাট: F2 অন-স্ক্রিন HUD</div>
                  </div>
                </div>

                {/* Guide button box */}
                <div className="rounded-xl border border-slate-800 bg-[#0c1017] p-4 text-center">
                  <span className="text-xs text-slate-400 block mb-2">
                    {lang === 'bn' ? 'কোটেক্সে কিভাবে লাগাবেন তা বুঝতে সমস্যা?' : 'Need step-by-step instructions?'}
                  </span>
                  <button
                    onClick={() => setIsGuideOpen(true)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2 text-xs font-semibold text-emerald-400 hover:bg-slate-800 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? '📖 সম্পূর্ণ ব্যবহার নির্দেশিকা দেখুন' : '📖 View Detailed Guide'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Bookmarklet Generator & Full Code Inspector */}
        {activeTab === 'generator' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ConfigPanel config={config} onChange={setConfig} lang={lang} />
              <BookmarkletExport config={config} lang={lang} />
            </div>
          </div>
        )}

        {/* Tab 3: Detailed Installation & Technical Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <BookmarkletExport config={config} lang={lang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-[#07090e] py-6 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">Quotex Live Visual Studio</span>
            <span className="text-slate-500 font-mono">v2.5</span>
          </div>

          <div className="text-slate-400 text-[11px]">
            {lang === 'bn'
              ? 'ক্লায়েন্ট-সাইড DOM কাস্টমাইজার ও সিমুলেশন টুল · বাংলা ও ইংরেজি সাপোর্ট'
              : 'Client-side visual DOM customizer & simulation environment'}
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'নির্দেশিকা' : 'Guide'}
            </button>
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>
          </div>
        </div>
      </footer>

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        lang={lang}
      />
    </div>
  );
}
