import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Newspaper, 
  BarChart3, 
  MessageSquare, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCw,
  Cpu,
  Globe,
  ExternalLink,
  Send
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { MOCK_STOCKS, MOCK_NEWS, MOCK_CHART_DATA } from './constants/mockData';
import { StockData, NewsItem, ChatMessage } from './types';
import { getMarketIntelligence } from './services/gemini';

export default function App() {
  const [stocks, setStocks] = useState<StockData[]>(MOCK_STOCKS);
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [selectedStock, setSelectedStock] = useState<StockData>(MOCK_STOCKS[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Welcome to FinSight. I'm your real-time market intelligence assistant. How can I help you analyze the markets today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = chatMessages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await getMarketIntelligence(input, history);
    
    const modelMsg: ChatMessage = { 
      role: 'model', 
      content: response.text, 
      timestamp: new Date() 
    };
    
    setChatMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex h-screen bg-brand-bg text-white overflow-hidden font-sans">
      {/* Sidebar - Navigation */}
      <aside className="w-16 border-r border-brand-border flex flex-col items-center py-6 space-y-8 bg-brand-card/50">
        <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center shadow-lg shadow-brand-accent/20">
          <Activity className="text-brand-bg w-6 h-6" />
        </div>
        <nav className="flex flex-col space-y-6">
          <button className="p-2 text-brand-accent bg-brand-accent/10 rounded-lg transition-colors">
            <BarChart3 className="w-6 h-6" />
          </button>
          <button className="p-2 text-brand-text-dim hover:text-white transition-colors">
            <Newspaper className="w-6 h-6" />
          </button>
          <button className="p-2 text-brand-text-dim hover:text-white transition-colors">
            <Globe className="w-6 h-6" />
          </button>
        </nav>
        <div className="mt-auto pb-6 flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <div className="text-[8px] font-mono text-brand-text-dim vertical-text tracking-widest uppercase opacity-50">
            Pipeline Active
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-brand-border flex items-center justify-between px-6 bg-brand-card/30 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold tracking-tight">FinSight <span className="text-brand-accent text-sm font-mono ml-2">v2.4.0</span></h1>
            <div className="h-4 w-[1px] bg-brand-border" />
            <div className="flex items-center space-x-2 text-xs text-brand-text-dim">
              <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
              <span className="font-mono">MARKET OPEN</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
              <input 
                type="text" 
                placeholder="Search symbols, news, or insights..." 
                className="bg-brand-bg border border-brand-border rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-accent w-64 transition-all"
              />
            </div>
            <button className="p-2 hover:bg-brand-border rounded-full transition-colors">
              <RefreshCw className="w-4 h-4 text-brand-text-dim" />
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stocks.slice(0, 4).map((stock) => (
              <motion.div 
                key={stock.symbol}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedStock(stock)}
                className={cn(
                  "glass-panel p-4 cursor-pointer transition-all",
                  selectedStock.symbol === stock.symbol ? "border-brand-accent bg-brand-accent/5" : "hover:border-brand-text-dim/30"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono font-bold text-lg">{stock.symbol}</span>
                  <div className={cn(
                    "flex items-center text-xs font-medium px-1.5 py-0.5 rounded",
                    stock.change >= 0 ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
                  )}>
                    {stock.change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {Math.abs(stock.changePercent)}%
                  </div>
                </div>
                <div className="text-2xl font-bold data-value">${stock.price.toFixed(2)}</div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-brand-text-dim uppercase tracking-wider">
                  <span>Sentiment</span>
                  <span className={cn(
                    "font-bold",
                    stock.sentiment > 0.5 ? "text-emerald-400" : stock.sentiment > 0.2 ? "text-yellow-400" : "text-rose-400"
                  )}>
                    {(stock.sentiment * 100).toFixed(0)}% Bullish
                  </span>
                </div>
                <div className="mt-1 w-full h-1 bg-brand-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-accent transition-all duration-1000" 
                    style={{ width: `${(stock.sentiment * 100)}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Chart & Analysis */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold flex items-center">
                      {selectedStock.name}
                      <span className="ml-2 text-xs font-mono text-brand-text-dim">({selectedStock.symbol})</span>
                    </h2>
                    <p className="text-xs text-brand-text-dim">Real-time Quantitative Analysis</p>
                  </div>
                  <div className="flex bg-brand-bg rounded-lg p-1 border border-brand-border">
                    {['1H', '1D', '1W', '1M', 'ALL'].map(t => (
                      <button key={t} className={cn(
                        "px-3 py-1 text-[10px] font-bold rounded transition-all",
                        t === '1D' ? "bg-brand-accent text-brand-bg" : "text-brand-text-dim hover:text-white"
                      )}>{t}</button>
                    ))}
                  </div>
                </div>
                
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_CHART_DATA}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                      <XAxis 
                        dataKey="time" 
                        stroke="#71717A" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke="#71717A" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        domain={['auto', 'auto']}
                        tickFormatter={(v) => `$${v}`}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#141417', border: '1px solid #27272A', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#10B981' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-brand-border">
                  <div>
                    <p className="text-[10px] text-brand-text-dim uppercase tracking-widest mb-1">Volume</p>
                    <p className="font-mono font-bold">{selectedStock.volume}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-text-dim uppercase tracking-widest mb-1">Market Cap</p>
                    <p className="font-mono font-bold">{selectedStock.marketCap}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-text-dim uppercase tracking-widest mb-1">Volatility</p>
                    <p className="font-mono font-bold">1.24%</p>
                  </div>
                </div>
              </div>

              {/* News Feed */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center">
                    <Newspaper className="w-4 h-4 mr-2 text-brand-accent" />
                    Market Intelligence Feed
                  </h3>
                  <button className="text-xs text-brand-accent hover:underline">View All News</button>
                </div>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="group p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-brand-border">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">{item.source} • {item.time}</span>
                        <div className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase",
                          item.sentiment === 'positive' ? "bg-emerald-400/10 text-emerald-400" : "bg-rose-400/10 text-rose-400"
                        )}>
                          {item.sentiment} ({item.score > 0 ? '+' : ''}{item.score})
                        </div>
                      </div>
                      <h4 className="text-sm font-medium group-hover:text-brand-accent transition-colors">{item.title}</h4>
                      <p className="text-xs text-brand-text-dim mt-1 line-clamp-2">{item.summary}</p>
                      <div className="flex gap-2 mt-2">
                        {item.relatedStocks.map(s => (
                          <span key={s} className="text-[9px] font-mono bg-brand-border px-1.5 py-0.5 rounded text-brand-text-dim">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: AI Intelligence Chat */}
            <div className="flex flex-col h-[calc(100vh-180px)] glass-panel overflow-hidden">
              <div className="p-4 border-b border-brand-border bg-brand-card/50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Market Analyst AI</h3>
                    <p className="text-[10px] text-brand-accent">RAG-Powered Insights</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                   <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm",
                      msg.role === 'user' ? "bg-brand-accent text-brand-bg font-medium" : "bg-brand-border/50 border border-brand-border"
                    )}>
                      <div className="prose prose-invert prose-sm max-w-none">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    </div>
                    <span className="text-[9px] text-brand-text-dim mt-1 px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <div className="bg-brand-border/50 p-3 rounded-2xl border border-brand-border">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-brand-text-dim rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-brand-text-dim rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-brand-text-dim rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-border bg-brand-card/50">
                <div className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about market trends, stocks, or sentiment..."
                    className="w-full bg-brand-bg border border-brand-border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brand-accent transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-accent hover:bg-brand-accent/10 rounded-lg transition-all disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[9px] text-brand-text-dim mt-2 text-center">
                  Powered by Gemini 3.0 Flash • Real-time Search Enabled
                </p>
              </form>
            </div>
          </div>

          {/* Bottom Row: Sentiment Heatmap Simulation */}
          <div className="glass-panel p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-brand-accent" />
              Cross-Platform Sentiment Heatmap
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {stocks.map(s => (
                <div key={s.symbol} className="flex flex-col items-center p-2 rounded bg-brand-bg border border-brand-border">
                  <span className="text-[10px] font-mono text-brand-text-dim mb-1">{s.symbol}</span>
                  <div 
                    className="w-full h-8 rounded flex items-center justify-center text-[10px] font-bold"
                    style={{ 
                      backgroundColor: s.sentiment > 0.6 ? '#064E3B' : s.sentiment > 0.4 ? '#422006' : '#450A0A',
                      color: s.sentiment > 0.6 ? '#10B981' : s.sentiment > 0.4 ? '#FBBF24' : '#F87171',
                      border: `1px solid ${s.sentiment > 0.6 ? '#10B981' : s.sentiment > 0.4 ? '#FBBF24' : '#F87171'}44`
                    }}
                  >
                    {(s.sentiment * 100).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
