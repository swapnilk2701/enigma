import { useState } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";
import { useGenerateRoadmap } from "@/hooks/use-ai";
import { Map, Loader2, Play, Calendar, Milestone } from "lucide-react";
import { motion } from "framer-motion";

export default function Roadmap() {
  const [targetCareer, setTargetCareer] = useState("");
  const [missingSkills, setMissingSkills] = useState("");
  const generateRoadmap = useGenerateRoadmap();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCareer) return;

    generateRoadmap.mutate({
      targetCareer,
      missingSkills: missingSkills.split(",").map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-display font-bold neon-text mb-4">Learning Roadmap Generator</h1>
          <p className="text-muted-foreground text-lg">Plot the exact coordinates to your future career.</p>
        </header>

        {!generateRoadmap.data ? (
          <GlassCard className="max-w-xl mx-auto p-8 border-primary/20">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Target Profession</label>
                <input 
                  type="text"
                  value={targetCareer}
                  onChange={e => setTargetCareer(e.target.value)}
                  placeholder="e.g. Neural Link Engineer"
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Skills to Acquire (Optional)</label>
                <input 
                  type="text"
                  value={missingSkills}
                  onChange={e => setMissingSkills(e.target.value)}
                  placeholder="Brain-computer interfaces, ethics..."
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                />
                <p className="text-xs text-white/40">Tip: Get these from the Skill Gap Analysis tool first.</p>
              </div>

              <button 
                type="submit"
                disabled={generateRoadmap.isPending || !targetCareer}
                className="w-full py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-2 mt-8 disabled:opacity-50"
              >
                {generateRoadmap.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Map className="w-5 h-5" />}
                {generateRoadmap.isPending ? "Plotting Course..." : "Generate Neural Roadmap"}
              </button>
            </form>
          </GlassCard>
        ) : (
          <div className="space-y-12">
            <div className="flex justify-between items-center bg-card/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg"><Map className="text-primary w-5 h-5" /></div>
                <span className="font-bold font-display text-xl">{targetCareer}</span>
              </div>
              <button 
                onClick={() => generateRoadmap.reset()}
                className="text-xs px-4 py-2 border border-white/20 rounded hover:bg-white/10 transition-colors"
              >
                New Route
              </button>
            </div>

            <div className="relative pl-8 md:pl-0">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-background -translate-x-1/2"></div>
              
              {generateRoadmap.data.steps.map((step, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  key={i} 
                  className={`relative flex items-center mb-12 md:justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)] z-10">
                    <Milestone className="w-4 h-4 text-primary" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full pl-8 md:pl-0 md:w-[45%]">
                    <GlassCard className="hover:scale-[1.02] transition-transform">
                      <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{step.estimatedTime}</span>
                      </div>
                      <h3 className="text-xl font-bold font-display mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </GlassCard>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center pt-8">
              <button className="px-8 py-4 bg-white/5 border border-white/20 rounded-full text-sm hover:bg-white/10 transition-all inline-flex items-center gap-2">
                <Play className="w-4 h-4" /> Begin Phase 1 Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
