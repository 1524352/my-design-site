import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, ChevronDown, ArrowRight, Zap, TrendingUp, Layers, Target, 
  Sparkles, Package, ShoppingBag, Camera, Video, Heart, MessageCircle, 
  Mail, Globe, MapPin, Check, ExternalLink, Star, Copy, Instagram, 
  Linkedin, Twitter 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- 工具函数 ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 组件：UI 基础组件 (模拟 shadcn/ui) ---
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'gradient', size?: 'sm' | 'md' | 'lg' }>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20",
      outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100",
      ghost: "hover:bg-slate-800 text-slate-300 hover:text-white",
      gradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/20",
    };
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };
    return (
      <button
        ref={ref}
        className={cn("inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none", variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Card = ({ className, children, hoverEffect = true }: { className?: string, children: React.ReactNode, hoverEffect?: boolean }) => (
  <motion.div
    whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.2)" } : {}}
    className={cn("rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 overflow-hidden relative group", className)}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("inline-flex items-center rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300", className)}>
    {children}
  </span>
);

// --- 组件：导航栏 ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '关于我们', href: '#about' },
    { name: '服务项目', href: '#services' },
    { name: '作品集', href: '#portfolio' },
    { name: '客户评价', href: '#testimonials' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn("fixed top-0 w-full z-50 transition-all duration-300", scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4" : "bg-transparent py-6")}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">
            AI
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">HAIKE AI STUDIO</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => handleNavClick(link.href)} className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
              {link.name}
            </button>
          ))}
          <Link to="/contact">
            <Button variant="gradient" size="sm">联系我们</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => handleNavClick(link.href)} className="text-left text-lg font-medium text-slate-300">
                  {link.name}
                </button>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="gradient" className="w-full">联系我们</Button>
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
  <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div>
          <div className="text-2xl font-bold tracking-tighter text-white mb-4">HAIKE AI STUDIO</div>
          <p className="text-slate-400 mb-2">AI 驱动的新一代创意机构</p>
          <p className="text-slate-500 text-sm">用 AI 解放创造力，让设计回归本质</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">快速链接</h4>
          <ul className="space-y-4 text-slate-400">
            {['关于我们', '服务项目', '作品集', '客户评价', '联系我们'].map(item => (
              <li key={item}><a href="#" className="hover:text-indigo-400 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">关注我们</h4>
          <div className="flex gap-4">
            {[Instagram, Linkedin, Twitter, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-600 text-sm">
        <p>HaiKe AI Studio © 2024 版权所有</p>
        <p>AI 遇见创意，智能重新定义设计</p>
      </div>
    </div>
  </footer>
);

// --- 页面：首页 ---
const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // 打字机效果 Hook
  const useTypewriter = (text: string, speed = 100) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }, [text, speed]);
    return displayText;
  };

  const titleText = useTypewriter("AI 遇见创意，智能重新定义设计", 80);

  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-8 border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
              <Sparkles size={12} className="mr-2" /> 新一代创意机构
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-tight min-h-[1.2em]">
              {titleText}
              <span className="animate-pulse text-indigo-500">_</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto font-light">
              AI 赋能创作，人类精雕细琢<br/>视觉设计的未来，从这里开始
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                查看作品 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg">联系我们</Button>
              </Link>
            </div>
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

      {/* 2. About & Stats */}
      <section id="about" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">关于 HaiKe AI Studio</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-12">
              我们是一家 AI 驱动的新一代创意机构，站在设计与科技的交叉路口。我们相信，AI 不是替代设计师，而是解放创造力。通过将前沿 AI 技术融入品牌设计、包装设计、电商视觉的全流程，我们让创意构思更快速、设计迭代更高效。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['AI 赋能创作', '人机协作共赢', '效率与品质并重', '数据驱动决策'].map((tag) => (
                <Badge key={tag} className="px-4 py-2 text-sm border-slate-700 bg-slate-900">
                  <Check size={14} className="mr-2 text-indigo-500" /> {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-900 pt-12">
            {[
              { num: '200+', label: 'AI 辅助项目' },
              { num: '500+', label: '完成作品' },
              { num: '85%', label: '设计效率提升', highlight: true },
              { num: '98%', label: '客户满意度' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={cn("text-4xl md:text-5xl font-bold mb-2", stat.highlight ? "text-indigo-500" : "text-white")}>
                  {stat.num}
                </div>
                <div className="text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI Philosophy Timeline */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">工作流革命</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white">AI 如何重新定义设计？</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {[
              { phase: '创意探索', old: '手绘草图耗时数天', new: 'AI 生成 100+ 创意方向，30分钟完成' },
              { phase: '执行制作', old: '重复劳动占据 70% 时间', new: 'AI 处理重复工作，设计师专注策略' },
              { phase: '迭代优化', old: '每轮迭代需 2-3 天', new: '实时调整参数，即刻呈现效果' },
              { phase: '决策支持', old: '凭经验判断', new: '数据分析趋势，AI 预测效果' },
            ].map((item, i) => (
              <Card key={i} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-9xl text-white">{i + 1}</div>
                <h3 className="text-xl font-bold text-white mb-6 relative z-10">{item.phase}</h3>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-start gap-3 opacity-60">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2" />
                    <div><span className="text-xs uppercase tracking-wider block text-slate-500">传统方式</span>{item.old}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shadow-[0_0_10px_rgba(99,102,241,1)]" />
                    <div className="text-white"><span className="text-xs uppercase tracking-wider block text-indigo-400">AI 赋能</span>{item.new}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-500 mb-6">我们的 AI 技术栈</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-400 font-mono text-sm opacity-70">
              {['Midjourney', 'DALL·E 3', 'Stable Diffusion', 'Adobe Firefly', 'Runway', 'ChatGPT', 'Claude'].map(tool => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services (Bento Grid) */}
      <section id="services" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">我们的服务</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: 'AI 辅助品牌设计', desc: 'AI 创意生成 + 人类设计师精修，品牌设计既快又准。', tags: ['Logo生成', '智能VI', '风格迁移'], highlight: '⚡ 时间缩短 80%' },
              { icon: Package, title: 'AI 驱动包装设计', desc: '数据驱动包装方案，实时 3D 渲染预览材质效果。', tags: ['趋势分析', '3D预览', '结构优化'], highlight: '🎯 1000+ 竞品分析' },
              { icon: ShoppingBag, title: 'AI 电商设计', desc: '自动生成详情页、智能抠图，效率提升 10 倍。', tags: ['详情页', '智能抠图', '批量处理'], highlight: '🚀 周期 3天 → 3小时' },
              { icon: Camera, title: 'AI 增强摄影', desc: '智能修图、精准调色、场景扩展，每张都是大片。', tags: ['智能修图', '场景扩展', '精准调色'], highlight: '✨ 天级 → 小时级' },
              { icon: Video, title: 'AI 视频制作', desc: '自动剪辑、智能配乐、一键字幕，短视频快人一步。', tags: ['自动剪辑', '智能配乐', '风格滤镜'], highlight: '⏱️ 周级 → 天级' },
              { icon: Heart, title: 'AI 辅助婚纱摄影', desc: '实时预览风格、生成虚拟梦幻场景。', tags: ['风格预览', '虚拟场景', '自动精修'], highlight: '🌟 影棚穿越全球' },
            ].map((s, i) => (
              <Card key={i} className="flex flex-col h-full hover:border-indigo-500/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                  <s.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 mb-6 flex-grow">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.tags.map(t => <Badge key={t} className="bg-slate-800 border-transparent text-slate-500">{t}</Badge>)}
                </div>
                <div className="pt-4 border-t border-slate-800 text-sm font-semibold text-indigo-400 flex items-center gap-2">
                  {s.highlight}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Advantages (Big Numbers) */}
      <section className="py-24 bg-indigo-950/20 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, num: '10x', title: '效率提升', desc: 'AI 处理重复工作' },
              { icon: TrendingUp, num: '85%', title: '时间节省', desc: '大幅缩短制作周期' },
              { icon: Layers, num: '100+', title: '方案选择', desc: '海量创意方向' },
              { icon: Target, num: '🎯', title: '数据驱动', desc: '精准命中市场趋势' },
            ].map((adv, i) => (
              <div key={i} className="text-center group">
                <div className="mb-4 inline-flex p-3 rounded-full bg-slate-900 group-hover:bg-indigo-600 transition-colors text-slate-400 group-hover:text-white">
                  <adv.icon size={24} />
                </div>
                <div className="text-5xl font-black text-white mb-2">{adv.num}</div>
                <div className="text-lg font-bold text-indigo-400 mb-2">{adv.title}</div>
                <p className="text-slate-500 text-sm">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Portfolio (Empty State) */}
      <section id="portfolio" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">我们的作品</h2>
              <p className="text-slate-400">AI 创意落地实战案例</p>
            </div>
            <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {['全部', '品牌', '包装', '电商', '视频'].map((filter, i) => (
                <button key={filter} className={cn("px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors", i === 0 ? "bg-white text-slate-900" : "bg-slate-900 text-slate-400 hover:text-white")}>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[400px] rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 mb-6 animate-pulse">
              <Palette size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">精彩作品即将呈现</h3>
            <p className="text-slate-400 mb-8 max-w-md">我们正在整理最新的 AI 辅助设计案例，包括品牌升级、电商视觉大片等。敬请期待...</p>
            <Link to="/contact">
              <Button variant="outline">提交您的项目，成为我们的首批案例</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">客户怎么说</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "原本需要一周的品牌方案，他们 2 天就交付了 10 套高质量方案。AI + 人类设计师的组合太强了！", author: "张明", role: "创始人 @ 新消费品牌", tag: "品牌设计" },
              { text: "电商详情页转化率提升了 40%，现在当天就能出 5 个版本方案，投资回报率太高了。", author: "王强", role: "电商负责人 @ 淘系大店", tag: "电商设计" },
            ].map((t, i) => (
              <Card key={i} className="bg-slate-950">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex justify-between items-end border-t border-slate-800 pt-6">
                  <div>
                    <div className="text-white font-bold">{t.author}</div>
                    <div className="text-slate-500 text-sm">{t.role}</div>
                  </div>
                  <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">{t.tag}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">常见问题</h2>
          <div className="space-y-4">
            {[
              { q: "AI 设计会取代人类设计师吗？", a: "不会。AI 是工具，不是替代品。我们的理念是'AI 赋能创作'——AI 负责重复性工作和快速生成，人类设计师负责策略思考和创意精修。" },
              { q: "AI 生成的设计有版权问题吗？", a: "我们使用商业授权的 AI 工具，并经过人类设计师深度再创作。最终交付作品版权 100% 归客户所有，可放心商用。" },
              { q: "使用 AI 设计会更便宜吗？", a: "是的。AI 提升了效率，我们将红利让利给客户。同等质量下，我们的价格比传统公司优惠 20-30%，且交付更快。" },
            ].map((faq, i) => (
              <details key={i} className="group rounded-xl bg-slate-900 border border-slate-800 open:border-indigo-500/50 transition-colors">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-white marker:content-none">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180 text-slate-500" />
                </summary>
                <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">准备开始您的项目了吗？</h2>
          <p className="text-xl text-indigo-200 mb-10">立即联系我们，获取免费咨询与报价</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-slate-100 shadow-xl">联系我们</Button>
            </Link>
            <Button variant="outline" size="lg" className="border-indigo-400 text-indigo-100 hover:bg-indigo-800/50" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              查看服务
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- 页面：联系我们 ---
const ContactPage = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Contact Hero */}
      <div className="container mx-auto px-6 py-16 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">让我们一起创造</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">我们的团队随时待命，将您的创意想法转化为惊艳的视觉作品</p>
        </motion.div>
      </div>

      {/* Contact Cards */}
      <div className="container mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">联系方式</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WeChat - Highlighted */}
          <Card className="border-indigo-500/50 bg-indigo-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2"><Badge className="bg-green-500/20 text-green-400 border-green-500/20 animate-pulse">🟢 在线</Badge></div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-4">
              <MessageCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">微信咨询</h3>
            <p className="text-indigo-300 font-mono text-lg mb-2">15243527266</p>
            <p className="text-sm text-slate-400 mb-6">罗先生 | 9:00-21:00</p>
            <Button onClick={() => handleCopy('15243527266')} className="w-full bg-green-600 hover:bg-green-700 text-white">
              {copied ? '已复制' : <><Copy size={16} className="mr-2" /> 复制微信号</>}
            </Button>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">业务合作</h3>
            <p className="text-slate-400 text-sm mb-6 break-all">2097726768@qq.com</p>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = 'mailto:2097726768@qq.com'}>发送邮件</Button>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-purple-400 mb-4">
              <Globe size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">官方网站</h3>
            <p className="text-slate-400 text-sm mb-6">haike-ai.zeabur.app</p>
            <Button variant="outline" className="w-full" onClick={() => window.open('https://haike-ai.zeabur.app', '_blank')}>访问网站</Button>
          </Card>

          <Card>
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-pink-400 mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">公司地址</h3>
            <p className="text-slate-400 text-sm mb-6">中国 · 深圳市南山区</p>
            <Button variant="outline" className="w-full">查看地图</Button>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-slate-900 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">核心团队</h2>
            <p className="text-slate-400">资深创意人 + AI 技术专家的黄金组合</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { 
                name: '罗小总', role: '创始人 & 创意总监', 
                img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
                desc: '10+ 年品牌设计经验，AI 设计先行者。擅长将商业洞察转化为视觉创意。',
                tags: ['品牌战略', 'VI系统', 'AI辅助'],
                quote: '设计不仅是美学表达，更是商业价值的视觉化呈现。',
                data: '200+ 项目'
              },
              { 
                name: '黎小总', role: '首席 AI 架构师', 
                img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
                desc: 'AI 技术狂热者，负责 AI 工作流开发。精通 Midjourney、Stable Diffusion。',
                tags: ['模型训练', '自动化', 'Prompt工程'],
                quote: 'AI 是设计师的超能力放大器。',
                data: '10x 效率'
              },
              { 
                name: '段小总', role: '资深视觉设计师', 
                img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
                desc: '擅长包装设计、电商视觉。精通 AI 生成 + 人工精修流程。',
                tags: ['包装设计', '电商视觉', '图像精修'],
                quote: 'AI 给我 100 种可能，我选出最好的那一个。',
                data: '100+ 包装'
              },
              { 
                name: '黄小总', role: '项目交付经理', 
                img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400',
                desc: '6+ 年项目管理经验，确保每个项目准时、保质、超预期完成。',
                tags: ['全流程管理', '质量把控', '敏捷开发'],
                quote: '交付不仅是完成，更是超越期待。',
                data: '0 延期'
              },
            ].map((member, i) => (
              <Card key={i} className="group flex flex-col sm:flex-row gap-6 items-start">
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-700 group-hover:border-indigo-500 transition-colors" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <div className="text-indigo-400 text-sm font-medium">{member.role}</div>
                    </div>
                    <div className="text-slate-600 font-mono text-xs border border-slate-800 px-2 py-1 rounded">{member.data}</div>
                  </div>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{member.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.tags.map(t => <span key={t} className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded">{t}</span>)}
                  </div>
                  <div className="text-xs text-slate-500 italic border-l-2 border-slate-700 pl-3">"{member.quote}"</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 主应用入口 ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
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