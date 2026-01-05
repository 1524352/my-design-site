import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, ArrowRight } from 'lucide-react';

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground"
    };
    const sizes = {
      sm: "h-9 px-3 rounded-md text-xs",
      md: "h-10 px-4 py-2 rounded-md",
      lg: "h-11 px-8 rounded-md text-lg"
    };
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className || ''}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Navbar = ({ theme, toggleTheme }: { theme: 'dark' | 'light', toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-background/80 backdrop-blur-md border-border py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-mono">D</div>
          <span className="hidden sm:inline-block">DESIGN.AGENCY</span>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}</Button>
           <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern -z-10 opacity-[0.3]" />
      <div className="container mx-auto px-4 text-center z-10">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          We craft digital <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">experiences.</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
        >
          Award-winning design agency specializing in branding, motion, and digital products.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Button size="lg" className="mr-4">View Work <ArrowRight className="ml-2 w-4 h-4"/></Button>
          <Button size="lg" variant="outline">Contact Us</Button>
        </motion.div>
      </div>
      <motion.div style={{ y: y1 }} className="absolute top-1/3 left-[10%] -z-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
};

const App = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    root.classList.remove(theme);
    root.classList.add(newTheme);
    setTheme(newTheme);
  };
  useEffect(() => { window.document.documentElement.classList.add('dark'); }, []);

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
    </div>
  );
};

export default App;