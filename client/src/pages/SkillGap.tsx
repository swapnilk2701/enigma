import { useState } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";
import { useAnalyzeSkillGap } from "@/hooks/use-ai";
import { AlertCircle, Target, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SkillGap() {
  const [targetCareer, setTargetCareer] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  
  const analyzeGap = useAnalyzeSkillGap();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCareer || !currentSkills) return;

    analyzeGap.mutate({
      targetCareer,
      currentSkills: currentSkills.split(",").map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="mb-10">
          <h1 className="text-4xl font-display font-bold neon-text mb-4">Skill Gap Analysis</h1>
          <p className="text-muted-foreground text-lg">Compare your current baseline against future requirements.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <GlassCard className="lg:col-span-2 h-fit">
            <form onSubmit={handleAnalyze} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary flex items-center gap-2">
                  <Target className="w-4 h-4" /> Target 2035 Career
                </label>
                <input 
                  type="text"
                  value={targetCareer}
                  onChange={e => setTargetCareer(e.target.value)}
                  placeholder="e.g. Quantum AI Architect"
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Current Skill Arsenal</label>
                <textarea 
                  value={currentSkills}
                  onChange={e => setCurrentSkills(e.target.value)}
                  placeholder="Python, math, writing..."
                  className="w-full h-32 bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={analyzeGap.isPending || !targetCareer || !currentSkills}
                className="w-full py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {analyzeGap.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Target className="w-5 h-5" />}
                {analyzeGap.isPending ? "Computing Delta..." : "Analyze Delta"}
              </button>
            </form>
          </GlassCard>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {analyzeGap.data ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                <GlassCard glowColor="secondary" className="border-secondary/30">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-6 h-6 text-secondary" />
                    <h3 className="text-xl font-bold text-secondary">Missing Critical Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {analyzeGap.data.missingSkills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-md bg-secondary/10 border border-secondary/30 text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-primary">Strategic Recommendations</h3>
                  </div>
                  <ul className="space-y-4">
                    {analyzeGap.data.improvementSuggestions.map((suggestion, i) => (
                      <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed text-muted-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ) : (
              <div className="h-full min-h-[300px] flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl text-muted-foreground/50 text-center p-8">
                <div>
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Awaiting input parameters to calculate competency delta.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
