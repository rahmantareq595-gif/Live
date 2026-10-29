import React from 'react';
import { CustomizerConfig, PresetProfile } from '../types';
import { TRADER_PRESETS } from '../utils/presets';
import { Sliders, DollarSign, Globe, Award, Sparkles, Shield, EyeOff } from 'lucide-react';

interface ConfigPanelProps {
  config: CustomizerConfig;
  onChange: (newConfig: CustomizerConfig) => void;
  lang: 'bn' | 'en';
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange, lang }) => {
  const applyPreset = (preset: PresetProfile) => {
    onChange({
      ...config,
      balance: preset.balance,
      currency: preset.currency,
      leaderboard: {
        ...config.leaderboard,
        rank: preset.rank,
        name: preset.traderName,
        countryFlag: preset.countryFlag,
        countryName: preset.countryName,
        profit: preset.profit,
        winRate: preset.winRate,
      },
    });
  };

  const statusOptions = [
    '🟢 Live Account',
    '🟢 Live',
    'Real Account 🟢',
    '🟢 Real Account',
  ];

  const flagOptions = [
    { flag: '🇧🇩', name: 'Bangladesh' },
    { flag: '🇮🇳', name: 'India' },
    { flag: '🇦🇪', name: 'UAE' },
    { flag: '🇵🇰', name: 'Pakistan' },
    { flag: '🇺🇸', name: 'USA' },
    { flag: '🇬🇧', name: 'UK' },
    { flag: '🇧🇷', name: 'Brazil' },
    { flag: '🇲🇾', name: 'Malaysia' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Presets Bar */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {lang === 'bn' ? '১-ক্লিক প্রোফাইল প্রিসেট' : 'Quick Profile Presets'}
          </label>
          <span className="text-xs text-slate-500 font-mono">5 Presets</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TRADER_PRESETS.map((p) => {
            const isActive = config.balance === p.balance && config.leaderboard.name === p.traderName;
            return (
              <button
                key={p.id}
                onClick={() => applyPreset(p)}
                className={`flex flex-col items-start rounded-lg border p-2.5 text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs font-semibold truncate">{p.name}</span>
                  <span className="text-sm">{p.countryFlag}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1 text-[11px] font-mono text-emerald-400">
                  <span className="font-bold">{p.balance}</span>
                  <span className="text-slate-400">· #{p.rank}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Live Account & Balance Settings */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-sm font-semibold text-white">
          <DollarSign className="h-4 w-4 text-emerald-400" />
          <span>{lang === 'bn' ? 'লাইভ একাউন্ট ও ব্যালেন্স কনফিগারেশন' : 'Live Account & Balance'}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              {lang === 'bn' ? 'লাইভ ব্যালেন্স পরিমাণ (Live Balance)' : 'Live Balance Amount'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={config.balance}
                onChange={(e) => onChange({ ...config, balance: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                placeholder="$14,850.50"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              {lang === 'bn' ? 'ডেমো $10,000 এর স্থানে এই ব্যালেন্স দেখাবে' : 'Replaces the default Demo $10,000 in header'}
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              {lang === 'bn' ? 'কারেন্সি ও প্রতীক' : 'Currency Symbol'}
            </label>
            <div className="flex gap-1.5">
              {['$', '৳', '₹', '€', '£'].map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => onChange({ ...config, currency: curr })}
                  className={`flex h-9 flex-1 items-center justify-center rounded-lg border text-sm font-mono font-bold transition-colors cursor-pointer ${
                    config.currency === curr
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">
            {lang === 'bn' ? 'লাইভ টেক্সট ও ইমোজি ফরম্যাট' : 'Live Text & Emoji Format'}
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {statusOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ ...config, statusText: opt })}
                className={`rounded-lg border px-2.5 py-2 text-xs font-semibold transition-all cursor-pointer truncate ${
                  config.statusText === opt
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-sm'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400">
            {lang === 'bn' ? 'লেখা সবুজ রঙ (Quotex Vivid Green):' : 'Status Glow Color:'}
          </span>
          <div className="flex items-center gap-2">
            {[
              { label: 'Quotex Vivid', code: '#00e676' },
              { label: 'Emerald', code: '#10b981' },
              { label: 'Neon Mint', code: '#34d399' },
            ].map((col) => (
              <button
                key={col.code}
                type="button"
                onClick={() => onChange({ ...config, statusColor: col.code })}
                className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-mono transition-all cursor-pointer ${
                  config.statusColor === col.code
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: col.code }} />
                <span>{col.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. URL Cloaker & Watermark Remover */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* URL Cloaker */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5 text-sm font-semibold text-white">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span>{lang === 'bn' ? 'ইউআরএল ক্লোকার (/en/trade)' : 'URL & Tab Cloaker'}</span>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              {lang === 'bn' ? 'টার্গেট ব্রাউজার ইউআরএল' : 'Target URL Rewrite'}
            </label>
            <input
              type="text"
              value={config.urlReplace}
              onChange={(e) => onChange({ ...config, urlReplace: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-mono text-slate-200 focus:border-emerald-500 focus:outline-none"
              placeholder="/en/trade"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              {lang === 'bn'
                ? 'ব্রাউজারের অ্যাড্রেস বার পরিবর্তন করে /en/trade করবে'
                : 'Cloaks browser address bar to live /en/trade'}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              {lang === 'bn' ? 'ব্রাউজার ট্যাব টাইটেল' : 'Browser Document Title'}
            </label>
            <input
              type="text"
              value={config.tabTitle}
              onChange={(e) => onChange({ ...config, tabTitle: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Watermark Remover */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5 text-sm font-semibold text-white">
            <EyeOff className="h-4 w-4 text-emerald-400" />
            <span>{lang === 'bn' ? 'ব্যাকগ্রাউন্ড ডেমো রিমুভার' : 'Watermark & Canvas Cleaner'}</span>
          </div>

          <label className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-2.5 cursor-pointer hover:border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={config.removeWatermark}
              onChange={(e) => onChange({ ...config, removeWatermark: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-slate-700 accent-emerald-500"
            />
            <div>
              <span className="text-xs font-semibold text-slate-200 block">
                {lang === 'bn' ? 'চার্টের পেছনের "DEMO" লেখা সম্পূর্ণ মুছে ফেলুন' : 'Purge "DEMO" Chart Watermark'}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {lang === 'bn'
                  ? 'DOM এবং ওয়াটারমার্ক লেয়ার সম্পূর্ণ হাইড করে দেয়'
                  : 'Hides all DOM and SVG watermark overlays on chart'}
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-2.5 cursor-pointer hover:border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={config.interceptCanvas}
              onChange={(e) => onChange({ ...config, interceptCanvas: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-slate-700 accent-emerald-500"
            />
            <div>
              <span className="text-xs font-semibold text-slate-200 block">
                {lang === 'bn' ? 'ক্যানভাস টেক্সট ইন্টারসেপ্টর (Canvas Intercept)' : 'Canvas 2D Text Hook'}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {lang === 'bn'
                  ? 'ক্যানভাসে DEMO টেক্সট ড্র করা ব্লক করে'
                  : 'Blocks Canvas2D from rendering demo text stamps'}
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* 3. Leaderboard Customizer */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Award className="h-4 w-4 text-emerald-400" />
            <span>{lang === 'bn' ? 'লিডারবোর্ড কাস্টমাইজেশন (Leaderboard Top Traders)' : 'Leaderboard Customizer'}</span>
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={config.leaderboard.enabled}
              onChange={(e) =>
                onChange({
                  ...config,
                  leaderboard: { ...config.leaderboard, enabled: e.target.checked },
                })
              }
              className="h-3.5 w-3.5 rounded border-slate-700 accent-emerald-500"
            />
            <span className="font-medium">{lang === 'bn' ? 'এনাবল করুন' : 'Enable'}</span>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              {lang === 'bn' ? 'কাঙ্ক্ষিত র‍্যাংক (Rank Position)' : 'Leaderboard Rank'}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-emerald-400 font-bold">#</span>
              <input
                type="number"
                min="1"
                max="100"
                value={config.leaderboard.rank}
                onChange={(e) =>
                  onChange({
                    ...config,
                    leaderboard: {
                      ...config.leaderboard,
                      rank: Math.max(1, parseInt(e.target.value) || 1),
                    },
                  })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-mono font-bold text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              {lang === 'bn' ? 'ট্রেডার নাম (Trader Name)' : 'Trader Nickname'}
            </label>
            <input
              type="text"
              value={config.leaderboard.name}
              onChange={(e) =>
                onChange({
                  ...config,
                  leaderboard: { ...config.leaderboard, name: e.target.value },
                })
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
              placeholder="Tareq Rahman"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              {lang === 'bn' ? 'আজকের প্রফিট (Today Profit)' : 'Daily Profit'}
            </label>
            <input
              type="text"
              value={config.leaderboard.profit}
              onChange={(e) =>
                onChange({
                  ...config,
                  leaderboard: { ...config.leaderboard, profit: e.target.value },
                })
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
              placeholder="+$5,480.20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">
            {lang === 'bn' ? 'দেশের পতাকা (Country Flag)' : 'Country Flag'}
          </label>
          <div className="flex flex-wrap gap-2">
            {flagOptions.map((f) => (
              <button
                key={f.name}
                type="button"
                onClick={() =>
                  onChange({
                    ...config,
                    leaderboard: {
                      ...config.leaderboard,
                      countryFlag: f.flag,
                      countryName: f.name,
                    },
                  })
                }
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                  config.leaderboard.countryFlag === f.flag
                    ? 'border-emerald-500 bg-emerald-500/15 text-white font-medium'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-sm">{f.flag}</span>
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Advanced: Observer & In-Page HUD */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-emerald-400 shrink-0" />
          <div>
            <div className="text-xs font-semibold text-white">
              {lang === 'bn' ? 'ইন-পেইজ কুইক কন্ট্রোল প্যানেল (F2 HUD)' : 'In-Page HUD & Hotkey (F2)'}
            </div>
            <div className="text-[11px] text-slate-400">
              {lang === 'bn'
                ? 'কোটেক্সে ট্রেড করার সময় F2 প্রেস করে সরাসরি ব্যালেন্স ও প্রফিট বদলানো যাবে'
                : 'Press F2 on Quotex anytime to quickly adjust balance & leaderboard on the fly'}
            </div>
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-300 shrink-0 cursor-pointer">
          <input
            type="checkbox"
            checked={config.enableHUD}
            onChange={(e) => onChange({ ...config, enableHUD: e.target.checked })}
            className="h-4 w-4 rounded border-slate-700 accent-emerald-500"
          />
          <span>{lang === 'bn' ? 'HUD এনাবল' : 'Enable HUD'}</span>
        </label>
      </div>
    </div>
  );
};
