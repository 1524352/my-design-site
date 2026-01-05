import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Brain, Zap, Palette, Globe, 
  ArrowLeft, Mail, MessageCircle, Layers, Phone
} from 'lucide-react';

// --- 核心数据 ---

const services = [
  { 
    icon: <Zap className="w-8 h-8 text-yellow-400" />, 
    title: "品牌基因重塑", 
    desc: "用 AI 快速迭代视觉识别系统，为品牌注入科技美学。" 
  },
  { 
    icon: <Palette className="w-8 h-8 text-purple-400" />, 
    title: "数字化内容引擎", 
    desc: "构建自动化工作流，以 10 倍效率产出顶尖视觉素材。" 
  },
  { 
    icon: <Globe className="w-8 h-8 text-blue-400" />, 
    title: "沉浸式交互体验", 
    desc: "打造不仅好看、而且好用的互动型官方网站。" 
  }
];

// 团队成员 - 已更新为罗小总系列 + 彩色亚洲帅哥头像
const teamMembers = [
  { 
    name: "罗小总", 
    role: "创始人", 
    // 帅气亚洲男生1 (商务范)
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80" 
  },
  { 
    name: "黎小总", 
    role: "AI 架构师", 
    // 帅气亚洲男生2 (极客范)
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80" 
  },
  { 
    name: "段小总", 
    role: "设计总监", 
    // 帅气亚洲男生3 (艺术范)
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80" 
  },
  { 
    name: "黄小总", 
    role: "交付经理", 
    // 帅气亚洲男生4 (亲和力)
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80" 
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white font-sans"
    >
      <nav className="fixed w-full z-50 px-6 py-6 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Brain className="w-8 h-8 text-purple-500" />
            <span className="font-bold">HAIKE</span> <span className="text-purple-500 font-light">AI STUDIO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition-colors">关于我们</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-purple-400 transition-colors">业务范畴</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-purple-400 transition-colors">精选作品</button>
            <button 
              onClick={() => setCurrentPage('contact')} 
              className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              联系我们
            </button>
          </div>
        </div>
      </nav>

      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-widest uppercase">AI Meets Creativity</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-none"
          >
            AI 赋能创作
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500">
              重塑视觉未来
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            我们不仅使用工具，更创造风格。
            <br />让数据与美学在毫秒间碰撞出无限可能。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8"
          >
            <button 
              onClick={() => scrollToSection('work')}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 group"
            >
              查看作品
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-4 bg-white/5 text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all"
            >
              联系我们
            </button>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">业务范畴</h2>
              <p className="text-gray-400 text-lg">融合顶尖技术与设计美学</p>
            </div>
            <div className="w-full md:w-auto h-px bg-white/10 flex-1 ml-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="py-32 px-6 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">精选作品</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['全部', '品牌', '电商', '视频'].map((cat) => (
                <button key={cat} className="px-6 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all text-sm font-medium">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 text-lg font-medium">作品案例 {item}</span>
                </div>
                <div className="absolute inset-0 bg-purple-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-xl mb-2">项目名称</p>
                    <p className="text-white/80 text-sm">点击查看详情</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">准备好开始了吗？</h2>
          <p className="text-xl text-gray-400">让我们一起探索 AI 设计的无限边界。</p>
          <button 
            onClick={() => setCurrentPage('contact')} 
            className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform"
          >
            立即咨询
          </button>
        </div>
      </section>

      <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© 2026 HAIKE AI STUDIO. All Rights Reserved.</p>
      </footer>
    </motion.div>
  );

  // --- 联系我们页面 ---
  const Contact = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white font-sans"
    >
      <nav className="fixed w-full z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>返回首页</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* 左侧：联系信息 */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">建立连接</h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                无论是项目合作，还是加入我们，<br />我们随时期待您的来信。
              </p>
            </div>

            <div className="space-y-8">
              {/* 微信咨询 */}
              <div className="flex items-start gap-6 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                <MessageCircle className="w-8 h-8 text-green-400 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">微信咨询</h3>
                  <p className="text-gray-300 text-lg mb-1">Haike_AI_Studio</p>
                  <p className="text-green-400 font-bold text-lg">罗总：15243527266</p>
                </div>
              </div>
              
              {/* 商务合作 */}
              <div className="flex items-start gap-6 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                <Mail className="w-8 h-8 text-purple-400 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">商务合作</h3>
                  <p className="text-gray-300 text-lg mb-1">hello@haike-ai.com</p>
                  <p className="text-purple-400 font-bold text-lg">2097726768@qq.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：团队展示 (全彩) */}
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Layers className="w-6 h-6 text-purple-500" />
              核心团队
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((member, i) => (
                <div key={i} className="group relative aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-white/5">
                  {/* 全彩图片，移除 grayscale */}
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <p className="text-white font-bold text-lg">{member.name}</p>
                    <p className="text-purple-300 text-sm">{member.role}</p>
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