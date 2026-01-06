import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, Package, ShoppingBag, Camera, Video, Heart, 
  Zap, TrendingUp, Layers, Target, 
  MessageCircle, Mail, Globe, MapPin, 
  Menu, X, Check, ArrowRight, Star, Moon, Sun, ChevronDown
} from 'lucide-react';

// --- 类型定义 ---
type ServiceType = {
  icon: React.ElementType;
  title: string;
  desc: string;
  features: string[];
  highlight: string;
};

type TeamMemberType = {
  name: string;
  role: string;
  desc: string;
  tags: string[];
  quote: string;
  stats: string;
  image: string;
  contact?: string;
};

// --- 组件：导航栏 ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // 修改点：导航栏链接更新，去掉了客户评价，加上了合作流程
  const navLinks = [
    { name: '关于我们', path: '/#about' },
    { name: '服务项目', path: '/#services' },
    { name: '作品集', path: '/#portfolio' },
    { name: '合作流程', path: '/#process' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
              H
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 tracking-wider">
              HAIKE AI STUDIO
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.path} className="text-slate-300 hover:text-white hover:scale-105 transition-all text-sm font-medium">
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => navigate('/contact')}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all"
            >
              联系我们
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 text-slate-300 transition-colors">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2 text-slate-300">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a key={link.name} href={link.path} onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md">
                  {link.name}
                </a>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-indigo-400 hover:text-indigo-300">
                联系我们
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- 组件：页脚 ---
const Footer = () => (
  <footer className="bg-slate-950 border-t border-white/10 pt-20 pb-10 text-slate-400">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <div>
        <div className="flex items-center gap-2 mb-4 text-white font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center text-sm">H</div>
          HAIKE AI STUDIO
        </div>
        <p className="mb-4 text-sm">AI 驱动的新一代创意机构</p>
        <p className="text-sm text-indigo-400">用 AI 解放创造力，让设计回归本质</p>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">快速链接</h3>
        <ul className="space-y-2 text-sm">
          {['关于我们', '服务项目', '作品集', '合作流程', '联系我们'].map(item => (
            <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">关注我们</h3>
        <ul className="space-y-2 text-sm">
          {['微信公众号', 'Instagram', 'Behance', '小红书', '微博'].map(item => (
            <li key={item}><a href="#" className="hover:text-indigo-400 transition-colors">{item}</a></li>
          ))}
        </ul>
      </div>
    </div>
    <div className="text-center text-xs border-t border-white/5 pt-8">
      <p>HaiKe AI Studio © 2024 版权所有 | AI 遇见创意，智能重新定义设计</p>
    </div>
  </footer>
);

// --- 页面：首页 ---
const HomePage = () => {
  const navigate = useNavigate();
  const [heroText, setHeroText] = useState('');
  const fullText = "AI 遇见创意\n智能重新定义设计";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setHeroText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { num: '200+', label: 'AI 辅助项目' },
    { num: '500+', label: '完成作品' },
    { num: '85%', label: '设计效率提升' },
    { num: '98%', label: '客户满意度' },
  ];

  const services: ServiceType[] = [
    { icon: Sparkles, title: 'AI 辅助品牌设计', desc: '结合 AI 快速生成多套品牌方案，人类设计师精修优化。', features: ['AI Logo 创意生成', '智能 VI 系统', '品牌策略分析', '风格迁移'], highlight: '⚡ AI 将创意探索时间缩短 80%' },
    { icon: Package, title: 'AI 驱动包装设计', desc: 'AI 分析市场趋势，生成数据驱动的包装方案。', features: ['AI 趋势分析', '3D 渲染预览', '智能结构优化', '系列化自动生成'], highlight: '🎯 分析 1000+ 竞品案例' },
    { icon: ShoppingBag, title: 'AI 电商设计', desc: '自动生成详情页、智能抠图，效率提升 10 倍。', features: ['AI 详情页生成', '智能抠图', '批量处理', 'A/B 测试方案'], highlight: '🚀 3天缩短到3小时' },
    { icon: Camera, title: 'AI 智能修图', desc: '智能修图、调色、场景扩展，每张都是大片。', features: ['AI 智能修图', '精准调色', '产品抠图', '场景扩展'], highlight: '✨ 后期时间缩短到小时' },
    { icon: Video, title: 'AI 视频制作', desc: '自动剪辑、配乐、字幕，短视频快人一步。', features: ['AI 自动剪辑', '智能配乐', '自动字幕', '风格滤镜'], highlight: '⏱️ 周期从周缩短到天' },
    { icon: Heart, title: 'AI 辅助婚纱摄影', desc: '实时预览风格、智能构图、虚拟梦幻场景。', features: ['AI 风格预览', '智能构图', '虚拟场景', '自动精修'], highlight: '🌟 影棚内"穿越"全球' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. 首屏 Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-medium mb-6">
              ✨ 下一代创意设计体验
            </span>
            <h1 className="text-7xl md:text-9xl font-bold leading-tight mb-8 whitespace-pre-line text-white h-[1.2em] md:h-auto">
              {heroText}<span className="animate-pulse">|</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI 赋能创作，人类精雕细琢<br/>视觉设计的未来，从这里开始
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2"
            >
              查看作品 <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-5 bg-transparent border-2 border-white/20 hover:bg-white/5 text-white rounded-full font-bold text-lg transition-all hover:scale-105"
            >
              联系我们
            </button>
          </motion.div>
        </div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 2. 关于我们 & 数据 */}
      <section id="about" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">关于 <span className="text-indigo-500">HaiKe AI Studio</span></h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
              我们是一家 AI 驱动的新一代创意机构，站在设计与科技的交叉路口。
              我们相信，<span className="text-white font-medium">AI 不是替代设计师，而是解放创造力。</span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">{stat.num}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-6 uppercase tracking-widest">Powered By</p>
            <div className="flex flex-wrap justify-center gap-4 text-slate-400 text-sm font-medium max-w-4xl mx-auto">
              {['Gemini', 'Lovart', 'LiblibAI', 'Midjourney', 'DALL·E 3', 'Stable Diffusion', 'Adobe Firefly', 'Runway', 'ChatGPT', 'Claude', 'Link Fox AI'].map(tech => (
                <span key={tech} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:text-white transition-colors">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. 服务项目 */}
      <section id="services" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">我们的服务</h2>
            <p className="text-slate-400">全流程 AI 赋能，效率与品质的完美平衡</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-slate-950 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-xs text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="py-2 px-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 inline-block">
                    {service.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI 优势 */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">AI 带来的优势</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, num: '10x', title: '效率提升', desc: '处理重复工作，专注创意核心' },
              { icon: TrendingUp, num: '85%', title: '时间节省', desc: '大幅缩短制作周期' },
              { icon: Layers, num: '100+', title: '方案选择', desc: '快速生成海量创意方向' },
              { icon: Target, num: 'Data', title: '数据驱动', desc: 'AI 分析市场趋势让设计有依据' },
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-white/10 rounded-2xl bg-gradient-to-b from-white/5 to-transparent text-center">
                <item.icon className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{item.num}</div>
                <div className="text-lg font-semibold mb-2">{item.title}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 作品集 */}
      <section id="portfolio" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">我们的作品</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['全部作品', '品牌设计', '包装设计', '电商设计', '电商摄影', '短视频', '婚纱摄影'].map(tag => (
                <button key={tag} className="px-4 py-2 text-sm rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative h-96 rounded-3xl border border-dashed border-white/20 flex flex-col items-center justify-center text-center bg-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50" />
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400 mb-6 z-10"
            >
              <Package size={40} />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 z-10">精彩作品即将呈现</h3>
            <p className="text-slate-400 mb-8 z-10">作品正在整理中，敬请期待...</p>
            <button onClick={() => navigate('/contact')} className="z-10 px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors">
              提交您的项目
            </button>
          </div>
        </div>
      </section>

      {/* 修改点：这里原本是客户评价，现在替换成了合作流程 */}
      <section id="process" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">合作流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: '需求沟通', time: '30min - 1h', desc: '详细沟通项目需求与期望' },
              { step: '02', title: '方案策划', time: '1-2 工作日', desc: 'AI 辅助生成多套创意方案' },
              { step: '03', title: '设计执行', time: '3-7 工作日', desc: '人工精修优化，完美落地' },
              { step: '04', title: '交付验收', time: '1 工作日', desc: '完整交付源文件及规范' },
            ].map((proc, idx) => (
              <div key={idx} className="relative p-6 rounded-xl bg-slate-900/50 border border-white/10 hover:border-indigo-500/30 transition-colors">
                <div className="text-5xl font-bold text-white/5 mb-4">{proc.step}</div>
                <h3 className="text-lg font-bold mb-2">{proc.title}</h3>
                <div className="text-indigo-400 text-xs font-mono mb-2">{proc.time}</div>
                <p className="text-slate-400 text-sm">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">常见问题</h2>
          <div className="space-y-4">
            {[
              { q: "AI 设计会完全取代人类设计师吗？", a: "不会。AI 是工具，不是替代品。我们的理念是'AI 赋能创作'——AI 负责处理重复性工作和快速生成创意方向，人类设计师负责策略思考、创意判断和最终精修。" },
              { q: "AI 生成的设计有版权问题吗？", a: "我们使用的都是商业授权的 AI 工具（如 Adobe Firefly、Midjourney 商业版等），并且所有 AI 生成的内容都会经过人类设计师的深度再创作。最终交付的作品版权 100% 归客户所有。" },
              { q: "使用 AI 设计会更便宜吗？", a: "AI 大幅提升了我们的效率，这部分红利我们会让利给客户。同等质量的设计，我们的价格比传统设计公司优惠 20-30%。" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>{item.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed pl-4">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 底部 CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">准备开始您的项目了吗？</h2>
          <p className="text-xl text-slate-300 mb-10">立即联系我们，获取免费咨询与报价</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold hover:bg-indigo-50 transition-colors">
              联系我们
            </button>
            <button onClick={() => document.getElementById('services')?.scrollIntoView()} className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
              查看服务
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- 页面：联系我们 ---
const ContactPage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText('15243527266');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const team: TeamMemberType[] = [
    { name: '罗小总', role: '创始人 & 创意总监', desc: '10+ 年品牌设计经验，AI 设计先行者，擅长将商业洞察转化为视觉创意。', tags: ['品牌战略', 'VI 系统', 'AI 设计'], quote: '设计不仅是美学，更是商业价值。', stats: '10+ 年经验 | 200+ 项目', image: 'https://placehold.co/400x400/6366f1/ffffff?text=Luo', contact: '15243527266' },
    { name: '黎小总', role: '首席 AI 架构师', desc: 'AI 技术狂热者，精通 MJ、SD、Runway。负责 AI 工作流开发与技术选型。', tags: ['模型训练', '自动化工作流', 'Prompt 工程'], quote: 'AI 是设计师的超能力放大器。', stats: '15+ AI工具 | 10x 效率', image: 'https://placehold.co/400x400/8b5cf6/ffffff?text=Li' },
    { name: '段小总', role: '资深视觉设计师', desc: '8+ 年设计经验，擅长包装与电商。精通 AI 生成 + 人工精修流程。', tags: ['包装设计', '电商视觉', 'AI 精修'], quote: '设计的最后一公里，仍需人类审美。', stats: '8+ 年经验 | 5+ 奖项', image: 'https://placehold.co/400x400/ec4899/ffffff?text=Duan' },
    { name: '黄小总', role: '项目交付经理', desc: '6+ 年项目管理经验，确保每个项目准时、保质、超预期完成。', tags: ['全流程管理', '质量把控', '风险应对'], quote: '超出预期的交付是终点。', stats: '200+ 交付 | 98% 满意', image: 'https://placehold.co/400x400/10b981/ffffff?text=Huang' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pt-20">
      <section className="py-20 px-4 text-center bg-slate-900/50">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">让我们一起创造</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          准备好用 AI 重新定义您的品牌了吗？<br/>我们的团队随时待命。
        </p>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-indigo-600 text-white relative overflow-hidden group shadow-lg shadow-indigo-500/20"
          >
            <div className="relative z-10">
              <MessageCircle className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-1">微信咨询</h3>
              <p className="text-indigo-200 text-sm mb-4">罗先生 · 工作日 9:00-21:00</p>
              <div className="text-2xl font-bold mb-6">15243527266</div>
              <button 
                onClick={handleCopyWeChat}
                className="w-full py-2 bg-white text-indigo-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
              >
                {copied ? <Check size={18}/> : null}
                {copied ? '已复制' : '复制微信号'}
              </button>
            </div>
          </motion.div>
          
          {[
            { icon: Mail, title: '业务合作', val: '2097726768@qq.com', action: '发送邮件', link: 'mailto:2097726768@qq.com' },
            { icon: Globe, title: '官方网站', val: 'haike-ai.zeabur.app', action: '访问网站', link: '#' },
            { 
              icon: MapPin, 
              title: '公司地址', 
              val: '中国 · 深圳市南山区', 
              action: '查看地图', 
              link: 'https://www.google.com/maps/place/Nanshan,+Shenzhen,+Guangdong+Province,+China/@22.5323869,113.8479532,12z' 
            },
          ].map((card, idx) => (
             <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx + 1) }}
                className="p-6 rounded-2xl bg-slate-900 border border-white/10 hover:border-indigo-500/50 transition-colors"
              >
                <card.icon className="w-8 h-8 text-indigo-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-slate-400 text-sm mb-6">{card.val}</p>
                <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  {card.action} <ArrowRight size={14} />
                </a>
             </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">核心团队</h2>
            <p className="text-slate-400">资深创意人 + AI 技术专家 + 项目管理专家的黄金组合</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all group"
              >
                <img src={member.image} alt={member.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border-2 border-indigo-500/20 group-hover:border-indigo-500 transition-colors" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-indigo-400 text-sm">{member.role}</p>
                    </div>
                    {member.contact && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/20">在线</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{member.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs rounded bg-white/10 text-slate-300">{tag}</span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/10 text-xs text-slate-500 italic">
                    "{member.quote}"
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- 主应用入口 ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;