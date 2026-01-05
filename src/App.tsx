import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Brain, Zap, Palette, Globe, 
  ArrowLeft, Mail, MessageCircle
} from 'lucide-react';

// --- 数据定义 ---

// 1. 作品分类
const categories = [
  { id: 'all', name: '全部' },
  { id: 'branding', name: '品牌' },
  { id: 'packaging', name: '包装' },
  { id: 'ecommerce', name: '电商' },
  { id: 'photography', name: '摄影' },
  { id: 'video', name: '视频' },
  { id: 'font', name: '字体' },
];

// 2. 团队成员数据
const teamMembers = [
  {
    name: "Alex Chen",
    role: "创始人 & 创意总监",
    desc: "10年 4A 广告公司经验，致力于探索 AI 与人类创意的边界。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces"
  },
  {
    name: "Sarah Li",
    role: "首席 AI 架构师",
    desc: "前硅谷算法工程师，负责开发 Studio 专属的生成式设计工作流。",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces"
  },
  {
    name: "David Wang",
    role: "资深视觉设计师",
    desc: "对色彩与排版有极致追求，擅长将冷冰冰的技术转化为有温度的设计。",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces"
  },
  {
    name: "Emily Zhang",
    role: "项目交付经理",
    desc: "确保每一个创意都能按时、高质量地落地，是客户最信赖的伙伴。",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces"
  }
];

