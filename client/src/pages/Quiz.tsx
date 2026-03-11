import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";
import { useSubmitQuiz } from "@/hooks/use-ai";
import { ArrowRight, Loader2, Target, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { getOrCreateSessionId } from "@/lib/session";
import { useCreateSession, useUpdateSession } from "@/hooks/use-sessions";

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    interests: "",
    skills: "",
    workStyle: "hybrid",
    education: "bachelors"
  });

  const sessionId = getOrCreateSessionId();
  const createSession = useCreateSession();
  const updateSession = useUpdateSession();
  const submitQuiz = useSubmitQuiz();

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    // Fire and forget session creation just in case it doesn't exist
    createSession.mutate(sessionId);

    const payload = {
      interests: formData.interests.split(",").map(s => s.trim()).filter(Boolean),
      skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
      workStyle: formData.workStyle,
      education: formData.education
    };

    submitQuiz.mutate(payload, {
      onSuccess: (data) => {
        updateSession.mutate({ id: sessionId, quizData: data });
      }
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="mb-10">
          <h1 className="text-4xl font-display font-bold neon-text mb-4">Discovery Protocol</h1>
          <p className="text-muted-foreground text-lg">Input your current parameters to simulate future career trajectories.</p>
        </header>

        {!submitQuiz.isSuccess ? (
          <GlassCard className="p-8">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500 shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
              {[1, 2, 3, 4].map(num => (
                <div 
                  key={num} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 font-bold
                    ${step >= num ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'bg-card border-2 border-white/20 text-muted-foreground'}
                  `}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="min-h-[300px]">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">What drives you?</h2>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">List your interests (comma separated)</label>
                    <textarea 
                      value={formData.interests}
                      onChange={e => setFormData({...formData, interests: e.target.value})}
                      placeholder="e.g. Space exploration, artificial intelligence, helping people, sustainability..."
                      className="w-full h-32 bg-background/50 border border-white/10 rounded-xl p-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Your Current Arsenal</h2>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">List your current skills (comma separated)</label>
                    <textarea 
                      value={formData.skills}
                      onChange={e => setFormData({...formData, skills: e.target.value})}
                      placeholder="e.g. Python, project management, data analysis, public speaking..."
                      className="w-full h-32 bg-background/50 border border-white/10 rounded-xl p-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Work Environment</h2>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Preferred paradigm</label>
                    <select 
                      value={formData.workStyle}
                      onChange={e => setFormData({...formData, workStyle: e.target.value})}
                      className="w-full bg-background/50 border border-white/10 rounded-xl p-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 appearance-none"
                    >
                      <option value="remote">Fully Remote (Global Grid)</option>
                      <option value="hybrid">Hybrid (Physical/Digital Mix)</option>
                      <option value="onsite">On-Site (Laboratory/Field)</option>
                      <option value="nomad">Digital Nomad</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Current Base Level</h2>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Educational Background</label>
                    <select 
                      value={formData.education}
                      onChange={e => setFormData({...formData, education: e.target.value})}
                      className="w-full bg-background/50 border border-white/10 rounded-xl p-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 appearance-none"
                    >
                      <option value="highschool">High School / Self-Taught</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD / Doctorate</option>
                      <option value="bootcamp">Bootcamp / Specialized Training</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              <button 
                onClick={handleBack}
                disabled={step === 1 || submitQuiz.isPending}
                className="px-6 py-3 rounded-xl font-semibold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Back
              </button>
              
              {step < 4 ? (
                <button 
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all flex items-center gap-2"
                >
                  Next Stage <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={submitQuiz.isPending}
                  className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_20px_rgba(188,19,254,0.4)] hover:shadow-[0_0_30px_rgba(188,19,254,0.6)] hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  {submitQuiz.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  {submitQuiz.isPending ? "Simulating..." : "Generate Predictions"}
                </button>
              )}
            </div>
          </GlassCard>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Simulation Complete
              </h2>
              <p className="text-muted-foreground">Based on your parameters, here are your high-probability optimal trajectories for 2035.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {submitQuiz.data?.map((career, i) => (
                <GlassCard key={i} delay={i * 0.1} className="flex flex-col h-full">
                  <h3 className="text-xl font-bold font-display mb-2">{career.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">{career.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-white/5">
                      <span className="text-xs text-muted-foreground">Demand Level</span>
                      <span className="text-sm font-bold text-primary">{career.demandLevel}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-white/5">
                      <span className="text-xs text-muted-foreground">Est. Salary (2035)</span>
                      <span className="text-sm font-bold text-secondary">{career.salaryRange}</span>
                    </div>
                    
                    <div>
                      <span className="text-xs text-muted-foreground block mb-2">Key Requirements</span>
                      <div className="flex flex-wrap gap-2">
                        {career.requiredSkills.map(skill => (
                          <span key={skill} className="text-[10px] px-2 py-1 rounded border border-primary/30 text-primary bg-primary/5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <button 
                onClick={() => submitQuiz.reset()}
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors"
              >
                Run Another Simulation
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
