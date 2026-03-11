import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { BrainCircuit, Compass, Radar, GraduationCap, Map, UserCircle } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Nexus", icon: BrainCircuit },
    { href: "/quiz", label: "Career Quiz", icon: Compass },
    { href: "/radar", label: "Opportunity Radar", icon: Radar },
    { href: "/skill-gap", label: "Skill Gap", icon: GraduationCap },
    { href: "/roadmap", label: "Roadmap", icon: Map },
    { href: "/avatar", label: "Future Avatar", icon: UserCircle },
    { href: "/mentor", label: "AI Mentor", icon: BrainCircuit },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full md:w-64 glass-panel border-r border-white/5 md:h-screen sticky top-0 z-50 flex flex-col"
      >
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:bg-primary/40 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.3)]">
              <BrainCircuit className="text-primary w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl neon-text tracking-wider">FutureTwin</h1>
              <span className="text-[10px] uppercase tracking-widest text-primary/70 font-bold">2035 Edition</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 pb-4 overflow-y-auto space-y-1 mt-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium whitespace-nowrap
                  ${isActive 
                    ? 'bg-primary/15 text-primary border border-primary/30 shadow-[inset_0_0_10px_rgba(0,243,255,0.1)]' 
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto hidden md:block">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-2xl rounded-full"></div>
            <p className="text-xs text-muted-foreground mb-2 relative z-10">System Status</p>
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_5px_rgba(0,243,255,1)]"></div>
              <span className="text-sm font-medium text-primary">Neural Link Active</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 relative min-h-screen pb-20 md:pb-0">
        {/* Glow effect at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-6xl mx-auto p-4 md:p-8 relative z-10 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
