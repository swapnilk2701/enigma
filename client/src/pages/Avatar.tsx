import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";
import { useSession } from "@/hooks/use-sessions";
import { useGenerateAvatar } from "@/hooks/use-ai";
import { UserCircle, Fingerprint, Award, Shield, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Avatar() {
  const { data: session } = useSession();
  const generateAvatar = useGenerateAvatar();

  const hasQuizData = !!session?.quizData;

  const handleGenerate = () => {
    if (!session?.quizData) return;
    
    // In a real app we might ask them to pick ONE of the careers from quizData
    // For now we'll pick the first one
    const selectedCareer = session.quizData[0]?.title || "Future Innovator";
    
    generateAvatar.mutate({
      quizData: {
        interests: ["Based on previous quiz"],
        skills: ["Based on previous quiz"],
        workStyle: "hybrid",
        education: "advanced",
      },
      selectedCareer
    });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            Future Identity Interface
          </h1>
          <p className="text-muted-foreground text-lg">Generate your 2035 professional avatar based on your simulation data.</p>
        </header>

        {!hasQuizData ? (
          <GlassCard className="text-center py-16">
            <Fingerprint className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Base Data Found</h3>
            <p className="text-muted-foreground mb-6">You need to run the Career Discovery Quiz before generating your future avatar.</p>
            <Link href="/quiz">
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:bg-primary/90 transition-all">
                Run Discovery Quiz
              </button>
            </Link>
          </GlassCard>
        ) : !generateAvatar.data ? (
          <div className="text-center py-16">
             <button 
                onClick={handleGenerate}
                disabled={generateAvatar.isPending}
                className="px-10 py-5 rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_30px_rgba(188,19,254,0.3)] hover:scale-105 hover:shadow-[0_0_50px_rgba(188,19,254,0.5)] transition-all flex items-center gap-3 mx-auto text-lg"
              >
                {generateAvatar.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                {generateAvatar.isPending ? "Synthesizing Identity..." : "Materialize Avatar"}
              </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* ID Card Left Panel */}
            <GlassCard glowColor="primary" className="md:col-span-1 border-primary/40 shadow-[0_0_30px_rgba(0,243,255,0.1)] flex flex-col items-center text-center p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-30"><Fingerprint className="w-8 h-8" /></div>
              
              {/* Holographic Avatar Base */}
              <div className="w-32 h-32 rounded-full border-4 border-primary/50 p-1 mb-6 relative group">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse"></div>
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center relative z-10 border border-primary overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center">
                     <UserCircle className="w-16 h-16 text-primary/70" />
                   </div>
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <h2 className="text-2xl font-display font-bold uppercase tracking-wider neon-text">ID: 2035-AX</h2>
                <p className="text-primary text-sm font-bold uppercase tracking-[0.2em]">Verified Professional</p>
              </div>

              <div className="w-full space-y-3 text-left bg-background/50 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Clearance</span>
                  <span className="text-secondary font-bold font-mono">LEVEL 9</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-green-400 font-bold">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Sync</span>
                  <span className="text-primary font-bold">100%</span>
                </div>
              </div>
            </GlassCard>

            {/* Profile Data Right Panel */}
            <div className="md:col-span-2 space-y-6">
              <GlassCard>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Identity Synthesis</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {generateAvatar.data.profileDescription}
                </p>
              </GlassCard>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <GlassCard delay={0.1}>
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-secondary" />
                    <h3 className="font-bold">Key Achievements</h3>
                  </div>
                  <ul className="space-y-3">
                    {generateAvatar.data.achievements.map((acc, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5 shadow-[0_0_5px_rgba(188,19,254,0.5)]"></div>
                        {acc}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard delay={0.2} className="bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-primary">Global Impact</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{generateAvatar.data.impact}"
                  </p>
                </GlassCard>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
