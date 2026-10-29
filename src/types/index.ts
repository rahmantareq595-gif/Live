export interface CustomizerConfig {
  balance: string;
  currency: string;
  statusText: string;
  statusColor: string;
  urlReplace: string;
  tabTitle: string;
  removeWatermark: boolean;
  interceptCanvas: boolean;
  continuousSync: boolean;
  enableHUD: boolean;
  leaderboard: {
    enabled: boolean;
    rank: number;
    name: string;
    countryFlag: string;
    countryName: string;
    profit: string;
    winRate: string;
    tradesCount: number;
  };
}

export interface PresetProfile {
  id: string;
  name: string;
  badge: string;
  balance: string;
  currency: string;
  rank: number;
  traderName: string;
  countryFlag: string;
  countryName: string;
  profit: string;
  winRate: string;
}

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface LeaderboardTrader {
  rank: number;
  name: string;
  countryFlag: string;
  countryCode: string;
  profit: number;
  winRate: number;
  trades: number;
  isCurrentUser?: boolean;
}
