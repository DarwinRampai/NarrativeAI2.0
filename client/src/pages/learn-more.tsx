import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Cpu, Layers, LineChart, VideoIcon, Wand2 } from "lucide-react";
import { Link } from "wouter";

const Feature = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="relative overflow-hidden rounded-lg border bg-card/30 backdrop-blur-sm border-primary/10"
  >
    <div className="p-6">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
    <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
  </motion.div>
);

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            The Future of Advertising is Here
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover how NarratixAI is revolutionizing ad creation with cutting-edge AI technology and next-generation CGI.
          </p>
          <Link href="/early-access">
            <Button size="lg" className="bg-primary/90 hover:bg-primary">
              Get Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature
            icon={Brain}
            title="AI Script Generation"
            description="Our advanced AI understands your brand voice and creates compelling ad scripts that resonate with your target audience."
            delay={0.2}
          />
          <Feature
            icon={VideoIcon}
            title="CGI Video Creation"
            description="Transform scripts into stunning videos using state-of-the-art CGI and real-time rendering technology."
            delay={0.3}
          />
          <Feature
            icon={Wand2}
            title="Neural Avatars"
            description="Create lifelike digital spokespersons that perfectly represent your brand identity."
            delay={0.4}
          />
          <Feature
            icon={Layers}
            title="Dynamic Templates"
            description="Access a library of professional templates that adapt to your content and brand guidelines."
            delay={0.5}
          />
          <Feature
            icon={LineChart}
            title="Performance Analytics"
            description="Track and optimize your ad performance with real-time analytics and AI-driven insights."
            delay={0.6}
          />
          <Feature
            icon={Cpu}
            title="Smart Optimization"
            description="Let AI automatically optimize your ads for maximum engagement and conversion rates."
            delay={0.7}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <Card className="relative overflow-hidden bg-card/30 backdrop-blur-sm border-primary/10 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Ready to Transform Your Advertising?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join the next generation of AI-powered advertising creation.
              </p>
              <Link href="/auth">
                <Button size="lg" className="bg-primary/90 hover:bg-primary">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
