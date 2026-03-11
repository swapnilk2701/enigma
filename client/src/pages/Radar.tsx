import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Zap, Activity, Cpu, Leaf, Stethoscope, Rocket } from "lucide-react";

// Mock data since this is a visual dashboard page per instructions
const industryData = [
  { subject: 'Artificial Intelligence', A: 98, fullMark: 100 },
  { subject: 'Space Technology', A: 85, fullMark: 100 },
  { subject: 'Climate Tech', A: 95, fullMark: 100 },
  { subject: 'Robotics', A: 90, fullMark: 100 },
  { subject: 'Renewable Energy', A: 88, fullMark: 100 },
  { subject: 'Digital Healthcare', A: 92, fullMark: 100 },
];

const cards = [
  { title: "Artificial Intelligence", icon: Cpu, desc: "AGI development, ethics framing, and neural architecture.", color: "text-primary", bg: "bg-primary/10" },
  { title: "Climate Technology", icon: Leaf, desc: "Carbon capture, atmospheric terraforming, and eco-systems.", color: "text-green-400", bg: "bg-green-400/10" },
  { title: "Robotics", icon: Zap, desc: "Automated workforce management and synthetic integration.", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { title: "Space Technology", icon: Rocket, desc: "Orbital logistics, asteroid mining, and habitat engineering.", color: "text-secondary", bg: "bg-secondary/10" },
  { title: "Digital Healthcare", icon: Stethoscope, desc: "Genomic editing, nano-medicine, and bio-printing.", color: "text-pink-400", bg: "bg-pink-400/10" },
  { title: "Renewable Energy", icon: Activity, desc: "Fusion containment, smart grids, and zero-loss transmission.", color: "text-blue-400", bg: "bg-blue-400/10" }
];

export default function OpportunityRadar() {
  return (
    <Layout>
      <div className="space-y-8">
        <header className="mb-10">
          <h1 className="text-4xl font-display font-bold neon-text mb-4">Opportunity Radar</h1>
          <p className="text-muted-foreground text-lg">Visualizing the 2035 high-demand macro sectors.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Radar Chart Panel */}
          <GlassCard className="col-span-1 lg:col-span-2 h-[500px] flex flex-col">
            <h3 className="font-display font-bold text-xl mb-6">Growth Vector Analysis</h3>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={industryData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'var(--font-sans)' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Demand Index"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(0,243,255,0.3)', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--primary))' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Quick Stats Panel */}
          <div className="space-y-4 flex flex-col justify-between">
            <GlassCard delay={0.1} glowColor="secondary" className="flex-1 border-secondary/20">
              <h4 className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">Highest Volatility</h4>
              <p className="text-3xl font-display font-bold text-secondary neon-text-secondary">Space Tech</p>
              <p className="text-xs mt-2 text-white/60">+340% projected growth by 2030</p>
            </GlassCard>
            
            <GlassCard delay={0.2} className="flex-1">
              <h4 className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">Most Stable</h4>
              <p className="text-3xl font-display font-bold text-primary neon-text">AI Systems</p>
              <p className="text-xs mt-2 text-white/60">Core infrastructure layer for all other sectors</p>
            </GlassCard>

            <GlassCard delay={0.3} className="flex-1 border-white/10">
              <h4 className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">Global Investment</h4>
              <p className="text-3xl font-display font-bold">$14.2T</p>
              <p className="text-xs mt-2 text-white/60">Estimated capital flow by 2035</p>
            </GlassCard>
          </div>
        </div>

        {/* Industry Cards */}
        <h3 className="font-display font-bold text-2xl mt-12 mb-6">Sector Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <GlassCard key={i} delay={0.4 + (i * 0.1)} className="group cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h4 className="font-bold font-display text-lg">{card.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </Layout>
  );
}
