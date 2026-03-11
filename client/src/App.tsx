import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Mentor from "./pages/Mentor";
import Radar from "./pages/Radar";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Avatar from "./pages/Avatar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/mentor" component={Mentor} />
      <Route path="/radar" component={Radar} />
      <Route path="/skill-gap" component={SkillGap} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/avatar" component={Avatar} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
