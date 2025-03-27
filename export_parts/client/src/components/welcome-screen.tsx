import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function WelcomeScreen() {
  const { user } = useAuth();
  const [show, setShow] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  if (!show || !user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => setShow(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold gradient-heading animate-text-shimmer">
                {greeting}, {user.username}!
              </h2>
              <p className="mt-2 text-muted-foreground">
                Welcome back to your creative workspace
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid gap-4 p-4 text-left"
            >
              <div className="rounded-lg bg-primary/5 p-3">
                <h3 className="font-medium">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">
                  Your last campaign received 92% engagement
                </p>
              </div>
              <div className="rounded-lg bg-primary/5 p-3">
                <h3 className="font-medium">AI Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  Try our new neural avatar features for better audience connection
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                className="bg-primary/90 hover:bg-primary"
                onClick={() => setShow(false)}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
