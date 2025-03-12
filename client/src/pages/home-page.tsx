import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">NarratixAI</h1>
        <div>
          {user ? (
            <Link href="/dashboard">
              <Button variant="secondary">Go to Dashboard</Button>
            </Link>
          ) : (
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl font-bold mb-6">
            Create Stunning Ads with AI
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Generate persuasive scripts, create professional videos, and optimize your
            advertising campaigns with the power of artificial intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-lg bg-card"
          >
            <h3 className="text-xl font-semibold mb-4">AI Script Generation</h3>
            <p className="text-muted-foreground">
              Generate persuasive ad scripts tailored to your brand voice and target audience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 rounded-lg bg-card"
          >
            <h3 className="text-xl font-semibold mb-4">Video Editor</h3>
            <p className="text-muted-foreground">
              Create professional videos using our library of templates and easy-to-use editor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 rounded-lg bg-card"
          >
            <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
            <p className="text-muted-foreground">
              Track performance metrics and optimize your campaigns in real-time.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
