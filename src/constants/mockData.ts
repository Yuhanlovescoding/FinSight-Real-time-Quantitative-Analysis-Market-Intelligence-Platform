import { StockData, NewsItem } from '../types';

export const MOCK_STOCKS: StockData[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 142.56, change: 3.42, changePercent: 2.46, sentiment: 0.85, volume: '42.1M', marketCap: '3.5T' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 228.12, change: -1.24, changePercent: -0.54, sentiment: 0.12, volume: '28.5M', marketCap: '3.4T' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 254.33, change: 12.45, changePercent: 5.15, sentiment: 0.65, volume: '85.2M', marketCap: '812B' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.89, change: 2.11, changePercent: 0.51, sentiment: 0.45, volume: '18.9M', marketCap: '3.1T' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 189.05, change: -0.88, changePercent: -0.46, sentiment: 0.25, volume: '31.2M', marketCap: '1.9T' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 168.42, change: 1.15, changePercent: 0.69, sentiment: 0.38, volume: '22.4M', marketCap: '2.1T' },
  { symbol: 'META', name: 'Meta Platforms', price: 582.01, change: 5.67, changePercent: 0.98, sentiment: 0.55, volume: '15.6M', marketCap: '1.4T' },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'NVIDIA Announces New Blackwell Architecture Efficiency Gains',
    source: 'TechCrunch',
    time: '12m ago',
    sentiment: 'positive',
    score: 0.92,
    summary: 'NVIDIA revealed new benchmarks for its Blackwell GPU architecture, showing a 30% improvement in energy efficiency for LLM training.',
    relatedStocks: ['NVDA', 'MSFT']
  },
  {
    id: '2',
    title: 'Federal Reserve Signals Potential Rate Cut in Q3',
    source: 'Bloomberg',
    time: '45m ago',
    sentiment: 'positive',
    score: 0.65,
    summary: 'Jerome Powell hinted at a more dovish stance as inflation data continues to cool, sparking a broad market rally.',
    relatedStocks: ['SPY', 'QQQ']
  },
  {
    id: '3',
    title: 'Tesla Facing New Regulatory Hurdles in EU Over FSD',
    source: 'Reuters',
    time: '1h ago',
    sentiment: 'negative',
    score: -0.78,
    summary: 'European regulators are investigating Tesla\'s Full Self-Driving beta software for compliance with new safety standards.',
    relatedStocks: ['TSLA']
  },
  {
    id: '4',
    title: 'Apple Intelligence Rollout Seeing Record Adoption Rates',
    source: 'CNBC',
    time: '2h ago',
    sentiment: 'positive',
    score: 0.88,
    summary: 'Early data suggests iPhone users are upgrading at a faster rate than previous cycles to access new AI features.',
    relatedStocks: ['AAPL']
  }
];

export const MOCK_CHART_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  price: 140 + Math.random() * 10,
  sentiment: Math.random() * 100,
}));