// 3. 业务范畴 (原 AI Services)
const services = [
  { 
    icon: <Zap className="w-12 h-12 text-yellow-400" />, 
    title: "品牌基因重塑", 
    subTitle: "Brand DNA Redesign", // 这里保留小字英文作为装饰，如果不想要可以删掉
    desc: "利用生成式 AI 快速迭代 Logo 与视觉识别系统 (VI)，为品牌注入独特的科技美学基因。" 
  },
  { 
    icon: <Palette className="w-12 h-12 text-purple-400" />, 
    title: "数字化内容引擎", 
    subTitle: "Digital Content Engine",
    desc: "从社交媒体海报到电商详情页，构建自动化 AI 工作流，以 10 倍效率产出顶尖视觉素材。" 
  },
  { 
    icon: <Globe className="w-12 h-12 text-blue-400" />, 
    title: "沉浸式交互体验", 
    subTitle: "Immersive Web Experience",
    desc: "结合 React 生态与 3D 技术，打造不仅好看、而且好用的互动型官方网站与落地页。" 
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

  // 统一超宽屏容器类名
  const containerClass = "w-[92%] max-w-[1800px] mx-auto";

  // --- 页面组件：首页 (Home) ---
  const Home = () => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white"
    >
      {/* Navigation - 导航栏 (严格对应用户要求的5个中文菜单) */}
      <nav className="fixed w-full z-50 py-6 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className={`${containerClass} flex justify-between items-center`}>
          {/* Logo 保持英文 */}
          <div 
            className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Brain className="w-8 h-8 text-blue-500" />
            HAIKE <span className="text-blue-500">AI STUDIO</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-base font-medium items-center">
            {/* ABOUT -> 关于我们 (回顶部) */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">关于我们</button>
            
            {/* AI PHILOSOPHY -> AI 理念 */}
            <button onClick={() => scrollToSection('values')} className="hover:text-blue-400 transition-colors">AI 理念</button>
            
            {/* SERVICES -> 业务范畴 */}
            <button onClick={() => scrollToSection('services')} className="hover:text-blue-400 transition-colors">业务范畴</button>
            
            {/* WORK -> 精选作品 */}
            <button onClick={() => scrollToSection('work')} className="hover:text-blue-400 transition-colors">精选作品</button>
            
            {/* CONTACT -> 联系我们 */}
            <button 
              onClick={() => setCurrentPage('contact')} 
              className="px-8 py-2.5 bg-white text-black rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all"
            >
              联系我们
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* 背景光效 */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        </div>

        <div className="relative w-full max-w-[1400px] px-6 mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/20 text-blue-300"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-base font-medium tracking-wide">AI 遇 见 创 意</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight">
            AI 赋能创作
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              人类精雕细琢
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-white/90 max-w-4xl mx-auto font-light leading-relaxed">
            视觉设计的未来，从这里开始。
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-10">
            <button 
              onClick={() => scrollToSection('work')}
              className="px-12 py-6 bg-white text-black rounded-full font-bold text-2xl hover:bg-gray-200 transition-all flex items-center gap-3 group"
            >
              查看作品
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setCurrentPage('contact')}
              className="px-12 py-6 bg-black text-white rounded-full font-bold text-2xl border-2 border-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
            >
              联系我们
            </button>
          </div>
        </div>
      </section>

      {/* Services Section - 业务范畴 */}
      <section id="services" className="py-32 bg-black relative border-t border-white/10">
        <div className={containerClass}>
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">业务范畴</h2>
            {/* 英文装饰字改为中文描述 */}
            <p className="text-xl text-gray-500 tracking-widest">专业领域与解决方案</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="p-12 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="mb-8 p-5 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{service.title}</h3>
                {/* 仅保留这唯一的一行小英文作为装饰，如果需要彻底删除，请删掉下一行 */}
                <p className="text-sm text-blue-400 font-mono mb-6 uppercase tracking-wider opacity-60">{service.subTitle}</p>
                <p className="text-white text-xl leading-relaxed opacity-90">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - AI 理念 */}
      <section id="values" className="py-24 bg-gradient-to-b from-black to-zinc-900">
        <div className={containerClass}>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">AI 理念</h2>
            <p className="text-xl text-gray-500 tracking-widest">核心价值观</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {["效率至上", "结果导向", "创新驱动", "美学坚持", "商业赋能", "快速响应", "数据思维", "精益求精", "拥抱变化", "诚信交付"].map((value, i) => (
              <div key={i} className="py-8 px-4 rounded-2xl border border-white/10 bg-white/5 text-center hover:bg-blue-600/20 hover:border-blue-500 transition-all cursor-default">
                <div className="text-2xl font-bold text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 bg-black relative">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">精选作品</h2>
            <p className="text-xl text-gray-500 tracking-widest">代表案例展示</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full text-xl font-bold transition-all duration-300 border ${
                  activeCategory === cat.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 min-h-[500px]">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xl">作品展示位 (等待上传)</div>
                <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">查看详情</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-gradient-to-t from-blue-900/20 to-black text-center">
        <div className="max-w-5xl mx-auto space-y-10 px-6">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">AI 赋能，效率倍增。<br />立即开启您的品牌升级之旅。</h2>
          <div className="pt-10">
            <button onClick={() => setCurrentPage('contact')} className="px-16 py-8 bg-white text-black rounded-full font-bold text-3xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">开始合作</button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10 bg-black text-center md:text-left">
        <div className={`${containerClass} flex flex-col md:flex-row justify-between items-center gap-6`}>
          <div className="text-white/60 text-lg">© 2026 HaiKe AI Studio. 保留所有权利。</div>
          <div className="text-2xl font-bold text-white">haike-ai.zeabur.app</div>
        </div>
      </footer>
    </motion.div>
  );

  // --- 页面组件：联系我们 (Contact) ---
  const Contact = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white"
    >
      {/* Contact Nav */}
      <nav className="fixed w-full z-50 py-6 bg-black border-b border-white/10">
        <div className={`${containerClass} flex justify-between items-center`}>
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 text-white hover:text-blue-500 transition-colors group"
          >
            <ArrowLeft className="w-8 h-8 group-hover:-translate-x-2 transition-transform" />
            <span className="text-xl font-bold">返回首页</span>
          </button>
          <div className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-500" />
            HAIKE <span className="text-blue-500">AI STUDIO</span>
          </div>
        </div>
      </nav>

      <div className="pt-40 pb-20">
        <div className={containerClass}>
          {/* Header */}
          <div className="text-center mb-24 space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">联系我们</h1>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              无论是项目咨询，还是技术探讨，我们都期待与您的交流。
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-40">
            <div className="p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500 transition-colors text-center space-y-6">
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto text-blue-500">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold">官方网站</h3>
              <p className="text-xl text-white font-mono">haike-ai.zeabur.app</p>
            </div>
            
            <div className="p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-green-500 transition-colors text-center space-y-6">
              <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto text-green-500">
                <MessageCircle className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold">微信咨询</h3>
              <p className="text-xl text-white">Haike_AI_Studio</p>
            </div>

            <div className="p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-purple-500 transition-colors text-center space-y-6">
              <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto text-purple-500">
                <Mail className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold">商务合作</h3>
              <p className="text-xl text-white">hello@haike-ai.com</p>
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-20">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold">认识我们的团队</h2>
              <p className="text-2xl text-gray-400">一群将设计美学与 AI 技术完美融合的探索者</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, i) => (
                <div key={i} className="group relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-8 space-y-3">
                    <h3 className="text-3xl font-bold text-white">{member.name}</h3>
                    <div className="text-blue-400 font-medium text-xl">{member.role}</div>
                    <p className="text-gray-300 leading-relaxed pt-4 text-base border-t border-white/10 mt-6">
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-10 text-center text-white/40 border-t border-white/10 text-lg">
        © 2026 HaiKe AI Studio. 保留所有权利。
      </footer>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'home' ? <Home key="home" /> : <Contact key="contact" />}
    </AnimatePresence>
  );
}

export default App;