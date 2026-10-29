import React from 'react';
import { Bookmark, ShieldCheck, Terminal, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulator' | 'generator' | 'guide';
  setActiveTab: (tab: 'simulator' | 'generator' | 'guide') => void;
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  onCopyBookmarklet: () => void;
  isCopied: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onCopyBookmarklet,
  isCopied,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0c1017]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Terminal className="h-5 w-5" />
          </div>
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
            Quotex Live Studio
          </span>
        </div>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`whitespace-nowrap transition-colors hover:text-white cursor-pointer ${
              activeTab === 'simulator' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            {lang === 'bn' ? 'লাইভ সিমুলেটর' : 'Interactive Terminal'}
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`whitespace-nowrap transition-colors hover:text-white cursor-pointer ${
              activeTab === 'generator' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            {lang === 'bn' ? 'বুকমার্কলেট কোড' : 'Bookmarklet Generator'}
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`whitespace-nowrap transition-colors hover:text-white cursor-pointer ${
              activeTab === 'guide' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            {lang === 'bn' ? 'ব্যবহার নির্দেশিকা' : 'How to Use'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
            title="Toggle Language / ভাষা পরিবর্তন করুন"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-mono">{lang === 'bn' ? 'ENG' : 'বাংলা'}</span>
          </button>

          <button
            onClick={onCopyBookmarklet}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:bg-emerald-400 active:scale-95 shadow-sm shadow-emerald-500/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isCopied ? (
              <>
                <ShieldCheck className="h-4 w-4" />
                <span>{lang === 'bn' ? 'কপি হয়েছে!' : 'Code Copied!'}</span>
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                <span>{lang === 'bn' ? 'বুকমার্ক কপি করুন' : 'Copy Bookmarklet'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
