import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";
import { useSendMessage, useChatHistory } from "@/hooks/use-ai";
import { getOrCreateSessionId } from "@/lib/session";
import { Send, Bot, User, Loader2 } from "lucide-react";

export default function Mentor() {
  const sessionId = getOrCreateSessionId();
  const { data: history, isLoading: isHistoryLoading } = useChatHistory(sessionId);
  const sendMessage = useSendMessage();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, sendMessage.isPending]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sendMessage.isPending) return;

    sendMessage.mutate({ sessionId, message: input });
    setInput("");
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-4rem)] flex flex-col max-w-4xl mx-auto pt-4 md:pt-0">
        <header className="mb-6 shrink-0">
          <h1 className="text-3xl font-display font-bold neon-text">AI Career Mentor</h1>
          <p className="text-muted-foreground">Direct link to the 2035 knowledge network.</p>
        </header>

        <GlassCard className="flex-1 flex flex-col overflow-hidden p-0 rounded-2xl border-white/10">
          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            {isHistoryLoading ? (
              <div className="flex items-center justify-center h-full text-primary">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : history?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                <Bot className="w-16 h-16 mb-4" />
                <p>Connection established. Awaiting your query.</p>
              </div>
            ) : (
              history?.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  
                  <div className={`
                    max-w-[80%] rounded-2xl px-5 py-3 
                    ${msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-sm shadow-[0_0_15px_rgba(0,243,255,0.2)]' 
                      : 'bg-white/5 border border-white/10 rounded-bl-sm text-foreground'
                    }
                  `}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/50 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-secondary" />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Loading Indicator for active request */}
            {sendMessage.isPending && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-5 py-4 flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-4 bg-background/50 border-t border-white/10 shrink-0">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about industries, skills, or your future path..."
                className="w-full bg-card border border-white/10 rounded-full pl-6 pr-14 py-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                disabled={sendMessage.isPending}
              />
              <button 
                type="submit"
                disabled={!input.trim() || sendMessage.isPending}
                className="absolute right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
}
