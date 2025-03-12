import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Sparkles, VideoIcon, Brain, Gauge, PenTool } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const loginForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-card/30 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl gradient-heading">
              Welcome to NarratixAI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-primary/90 hover:bg-primary" disabled={loginMutation.isPending}>
                      Login
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data))} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} className="bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-primary/90 hover:bg-primary" disabled={registerMutation.isPending}>
                      Register
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="hidden md:flex bg-primary items-center justify-center p-8">
        <div className="max-w-lg text-primary-foreground">
          <h1 className="text-4xl font-bold mb-6">AI-Powered Ad Creation Platform</h1>
          <ul className="space-y-6">
            <li className="flex items-center gap-3">
              <div className="feature-icon">
                <Brain className="feature-icon-inner" />
              </div>
              <span>Advanced AI script generation for persuasive content</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="feature-icon">
                <VideoIcon className="feature-icon-inner" />
              </div>
              <span>Professional video production with neural avatars</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="feature-icon">
                <PenTool className="feature-icon-inner" />
              </div>
              <span>Customizable templates and dynamic content</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="feature-icon">
                <Gauge className="feature-icon-inner" />
              </div>
              <span>Real-time performance analytics and optimization</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="feature-icon">
                <Sparkles className="feature-icon-inner" />
              </div>
              <span>AI-powered content enhancement and refinement</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}