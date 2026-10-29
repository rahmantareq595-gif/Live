import React, { useState, useEffect, useRef } from 'react';
import { CustomizerConfig, CandleData, LeaderboardTrader } from '../types';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Award,
  ChevronDown,
  Plus,
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  X,
  Sliders,
  History,
  BarChart2
} from 'lucide-react';

interface QuotexSimulatorProps {
  config: CustomizerConfig;
  lang: 'bn' | 'en';
}

export const QuotexSimulator: React.FC<QuotexSimulatorProps> = ({ config, lang }) => {
  // Whether script is simulated as active
  const [isScriptActive, setIsScriptActive] = useState<boolean>(true);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'trade' | 'leaderboard' | 'history'>('trade');
  const [showHUD, setShowHUD] = useState<boolean>(false);
  const [hudBalance, setHudBalance] = useState<string>(config.balance);
  const [hudProfit, setHudProfit] = useState<string>(config.leaderboard.profit);

  // Trading simulation states
  const [investment, setInvestment] = useState<number>(100);
  const [activeTrade, setActiveTrade] = useState<{
    direction: 'up' | 'down';
    entryPrice: number;
    amount: number;
    secondsLeft: number;
  } | null>(null);
  const [tradeToast, setTradeToast] = useState<{ message: string; profit: number } | null>(null);

  // Dynamic candle prices
  const [candles, setCandles] = useState<CandleData[]>(() => {
    const list: CandleData[] = [];
    let price = 1.0845;
    const now = Date.now();
    for (let i = 35; i >= 0; i--) {
      const open = price;
      const delta = (Math.random() - 0.49) * 0.0006;
      const close = Number((open + delta).toFixed(5));
      const high = Number((Math.max(open, close) + Math.random() * 0.0003).toFixed(5));
      const low = Number((Math.min(open, close) - Math.random() * 0.0003).toFixed(5));
      list.push({
        time: now - i * 5000,
        open,
        high,
        low,
        close,
      });
      price = close;
    }
    return list;
  });

  const [currentPrice, setCurrentPrice] = useState<number>(1.0845);

  // Sync HUD state when config changes
  useEffect(() => {
    setHudBalance(config.balance);
    setHudProfit(config.leaderboard.profit);
  }, [config.balance, config.leaderboard.profit]);

  // Real-time ticking candle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles((prev) => {
        if (prev.length === 0) return prev;
        const last = { ...prev[prev.length - 1] };
        const tick = (Math.random() - 0.49) * 0.00015;
        const newClose = Number((last.close + tick).toFixed(5));
        last.close = newClose;
        last.high = Math.max(last.high, newClose);
        last.low = Math.min(last.low, newClose);
        setCurrentPrice(newClose);

        return [...prev.slice(0, -1), last];
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Periodic new candle spawn
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const newOpen = last.close;
        const newCandle: CandleData = {
          time: Date.now(),
          open: newOpen,
          high: newOpen,
          low: newOpen,
          close: newOpen,
        };
        return [...prev.slice(1), newCandle];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Trade timer simulation
  useEffect(() => {
    if (!activeTrade) return;

    if (activeTrade.secondsLeft <= 0) {
      // Settle trade
      const isWin =
        activeTrade.direction === 'up'
          ? currentPrice >= activeTrade.entryPrice
          : currentPrice <= activeTrade.entryPrice;

      const payout = isWin ? Math.round(activeTrade.amount * 1.87) : 0;
      const profit = isWin ? Math.round(activeTrade.amount * 0.87) : -activeTrade.amount;

      setTradeToast({
        message: isWin ? 'Trade Won! 🎉' : 'Trade Closed',
        profit,
      });

      setActiveTrade(null);
      setTimeout(() => setTradeToast(null), 3500);
      return;
    }

    const timer = setTimeout(() => {
      setActiveTrade((prev) => (prev ? { ...prev, secondsLeft: prev.secondsLeft - 1 } : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeTrade, currentPrice]);

  const handlePlaceTrade = (dir: 'up' | 'down') => {
    if (activeTrade) return;
    setActiveTrade({
      direction: dir,
      entryPrice: currentPrice,
      amount: investment,
      secondsLeft: 5,
    });
  };

  // Keyboard shortcut listener for F2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        setShowHUD((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Default leaderboard users
  const defaultLeaderboard: LeaderboardTrader[] = [
    { rank: 1, name: 'Alexandru K.', countryFlag: '🇷🇴', countryCode: 'RO', profit: 7420, winRate: 91, trades: 44 },
    { rank: 2, name: 'Vikram S.', countryFlag: '🇮🇳', countryCode: 'IN', profit: 6180, winRate: 88, trades: 38 },
    { rank: 3, name: 'Matheus B.', countryFlag: '🇧🇷', countryCode: 'BR', profit: 5410, winRate: 86, trades: 32 },
    { rank: 4, name: 'Tariq Al-Mansoor', countryFlag: '🇦🇪', countryCode: 'AE', profit: 4890, winRate: 84, trades: 29 },
    { rank: 5, name: 'Hasan M.', countryFlag: '🇹🇷', countryCode: 'TR', profit: 3950, winRate: 82, trades: 26 },
  ];

  // Dynamic leaderboard with customization injected if active
  const computedLeaderboard = React.useMemo(() => {
    if (!isScriptActive || !config.leaderboard.enabled) {
      return defaultLeaderboard;
    }

    const customUser: LeaderboardTrader = {
      rank: config.leaderboard.rank,
      name: config.leaderboard.name,
      countryFlag: config.leaderboard.countryFlag,
      countryCode: 'BD',
      profit: parseFloat(config.leaderboard.profit.replace(/[^0-9.]/g, '')) || 5480,
      winRate: parseInt(config.leaderboard.winRate) || 94,
      trades: config.leaderboard.tradesCount || 52,
      isCurrentUser: true,
    };

    const targetRank = Math.min(Math.max(1, config.leaderboard.rank), 5);
    const list = [...defaultLeaderboard];
    list.splice(targetRank - 1, 0, customUser);
    return list.slice(0, 5).map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [isScriptActive, config.leaderboard]);

  // Chart coordinate calculations
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = Math.max(maxPrice - minPrice, 0.001);

  const getSvgY = (price: number) => {
    return 260 - ((price - minPrice) / priceRange) * 200;
  };

  return (
    <div className="relative flex flex-col rounded-2xl border border-slate-800 bg-[#0c1017] shadow-2xl overflow-hidden">
      {/* Top Simulated Browser Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#090d13] px-4 py-2 text-xs">
        {/* Left: Simulated URL address bar */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950 px-3 py-1 text-slate-300 font-mono text-[11px]">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span className="text-slate-500">https://qxbroker.com</span>
            <span className={isScriptActive ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
              {isScriptActive ? config.urlReplace : '/demo-trade'}
            </span>
          </div>
        </div>

        {/* Center: Live / Demo Interactive State Toggle Switch */}
        <div className="flex items-center gap-2 my-1">
          <span className="text-[11px] text-slate-400 font-medium">
            {lang === 'bn' ? 'সিমুলেটর মোড:' : 'Visual State:'}
          </span>
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-0.5">
            <button
              onClick={() => setIsScriptActive(false)}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                !isScriptActive
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Default Demo
            </button>
            <button
              onClick={() => setIsScriptActive(true)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                isScriptActive
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🟢 Live Bookmark Active</span>
            </button>
          </div>
        </div>

        {/* Right: Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsScriptActive(true);
              setTradeToast({
                message: lang === 'bn' ? 'বুকমার্কলেট স্ক্রিপ্ট সাকসেসফুল রান হয়েছে!' : 'Bookmarklet script executed!',
                profit: 0,
              });
              setTimeout(() => setTradeToast(null), 2500);
            }}
            className="flex items-center gap-1.5 rounded border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>{lang === 'bn' ? 'রান স্ক্রিপ্ট টেস্ট' : 'Run Script'}</span>
          </button>
          <button
            onClick={() => setIsScriptActive(false)}
            title="Reset to default demo"
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Quotex Main Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#121721] px-4 py-2.5">
        {/* Brand & Asset selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500 font-bold text-slate-950 text-xs">
              QX
            </div>
            <span className="hidden sm:inline font-bold tracking-tight text-white text-sm">
              QUOTEX
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900/90 px-3 py-1.5 hover:border-slate-600 cursor-pointer">
            <span className="text-xs font-bold text-white">EUR / USD (OTC)</span>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[11px] font-bold text-emerald-400 font-mono">
              +87%
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Account Balance Area (Demo vs Live Conversion Zone) */}
        <div className="flex items-center gap-3">
          {/* THE ACCOUNT PILL - This is the primary target of user request! */}
          <div
            className={`flex items-center gap-3 rounded-lg border px-3 py-1.5 transition-all duration-300 ${
              isScriptActive
                ? 'border-emerald-500/40 bg-emerald-500/10 shadow-sm shadow-emerald-500/10'
                : 'border-amber-500/40 bg-amber-500/10'
            }`}
          >
            <div className="flex flex-col text-right">
              {/* Status Text (Sobuj lekha + live emoji) */}
              <div className="flex items-center justify-end gap-1.5">
                {isScriptActive ? (
                  <span
                    className="text-xs font-bold tracking-wide transition-colors"
                    style={{
                      color: config.statusColor,
                      textShadow: '0 0 10px rgba(0,230,118,0.5)',
                    }}
                  >
                    {config.statusText}
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-400">
                    Demo Account
                  </span>
                )}
              </div>

              {/* Balance Amount */}
              <div className="text-sm font-mono font-bold tracking-tight text-white">
                {isScriptActive ? hudBalance : '$10,000.00'}
              </div>
            </div>

            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Deposit Button */}
          <button className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5 stroke-[3]" />
            <span className="hidden sm:inline">Deposit</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Body */}
      <div className="relative flex flex-1 h-[440px] sm:h-[480px]">
        {/* Left Vertical Quotex Sidebar */}
        <div className="flex w-12 flex-col items-center justify-between border-r border-slate-800 bg-[#0e131b] py-3 text-slate-400">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveSidebarTab('trade')}
              title="Trade Charts"
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                activeSidebarTab === 'trade'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart2 className="h-4 w-4" />
            </button>

            <button
              onClick={() => setActiveSidebarTab('leaderboard')}
              title="Leaderboard (Top Traders)"
              className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                activeSidebarTab === 'leaderboard'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Award className="h-4 w-4" />
              {isScriptActive && config.leaderboard.enabled && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSidebarTab('history')}
              title="Trade History"
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                activeSidebarTab === 'history'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <History className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setShowHUD(!showHUD)}
            title="Toggle Quotex In-Page HUD [F2]"
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
              showHUD ? 'bg-emerald-500 text-slate-950 font-bold' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Sliders className="h-4 w-4" />
          </button>
        </div>

        {/* Center: Interactive Candlestick Chart Area */}
        <div className="relative flex-1 bg-[#090d13] overflow-hidden select-none">
          {/* BACKGROUND DEMO WATERMARK (Only visible when isScriptActive is false OR watermark purge is disabled) */}
          {!isScriptActive || !config.removeWatermark ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0">
              <div
                className="transform -rotate-12 select-none font-extrabold uppercase tracking-widest text-slate-600/[0.08] sm:text-slate-600/[0.12]"
                style={{
                  fontSize: 'clamp(3rem, 14vw, 9rem)',
                  lineHeight: '0.9',
                  whiteSpace: 'nowrap',
                }}
              >
                DEMO ACCOUNT
              </div>
            </div>
          ) : (
            // Noticeable indicator that watermark was wiped out
            <div className="pointer-events-none absolute bottom-3 left-4 z-10 text-[10px] text-emerald-500/40 font-mono">
              [Watermark Purged: Clean Canvas View]
            </div>
          )}

          {/* SVG Candlestick Rendering */}
          <svg className="absolute inset-0 h-full w-full">
            {/* Grid lines */}
            {[60, 120, 180, 240, 300, 360].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100%"
                y2={y}
                stroke="#1b2332"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Candlesticks */}
            {candles.map((candle, idx) => {
              const x = 30 + idx * 16;
              const openY = getSvgY(candle.open);
              const closeY = getSvgY(candle.close);
              const highY = getSvgY(candle.high);
              const lowY = getSvgY(candle.low);
              const isGreen = candle.close >= candle.open;
              const candleColor = isGreen ? '#00e676' : '#ff3b30';

              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(Math.abs(closeY - openY), 2);

              return (
                <g key={candle.time + idx}>
                  {/* High/Low wick line */}
                  <line
                    x1={x}
                    y1={highY}
                    x2={x}
                    y2={lowY}
                    stroke={candleColor}
                    strokeWidth="1.5"
                  />
                  {/* Candle Body */}
                  <rect
                    x={x - 4}
                    y={bodyTop}
                    width="8"
                    height={bodyHeight}
                    fill={candleColor}
                    rx="1"
                  />
                </g>
              );
            })}

            {/* Current Price Line */}
            {candles.length > 0 && (
              <g>
                <line
                  x1="0"
                  y1={getSvgY(currentPrice)}
                  x2="100%"
                  y2={getSvgY(currentPrice)}
                  stroke="#00e676"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </g>
            )}
          </svg>

          {/* Active Trade Marker Line on Chart */}
          {activeTrade && (
            <div
              className="absolute left-0 right-0 flex items-center justify-between border-t border-dashed px-4 z-20"
              style={{
                top: `${getSvgY(activeTrade.entryPrice)}px`,
                borderColor: activeTrade.direction === 'up' ? '#00e676' : '#ff3b30',
              }}
            >
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  activeTrade.direction === 'up' ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
                }`}
              >
                {activeTrade.direction.toUpperCase()} ${activeTrade.amount}
              </span>
              <span className="text-[11px] font-mono font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                ⏱ {activeTrade.secondsLeft}s
              </span>
            </div>
          )}

          {/* Current Live Price Badge (Right aligned) */}
          <div
            className="absolute right-2 transform -translate-y-1/2 rounded bg-emerald-500 px-2 py-1 text-xs font-mono font-bold text-slate-950 shadow-md z-20"
            style={{ top: `${getSvgY(currentPrice)}px` }}
          >
            {currentPrice.toFixed(5)}
          </div>

          {/* Toast Notification overlay */}
          {tradeToast && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-slate-950/95 px-4 py-2.5 shadow-2xl text-xs text-white">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{tradeToast.message}</span>
              {tradeToast.profit !== 0 && (
                <span
                  className={`font-mono font-bold ${
                    tradeToast.profit > 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {tradeToast.profit > 0 ? `+${config.currency}${tradeToast.profit}` : `-${config.currency}${Math.abs(tradeToast.profit)}`}
                </span>
              )}
            </div>
          )}

          {/* Side Drawer: Leaderboard (Top Traders) */}
          {activeSidebarTab === 'leaderboard' && (
            <div className="absolute inset-y-0 left-0 w-72 sm:w-80 bg-[#121722]/95 backdrop-blur-md border-r border-slate-800 z-30 p-4 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {lang === 'bn' ? 'শীর্ষ ট্রেডার তালিকা' : 'Top Traders (Leaderboard)'}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveSidebarTab('trade')}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                  {computedLeaderboard.map((item) => (
                    <div
                      key={item.rank + item.name}
                      className={`flex items-center justify-between rounded-lg p-2.5 transition-all ${
                        item.isCurrentUser
                          ? 'border border-emerald-500 bg-emerald-500/15 shadow-sm'
                          : 'border border-slate-800/80 bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-mono font-bold ${
                            item.rank === 1
                              ? 'bg-amber-400 text-slate-950'
                              : item.rank === 2
                              ? 'bg-slate-300 text-slate-950'
                              : item.rank === 3
                              ? 'bg-amber-700 text-white'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {item.rank}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                            <span>{item.countryFlag}</span>
                            <span className="truncate max-w-[110px]">{item.name}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {item.trades} trades · {item.winRate}% win
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-emerald-400">
                          +{config.currency}{item.profit.toLocaleString()}
                        </div>
                        {item.isCurrentUser && (
                          <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider">
                            YOU
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom user position footer */}
              {isScriptActive && config.leaderboard.enabled && (
                <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-2.5 text-center">
                  <div className="text-[11px] text-slate-300">
                    {lang === 'bn' ? 'আপনার বর্তমান অবস্থান:' : 'Your Ranking:'}
                  </div>
                  <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                    #{config.leaderboard.rank} · {config.leaderboard.profit}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* In-Terminal Floating HUD (press F2 or button) */}
          {showHUD && (
            <div className="absolute bottom-4 right-4 z-40 w-72 rounded-xl border border-slate-700 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Quotex In-Page HUD [F2]</span>
                </div>
                <button
                  onClick={() => setShowHUD(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1">
                    Live Balance
                  </label>
                  <input
                    type="text"
                    value={hudBalance}
                    onChange={(e) => setHudBalance(e.target.value)}
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs font-mono font-bold text-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1">
                    Leaderboard Profit
                  </label>
                  <input
                    type="text"
                    value={hudProfit}
                    onChange={(e) => setHudProfit(e.target.value)}
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs font-mono font-bold text-emerald-400"
                  />
                </div>

                <button
                  onClick={() => {
                    setShowHUD(false);
                    setTradeToast({
                      message: 'HUD Updates Applied Live!',
                      profit: 0,
                    });
                    setTimeout(() => setTradeToast(null), 2000);
                  }}
                  className="w-full rounded bg-emerald-500 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  Apply Live
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Trade Controls Sidebar (Quotex UP / DOWN Order Panel) */}
        <div className="w-52 sm:w-60 border-l border-slate-800 bg-[#121721] p-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Time / Expiry */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Time</span>
                </span>
                <span className="font-mono text-white font-semibold">01:00</span>
              </div>
              <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono text-white justify-between">
                <span>00:01:00</span>
                <div className="flex gap-1 text-slate-400">
                  <button className="hover:text-white px-1 font-bold">-</button>
                  <button className="hover:text-white px-1 font-bold">+</button>
                </div>
              </div>
            </div>

            {/* Investment Amount */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span>Investment</span>
                </span>
                <span className="font-mono text-emerald-400 font-bold">{config.currency}{investment}</span>
              </div>
              <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono text-white justify-between">
                <span className="font-bold">{config.currency}{investment}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setInvestment((prev) => Math.max(10, prev - 50))}
                    className="hover:text-emerald-400 px-1 font-bold text-slate-400 cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setInvestment((prev) => prev + 50)}
                    className="hover:text-emerald-400 px-1 font-bold text-slate-400 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick investment chips */}
              <div className="grid grid-cols-3 gap-1 mt-2">
                {[100, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setInvestment(amt)}
                    className={`rounded border py-1 text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                      investment === amt
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {config.currency}{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Payout Calculation */}
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 text-center">
              <span className="text-[11px] text-slate-400 block">Payout Rate (+87%)</span>
              <span className="text-base font-mono font-bold text-emerald-400">
                +{config.currency}{Math.round(investment * 1.87)}
              </span>
            </div>
          </div>

          {/* UP / DOWN Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => handlePlaceTrade('up')}
              disabled={activeTrade !== null}
              className="flex w-full items-center justify-between rounded-xl bg-emerald-500 px-4 py-3 text-slate-950 font-bold transition-all hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider font-extrabold">UP (Call)</div>
                <div className="text-[10px] font-mono text-slate-900">+87% profit</div>
              </div>
              <TrendingUp className="h-6 w-6 stroke-[2.5]" />
            </button>

            <button
              onClick={() => handlePlaceTrade('down')}
              disabled={activeTrade !== null}
              className="flex w-full items-center justify-between rounded-xl bg-rose-600 px-4 py-3 text-white font-bold transition-all hover:bg-rose-500 active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-lg shadow-rose-600/20"
            >
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider font-extrabold">DOWN (Put)</div>
                <div className="text-[10px] font-mono text-slate-200">+87% profit</div>
              </div>
              <TrendingDown className="h-6 w-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
