import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, Shield, Sparkles, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically submit to a waitlist API
    toast({
      title: "Success!",
      description: "You've been added to our early access waitlist.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-5xl font-bold tracking-tight mb-6 gradient-heading">
            Be Among the First to Experience NarratixAI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our exclusive early access program and transform your advertising with next-generation AI technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-hover">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary/90 hover:bg-primary">
                    Join Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="feature-icon">
                <Star className="feature-icon-inner" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Exclusive Benefits</h3>
                <p className="text-muted-foreground">
                  Early access members receive premium features, priority support, and special pricing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="feature-icon">
                <Shield className="feature-icon-inner" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Get personalized onboarding and direct access to our product team.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="feature-icon">
                <Sparkles className="feature-icon-inner" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Shape the Future</h3>
                <p className="text-muted-foreground">
                  Influence product development and be part of our innovation journey.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}