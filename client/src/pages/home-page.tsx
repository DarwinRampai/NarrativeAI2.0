import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Cpu, VideoIcon, Shield, Database, Network, BarChart, Globe2, Lock } from "lucide-react";
import { MainLayout } from "@/layouts/main";
import { useState, useEffect } from "react";

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        damping: 20
      }}
      className="relative overflow-hidden rounded-lg border border-primary/10 bg-background/30 backdrop-blur-xl transform-gpu"
      style={{ perspective: "1000px" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
        animate={{
          transform: `rotate3d(${mousePosition.y - 0.5}, ${mousePosition.x - 0.5}, 0, ${Math.max(5, Math.min(15, Math.sqrt(Math.pow(mousePosition.x - 0.5, 2) + Math.pow(mousePosition.y - 0.5, 2)) * 30))}deg)`
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      <div className="p-6 relative z-10">
        <motion.div 
          className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Icon className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Interactive particle effects */}
      <motion.div 
        className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-primary/5 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default function HomePage() {
  const { user } = useAuth();
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Dynamic parallax effects
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <MainLayout showSidebar={true}>
      <div className="min-h-screen relative overflow-hidden">
        {/* Dynamic background particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(109,40,217,0.15) 0%, transparent 50%)`,
              `radial-gradient(circle at ${50 - mousePosition.x * 30}% ${50 - mousePosition.y * 30}%, rgba(109,40,217,0.15) 0%, transparent 50%)`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />

        <div className="container mx-auto px-6 py-12 relative">
          <motion.div
            style={{ scale: titleScale, y: titleY, opacity }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              Revolutionizing Ad Creation with AI & Next-Gen CGI
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Generate persuasive scripts, create professional videos, and optimize your
              advertising campaigns with the power of artificial intelligence.
            </motion.p>

            <motion.div 
              className="flex gap-4 justify-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-primary/90 hover:bg-primary relative overflow-hidden group"
              >
                <Link href="/early-access">
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  Get Early Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary/20 hover:border-primary/40 transition-colors duration-300"
              >
                <Link href="/learn-more">
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Grid with Spatial UI */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mt-16 relative z-10">
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

          {/* Call to Action with Dynamic Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 text-center relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 20, repeat: Infinity }}
            />

            <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to Transform Your Advertising?</h2>
            <p className="text-muted-foreground mb-8 relative z-10">
              Join the next generation of AI-powered advertising creation.
            </p>

            <Button 
              asChild 
              size="lg" 
              className="bg-primary/90 hover:bg-primary relative overflow-hidden group"
            >
              <Link href="/auth">
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                Start Creating Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}

const EnterpriseFeature = ({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
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