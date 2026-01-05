import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Sparkles, Package, ShoppingBag, Camera, Video, Heart, 
  Zap, TrendingUp, Layers, Target, ChevronDown, Send,
  Github, Twitter, Linkedin, CheckCircle2, ArrowRight
} from 'lucide-react';

// --- 工具函数 ---
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// --- 核心数据配置 ---
const STATS = [
  { label: "AI 辅助项目", value: "200+" },
  { label: "完成作品", value: "500+" },
  { label: "效率提升", value: "85%" },
  { label: "客户满意度", value: "98%" }
];

const AI_ADVANTAGES = [
  { icon: <Zap />, title: "10x", sub: "效率提升", desc: "AI 处理重复工作，设计师专注创意核心" },
  { icon: <TrendingUp />, title: "85%", sub: "时间节省", desc: "从创意到成品，AI 大幅缩短制作周期" },
  { icon: <Layers />, title: "100+", sub: "方案选择", desc: "AI 快速生成海量创意方向供选择" },
  { icon: <Target />, title: "数据驱动", sub: "精准决策", desc: "AI 分析趋势，让设计更有依据" }
];

const SERVICES = [
  { id: 1, icon: <Sparkles />, title: "AI 辅助品牌设计", sub: "AI-Powered Brand Design", desc: "结合 AI 快速生成多套品牌方案，人类设计师精修优化。", highlights: "⚡ 创意探索缩短 80%", tag: "AI Enhanced" },
  { id: 2, icon: <Package />, title: "AI 驱动包装设计", sub: "AI-Driven Packaging Design", desc: "AI 分析市场趋势，生成数据驱动方案，实时 3D 渲染。", highlights: "🎯 1000+ 竞品案例分析", tag: "AI Enhanced" },
  { id: 3, icon: <ShoppingBag />, title: "AI 电商设计", sub: "AI E-commerce Design", desc: "AI 自动生成详情页、智能抠图，效率提升 10 倍。", highlights: "🚀 3天缩短至3小时", tag: "AI Enhanced" },
  { id: 4, icon: <Camera />, title: "AI 增强摄影", sub: "AI-Enhanced Photography", desc: "AI 智能修图、精准调色、场景扩展，让每张照片都是大片。", highlights: "✨ 后期处理缩短至小时", tag: "AI Enhanced" },
  { id: 5, icon: <Video />, title: "AI 视频制作", sub: "AI Video Production", desc: "AI 自动剪辑、智能配乐、一键字幕，短视频快人一步。", highlights: "⏱️ 周期从周缩短到天", tag: "AI Enhanced" },
  { id: 6, icon: <Heart />, title: "AI 辅助婚纱摄影", sub: "AI-Assisted Wedding Photography", desc: "AI 实时预览风格、虚拟场景生成，在影棚内“穿越”全球。", highlights: "🌟 虚拟梦幻场景生成", tag: "AI Enhanced" },
];

