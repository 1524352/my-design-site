import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Brain, Zap, Palette, Globe, 
  ArrowLeft, Mail, MessageCircle, Layers
} from 'lucide-react';

// --- 数据定义 ---

const categories = [
  { id: 'all', name: '全部' },
  { id: 'branding', name: '品牌' },
  { id: 'packaging', name: '包装' },
  { id: 'ecommerce', name: '电商' },
  { id: 'photography', name: '摄影' },
  { id: 'video', name: '视频' },
  { id: 'font', name: '字体' },
];

const teamMembers = [
  { 
    name: "罗小总", 
    role: "创始人 & 创意总监", 
    desc: "10年 4A 广告公司经验，致力于探索 AI 与人类创意的边界。",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" 
  },
  { 
    name: "黎小总", 
    role: "首席 AI 架构师", 
    desc: "前硅谷算法工程师，负责开发 Studio 专属的生成式设计工作流。",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" 
  },
  { 
    name: "段小总", 
    role: "资深视觉设计师", 
    desc: "对色彩与排版有极致追求，擅长将冷冰冰的技术转化为有温度的设计。",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" 
  },
  { 
    name: "黄小总", 
    role: "项目交付经理", 
    desc: "确保每一个创意都能按时、高质量地落地，是客户最信赖的伙伴。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- 首页组件 ---
  const Home = () => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white"
    >
      {/* 导航栏 */}
      <nav className="fixed w-full z-50 px-6 py-6 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Brain className="w-8 h-8 text-purple-500" />
            HAIKE <span className="text-purple-500 font-light">AI STUDIO</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium items-center">
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-purple-400 transition-colors">关于我们</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-purple-400 transition-colors">业务范畴</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-purple-400 transition-colors">精选作品</button>
            <button 
              onClick={() => setCurrentPage('contact')} 
              className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all"
            >
              联系我们
            </button>
          </div>
        </div>
      </nav>

      {/* 英雄视觉区 */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-widest uppercase">AI Meets Creativity</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
            AI 赋能创作
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500">
              人类精雕细琢
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            视觉设计的未来，从这里开始。
            <br />让数据与美学在毫秒间碰撞出无限可能。
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
            <button 
              onClick={() => scrollToSection('work')}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 group"
            >
              查看作品
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-4 bg-white/5 text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              联系我们
            </button>
          </div>
        </div>
      </section>

      {/* 业务范畴 */}
      <section id="services" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">业务范畴</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: "品牌基因重塑", desc: "利用生成式 AI 快速迭代 Logo 与视觉识别系统，为品牌注入科技美学。" },
              { icon: <Palette className="w-8 h-8 text-purple-400" />, title: "数字化内容引擎", desc: "构建自动化工作流，以 10 倍效率产出 100 分的顶尖视觉素材。" },
              { icon: <Globe className="w-8 h-8 text-blue-400" />, title: "沉浸式交互体验", desc: "结合 React 与 3D 技术，打造不仅好看、而且好用的互动型官网。" }
            ].map((service, i) => (
              <div key={i} className="p-10 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 作品展示 */}
      <section id="work" className="py-32 px-6 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">精选作品</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-2 rounded-full text-base font-bold transition-all border ${
                  activeCategory === cat.id ? 'bg-purple-600 border-purple-600 text-white' : 'bg-transparent border-white/10 text-white hover:bg-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8 min-h-[400px]">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-lg">作品案例 {item}</div>
                <div className="absolute inset-0 bg-purple-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xl font-bold">查看详情</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部引导 */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">准备好开始了吗？</h2>
          <p className="text-xl text-gray-400">让我们一起探索 AI 赋能设计的无限边界。</p>
          <div className="pt-8">
            <button onClick={() => setCurrentPage('contact')} className="px-12 py-6 bg-white text-black rounded-full font-bold text-2xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              开始合作
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 px-6 bg-black text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-base">© 2026 HAIKE AI STUDIO. 保留所有权利。</div>
          <div className="text-xl font-bold text-white">haike-ai.zeabur.app</div>
        </div>
      </footer>
    </motion.div>
  );

  // --- 联系我们页面 ---
  const Contact = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-black text-white selection:bg-purple-500"
    >
      <nav className="fixed w-full z-50 px-6 py-6 flex justify-between items-center">
        <button 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-white hover:text-purple-500 transition-colors group px-4 py-2 rounded-full bg-white/5 border border-white/10"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">返回首页</span>
        </button>
        <div className="text-xl font-bold flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" /> HAIKE AI
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">建立连接</h1>
              <p className="text-xl text-gray-400 leading-relaxed">无论是项目合作，还是技术咨询，我们随时期待您的交流。</p>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                <MessageCircle className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-xl font-bold mb-1">微信咨询</h3>
                <p className="text-gray-300">Haike_AI_Studio</p>
                <p className="text-green-400 font-bold text-xl mt-2">罗总：15243527266</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                <Mail className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-1">商务合作</h3>
                <p className="text-gray-300">hello@haike-ai.com</p>
                <p className="text-purple-400 font-bold text-xl mt-2">2097726768@qq.com</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2"><Layers className="text-purple-500" /> 核心团队</h2>
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((m, i) => (
                <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                    <p className="font-bold text-lg">{m.name}</p>
                    <p className="text-purple-300 text-sm">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'home' ? <Home key="home" /> : <Contact key="contact" />}
    </AnimatePresence>
  );
}

export default App;