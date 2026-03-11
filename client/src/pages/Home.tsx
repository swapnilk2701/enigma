import { Link } from "wouter";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { ArrowRight, Sparkles, BrainCircuit, Radar, Zap } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 py-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary text-sm font-medium mb-4 shadow-[0_0_15px_rgba(0,243,255,0.15)]">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to the Year 2035</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
            Meet Your Future Self & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary neon-text">
              Build the Roadmap.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage predictive AI to discover tomorrow's high-demand careers, analyze your skill gaps, and generate a step-by-step evolution path to your ideal 2035 avatar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <Link href="/quiz">
            <GlassCard delay={0.2} className="h-full flex flex-col items-center text-center cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">Start Career Quiz</h3>
              <p className="text-muted-foreground text-sm flex-1 mb-6">
                Discover which futuristic roles match your current skills and passions.
              </p>
              <div className="mt-auto flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                <span>Launch Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </GlassCard>
          </Link>

          <Link href="/mentor">
            <GlassCard delay={0.3} glowColor="secondary" className="h-full flex flex-col items-center text-center cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(188,19,254,0.2)]">
                <BrainCircuit className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">Talk to AI Mentor</h3>
              <p className="text-muted-foreground text-sm flex-1 mb-6">
                Get real-time advice from our advanced career intelligence system.
              </p>
              <div className="mt-auto flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all">
                <span>Initiate Chat</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </GlassCard>
          </Link>

          <Link href="/radar">
            <GlassCard delay={0.4} className="h-full flex flex-col items-center text-center cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                <Radar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">Explore Industries</h3>
              <p className="text-muted-foreground text-sm flex-1 mb-6">
                Scan the 2035 horizon for emerging sectors like Climate Tech and AI.
              </p>
              <div className="mt-auto flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                <span>Open Radar</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </GlassCard>
          </Link>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      </div>
    </Layout>
  );
}
