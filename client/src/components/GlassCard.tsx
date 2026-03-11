import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glowColor?: "primary" | "secondary";
}

export function GlassCard({ children, className = "", delay = 0, glowColor = "primary" }: GlassCardProps) {
  const glowClass = glowColor === "primary" 
    ? "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]" 
    : "hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(188,19,254,0.15)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`glass-card rounded-2xl p-6 relative overflow-hidden group ${glowClass} ${className}`}
    >
      {/* Subtle background glow on hover */}
      <div className={`absolute -inset-20 bg-gradient-to-r ${glowColor === "primary" ? "from-primary/0 via-primary/5 to-primary/0" : "from-secondary/0 via-secondary/5 to-secondary/0"} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