// --- 子组件: 背景光效 ---
const BackgroundEffect = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] animate-pulse" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('全部');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="text-gray-100 selection:bg-purple-500/30">
      <BackgroundEffect />
      
      {/* 进度条 */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-400 z-50 origin-left" style={{ scaleX }} />

      {/* 导航栏 */}
      <nav className="fixed w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-black tracking-tighter uppercase">
            HaiKe <span className="text-purple-500">AI</span> Studio
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase">
            {['About', 'AI Philosophy', 'Services', 'Work', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-purple-400 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 px-4 py-1 border border-purple-500/30 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold tracking-[0.2em] uppercase"
          >
            AI Meets Creativity
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none"
          >
            WHERE INTELLIGENCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient-x">
              REDEFINES DESIGN
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl text-gray-400 text-lg md:text-xl mb-10 font-light"
          >
            AI 赋能创作，人类精雕细琢 — <span className="text-white font-medium">视觉设计的未来，从这里开始。</span>
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105 active:scale-95">查看作品</button>
            <button className="px-10 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-all">联系我们</button>
          </div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10">
            <ChevronDown className="text-gray-600" />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-purple-500 font-bold tracking-widest uppercase mb-4">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">关于 HaiKe AI Studio</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                我们是一家 <span className="text-white font-bold italic">AI 驱动的新一代创意机构</span>。站在设计与科技的交叉路口，用人工智能重新定义视觉创作的可能性。我们相信，AI 不是替代设计师，而是解放创造力。
              </p>
              <div className="grid grid-cols-2 gap-8">
                {STATS.map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all" />
              <div className="relative p-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm">
                 <h4 className="text-xl font-bold mb-6">核心价值观</h4>
                 <ul className="space-y-4">
                   {['AI 赋能创作', '人机协作共赢', '效率与品质并重', '持续创新进化', '数据驱动决策'].map(val => (
                     <li key={val} className="flex items-center gap-3 text-gray-300">
                       <CheckCircle2 className="w-5 h-5 text-purple-500" /> {val}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AI PHILOSOPHY */}
        <section id="ai-philosophy" className="py-32 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">AI 如何重新定义设计？</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { phase: "创意探索", old: "耗时数天", ai: "30分钟 100+方向" },
                { phase: "执行制作", old: "重复劳动占据 70%", ai: "AI 处理细节，人专注核心" },
                { phase: "迭代优化", old: "迭代需 2-3 天", ai: "实时调整，速度提升 10 倍" },
                { phase: "决策支持", old: "主观判断强", ai: "数据驱动，决策科学" }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-white/5 bg-black/40">
                  <div className="text-purple-500 font-black mb-4 uppercase tracking-tighter">Phase {i+1}</div>
                  <h4 className="text-xl font-bold mb-6">{item.phase}</h4>
                  <div className="space-y-4 text-sm">
                    <div className="text-gray-600 line-through">传统：{item.old}</div>
                    <div className="text-purple-400 font-bold">AI 赋能：{item.ai}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES - BENTO GRID */}
        <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-20 text-center">
             <h2 className="text-5xl font-black mb-4 tracking-tighter italic">AI SERVICES</h2>
             <p className="text-gray-500">人机协作，重新定义交付标准</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={i} 
                className="group p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/5 to-transparent hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-2">{s.tag}</div>
                <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{s.desc}</p>
                <div className="pt-6 border-t border-white/5">
                   <div className="text-xs font-bold text-gray-400 flex items-center gap-2">
                     <Zap className="w-3 h-3 text-yellow-500" /> {s.highlights}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI ADVANTAGES */}
        <section className="py-32 px-6 bg-purple-600 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">
            {AI_ADVANTAGES.map((adv, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-6xl font-black mb-2 tracking-tighter">{adv.title}</div>
                <div className="text-xl font-bold mb-4 uppercase italic">{adv.sub}</div>
                <p className="text-purple-100/70 text-sm">{adv.desc}</p>
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none font-black text-[20vw] select-none -translate-y-1/2 translate-x-1/4">AI DRIVEN</div>
        </section>

        {/* PORTFOLIO EMPTY STATE */}
        <section id="work" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <h2 className="text-5xl font-black italic tracking-tighter">PORTFOLIO</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
              {['全部', '品牌', '包装', '电商', '摄影', '视频'].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={cn("px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap", activeTab === t ? "bg-white text-black" : "bg-white/5 text-gray-500 hover:bg-white/10")}
                >{t}</button>
              ))}
            </div>
          </div>
          <div className="h-[500px] rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-10 bg-white/[0.02]">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="mb-8">
              <Sparkles className="w-20 h-20 text-white/10" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">精彩作品即将呈现</h3>
            <p className="text-gray-500 max-w-sm">海客 {activeTab} 作品集正在深度整理中，我们将通过 AI 工作流重新优化展示效果，敬请期待。</p>
            <button className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-bold flex items-center gap-2 group">
              提交您的合作意向 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* CONTACT & FAQ */}
        <section id="contact" className="py-32 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">准备好进入 <br /> AI 时代了吗？</h2>
            <div className="p-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 inline-block">
              <div className="px-10 py-4 bg-black rounded-full text-xl font-bold cursor-pointer hover:bg-transparent transition-colors">
                hello@haike-ai.com
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div>
             <div className="text-2xl font-black tracking-tighter mb-4 italic">HAIKE AI<span className="text-purple-500">.</span></div>
             <p className="text-gray-500 text-sm max-w-xs uppercase font-bold tracking-widest leading-loose">Liberate Creativity with AI, Return Design to Its Essence.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"><Github /></div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"><Twitter /></div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"><Linkedin /></div>
          </div>
          <div className="text-xs font-bold text-gray-600 uppercase tracking-[0.3em]">
            © 2026 HaiKe AI Studio. Created by HaiKe.
          </div>
        </div>
      </footer>
    </div>
  );
}