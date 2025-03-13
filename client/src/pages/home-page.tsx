import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Cpu, VideoIcon, Shield, Database, Network, BarChart, Globe2, Lock } from "lucide-react";
import { MainLayout } from "@/layouts/main";
//The above line is updated

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="relative overflow-hidden rounded-lg border bg-card/30 backdrop-blur-sm"
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

const EnterpriseFeature = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-4 p-6 rounded-lg bg-card/30 backdrop-blur-sm border">
    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function HomePage() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            NarratixAI
          </h1>
          <div>
            {user ? (
              <Button asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild className="bg-primary/90 hover:bg-primary">
                <Link href="/auth">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </nav>

        <main className="container mx-auto px-6 py-12">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary/30 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
              </div>

              <h1 className="text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Revolutionizing Ad Creation with AI & Next-Gen CGI
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Generate persuasive scripts, create professional videos, and optimize your
                advertising campaigns with the power of artificial intelligence.
              </p>

              <div className="flex gap-4 justify-center mb-20">
                <Button asChild size="lg" className="bg-primary/90 hover:bg-primary">
                  <Link href="/early-access">
                    Get Early Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/learn-more">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <div id="features" className="grid md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              icon={Cpu}
              title="AI Script Generation"
              description="Generate persuasive ad scripts tailored to your brand voice and target audience."
              delay={0.2}
            />
            <FeatureCard
              icon={VideoIcon}
              title="Next-Gen CGI Videos"
              description="Create stunning videos with AI-powered CGI and real-time rendering."
              delay={0.4}
            />
            <FeatureCard
              icon={Code}
              title="Smart Optimization"
              description="Automatically optimize your ads for maximum engagement and conversion."
              delay={0.6}
            />
          </div>

          {/* Enterprise Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-24 mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for scale and security, NarratixAI delivers the robust features and
                reliability that enterprise organizations demand.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EnterpriseFeature
                icon={Shield}
                title="Enterprise Security"
                description="SOC 2 Type II compliance, end-to-end encryption, and advanced access controls to protect your data and content."
              />
              <EnterpriseFeature
                icon={Database}
                title="Scalable Infrastructure"
                description="Cloud-native architecture that scales automatically to handle millions of concurrent users and campaigns."
              />
              <EnterpriseFeature
                icon={Network}
                title="API Integration"
                description="RESTful APIs and webhooks for seamless integration with your existing marketing stack and workflow tools."
              />
              <EnterpriseFeature
                icon={BarChart}
                title="Advanced Analytics"
                description="Real-time performance metrics, custom reporting, and predictive analytics powered by machine learning."
              />
              <EnterpriseFeature
                icon={Globe2}
                title="Global CDN"
                description="Content delivery network ensuring fast load times and optimal performance worldwide."
              />
              <EnterpriseFeature
                icon={Lock}
                title="Compliance & Governance"
                description="Built-in compliance tools, audit logs, and governance features for regulated industries."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-32 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Advertising?</h2>
            <p className="text-muted-foreground mb-8">
              Join the next generation of AI-powered advertising creation.
            </p>
            <Button asChild size="lg" className="bg-primary/90 hover:bg-primary">
              <Link href="/auth">
                Start Creating Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </main>
      </div>
    </MainLayout>
  );
}