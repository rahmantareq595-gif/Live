import React, { useState } from 'react';
import { CustomizerConfig } from '../types';
import {
  generateBookmarkletCode,
  generateUserscriptCode,
  generateReadableScript,
} from '../utils/bookmarkletGenerator';
import {
  Copy,
  Check,
  Bookmark,
  FileCode,
  MousePointer,
  HelpCircle,
  Smartphone,
  Laptop,
  CheckCircle2
} from 'lucide-react';

interface BookmarkletExportProps {
  config: CustomizerConfig;
  lang: 'bn' | 'en';
}

export const BookmarkletExport: React.FC<BookmarkletExportProps> = ({ config, lang }) => {
  const [copiedType, setCopiedType] = useState<'bookmarklet' | 'userscript' | 'raw' | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'bookmarklet' | 'userscript' | 'readable'>('bookmarklet');

  const bookmarkletUrl = generateBookmarkletCode(config);
  const userscriptCode = generateUserscriptCode(config);
  const readableScript = generateReadableScript(config);

  const copyToClipboard = async (text: string, type: 'bookmarklet' | 'userscript' | 'raw') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch (e) {
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Primary Drag & Drop Hub */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center shadow-lg shadow-emerald-500/5">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          {lang === 'bn' ? 'সবচেয়ে সহজ উপায় (১-সেকেন্ড ইন্সটল)' : 'Fastest 1-Click Install'}
        </span>
        <h3 className="mt-1 text-lg font-bold text-white">
          {lang === 'bn'
            ? 'এই বাটনটি টেনে আপনার ব্রাউজারের বুকমার্ক বারে ছেড়ে দিন'
            : 'Drag this button directly to your Bookmarks Bar'}
        </h3>
        <p className="mx-auto mt-1.5 max-w-lg text-xs text-slate-300">
          {lang === 'bn'
            ? 'পিসিতে কীবোর্ডে Ctrl + Shift + B চেপে বুকমার্ক বার অন করুন, তারপর নিচের সবুজ বাটনটি ড্র্যাগ করে ছেড়ে দিন।'
            : 'Press Ctrl+Shift+B (Cmd+Shift+B on Mac) to show your bookmarks bar, then drag the button below onto it.'}
        </p>

        {/* The Draggable Anchor */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={bookmarkletUrl}
            onClick={(e) => {
              // If clicked directly inside applet preview, explain or copy
              e.preventDefault();
              copyToClipboard(bookmarkletUrl, 'bookmarklet');
            }}
            draggable="true"
            className="inline-flex items-center gap-2.5 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:bg-emerald-400 active:scale-95 cursor-grab active:cursor-grabbing border border-emerald-400/50"
          >
            <Bookmark className="h-5 w-5 fill-slate-950" />
            <span>⭐ Quotex Live Pro</span>
            <MousePointer className="h-4 w-4 opacity-75" />
          </a>

          <button
            onClick={() => copyToClipboard(bookmarkletUrl, 'bookmarklet')}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-xs font-bold text-white transition-all hover:border-slate-600 hover:bg-slate-800 cursor-pointer"
          >
            {copiedType === 'bookmarklet' ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">
                  {lang === 'bn' ? 'বুকমার্কলেট কোড কপি হয়েছে!' : 'Bookmarklet Code Copied!'}
                </span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-slate-400" />
                <span>
                  {lang === 'bn' ? 'বুকমার্কলেট কোড কপি করুন' : 'Copy Bookmarklet Code'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Code Inspector & Alternative Formats */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveCodeTab('bookmarklet')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activeCodeTab === 'bookmarklet'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bookmarklet (One-Liner)
            </button>
            <button
              onClick={() => setActiveCodeTab('userscript')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activeCodeTab === 'userscript'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tampermonkey Userscript
            </button>
            <button
              onClick={() => setActiveCodeTab('readable')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activeCodeTab === 'readable'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Readable Engine JS
            </button>
          </div>

          <button
            onClick={() => {
              if (activeCodeTab === 'bookmarklet') copyToClipboard(bookmarkletUrl, 'bookmarklet');
              else if (activeCodeTab === 'userscript') copyToClipboard(userscriptCode, 'userscript');
              else copyToClipboard(readableScript, 'raw');
            }}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {copiedType ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>Copy Active Tab</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block Display */}
        <div className="relative">
          <pre className="max-h-64 overflow-x-auto overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-3.5 font-mono text-[11px] text-emerald-300 leading-relaxed">
            <code>
              {activeCodeTab === 'bookmarklet'
                ? bookmarkletUrl
                : activeCodeTab === 'userscript'
                ? userscriptCode
                : readableScript}
            </code>
          </pre>
        </div>
      </div>

      {/* 3. Step-by-Step Installation Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Desktop Browser Guide */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white border-b border-slate-800 pb-2">
            <Laptop className="h-4 w-4 text-emerald-400" />
            <span>
              {lang === 'bn' ? 'কম্পিউটার ব্রাউজারে ব্যবহার নিয়ম' : 'Desktop Browser Guide (PC/Mac)'}
            </span>
          </div>

          <ol className="space-y-2.5 text-xs text-slate-300 list-decimal list-inside">
            <li className="leading-relaxed">
              <strong className="text-white">বুকমার্ক বার চালু করুন:</strong> Chrome বা Edge এ{' '}
              <kbd className="rounded border border-slate-700 bg-slate-800 px-1 py-0.5 font-mono text-[10px]">
                Ctrl + Shift + B
              </kbd>{' '}
              চাপুন।
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">বুকমার্ক যোগ করুন:</strong> ওপরের সবুজ বাটনটি ড্র্যাগ করে বুকমার্কবারে ছেড়ে দিন, অথবা বুকমার্কবারে রাইট-ক্লিক করে <em>"Add Page"</em> সিলেক্ট করে URL এর ঘরে কোডটি পেস্ট করুন।
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">কোটেক্স ওপেন করুন:</strong> আপনার ব্রাউজারে{' '}
              <span className="font-mono text-emerald-400">qxbroker.com</span> এ যান।
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">রান করুন:</strong> বুকমার্ক বারের সেই বাটনটিতে ১টি ক্লিক করুন! সাথে সাথে ডেমো থেকে 🟢 Live হয়ে যাবে, ব্যালেন্স বদলে যাবে, /en/trade ইউআরএল আসবে, ব্যাকগ্রাউন্ড ওয়াটারমার্ক মুছে যাবে এবং লিডারবোর্ডে আপনার নাম চলে আসবে।
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">F2 শর্টকাট:</strong> কোটেক্সে থাকা অবস্থায় যেকোনো সময় কীবোর্ডের{' '}
              <kbd className="rounded border border-slate-700 bg-slate-800 px-1 py-0.5 font-mono text-[10px]">
                F2
              </kbd>{' '}
              চাপলে অন-স্ক্রিন HUD পপআপ আসবে যেখানে ব্যালেন্স ইচ্ছেমতো পরিবর্তন করতে পারবেন!
            </li>
          </ol>
        </div>

        {/* Mobile & Alternative Guide */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white border-b border-slate-800 pb-2">
            <Smartphone className="h-4 w-4 text-emerald-400" />
            <span>
              {lang === 'bn' ? 'মোবাইল ব্রাউজার ও কনসোল নিয়ম' : 'Mobile & Console Method'}
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <strong className="text-white block mb-1">
                {lang === 'bn' ? '১. মোবাইল ব্রাউজারে (Chrome / Kiwi Browser):' : '1. Mobile Browsers:'}
              </strong>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {lang === 'bn'
                  ? 'উপরে "বুকমার্কলেট কোড কপি করুন" এ চাপ দিয়ে কোড কপি করুন। মোবাইলে যেকোনো পেজ বুকমার্ক করে এডিট (Edit Bookmark) অপশনে যান এবং URL এর জায়গায় পুরো কোডটি পেস্ট করে সেভ করুন। এরপর কোটেক্স পেজে গিয়ে অ্যাড্রেসবারে বুকমার্কের নাম লিখে সার্চ করে ক্লিক করলেই একটিভ হবে।'
                  : 'Copy the bookmarklet code. Save any bookmark on mobile, edit its URL and paste the javascript code. On Quotex, type your bookmark title into the URL search bar to run it.'}
              </p>
            </div>

            <div>
              <strong className="text-white block mb-1">
                {lang === 'bn' ? '২. ব্রাউজার কনসোল মেথড (Console / F12):' : '2. Browser Console Method:'}
              </strong>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {lang === 'bn'
                  ? 'কোটেক্স পেজে থাকা অবস্থায় F12 বা রাইট-ক্লিক করে Inspect > Console ট্যাবে যান। "Readable Engine JS" এর পুরো কোডটি পেস্ট করে Enter প্রেস করুন।'
                  : 'On Quotex, press F12, open the Console tab, paste the "Readable Engine JS" code and press Enter.'}
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{lang === 'bn' ? '১০০% রিয়েল-টাইম লক' : 'Continuous DOM Lock'}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {lang === 'bn'
                  ? 'স্ক্রিপ্টে MutationObserver রয়েছে, যার ফলে কোটেক্সে পেয়ার বা টাইমফ্রেম পরিবর্তন করলেও লাইভ সবুজ লেখা কখনোই ডেমোতে ফিরে যাবে না।'
                  : 'Built-in MutationObserver guarantees the green live text never reverts back to demo when changing assets or expiry times.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
