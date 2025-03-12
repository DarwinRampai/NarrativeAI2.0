import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import Dashboard from "@/pages/dashboard";
import ScriptGenerator from "@/pages/script-generator";
import VideoEditor from "@/pages/video-editor";
import Settings from "@/pages/settings";
import AuthPage from "@/pages/auth-page";
import EarlyAccess from "@/pages/early-access";
import LearnMore from "@/pages/learn-more";
import AvatarsPage from "@/pages/avatars";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/early-access" component={EarlyAccess} />
      <Route path="/learn-more" component={LearnMore} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/script-generator" component={ScriptGenerator} />
      <ProtectedRoute path="/avatars" component={AvatarsPage} />
      <ProtectedRoute path="/video-editor" component={VideoEditor} />
      <ProtectedRoute path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;