import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Discover from "@/pages/discover";
import DiscoverDetail from "@/pages/discover-detail";
import MyPage from "@/pages/mypage";
import Schedule from "@/pages/schedule";
import Community from "@/pages/community";
import Community1 from "@/pages/community1";
import Community2 from "@/pages/community2";
import Chat from "@/pages/chat";
import Onboarding from "@/pages/onboarding";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Onboarding} />
      <Route path="/home" component={Home} />

      <Route path="/discover/detail" component={DiscoverDetail} />
      <Route path="/discover" component={Discover} />

      <Route path="/mypage" component={MyPage} />

      {/* Schedule: /schedule, /schedule/, /schedule/anything */}
      <Route path="/schedule" component={Schedule} />
      <Route path="/schedule/" component={Schedule} />
      <Route path="/schedule/:rest*" component={Schedule} />

      {/* Temporary fallback: old create-schedule routes */}
      <Route path="/create-schedule" component={Schedule} />
      <Route path="/create-schedule/" component={Schedule} />
      <Route path="/create-schedule/:rest*" component={Schedule} />

      <Route path="/community" component={Community} />
      <Route path="/community1" component={Community1} />
      <Route path="/community2" component={Community2} />

      <Route path="/chat" component={Chat} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
