import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomeScreen } from "@/components/welcome-screen";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import Dashboard from "@/pages/dashboard";
import Settings from "@/pages/settings";
import AuthPage from "@/pages/auth-page";
import EarlyAccess from "@/pages/early-access";
import LearnMore from "@/pages/learn-more";
import AvatarsPage from "@/pages/avatars";
import AutonomousAds from "@/pages/autonomous-ads";
import CreateAd from "@/pages/create-ad";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/early-access" component={EarlyAccess} />
            <Route path="/learn-more" component={LearnMore} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/avatars" component={AvatarsPage} />
            <ProtectedRoute path="/autonomous-ads" component={AutonomousAds} />
            <ProtectedRoute path="/create-ad" component={CreateAd} />
            <ProtectedRoute path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
      <WelcomeScreen />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;