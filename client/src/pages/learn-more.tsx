import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Cpu, Layers, LineChart, VideoIcon, Wand2, Code, Zap, Users, Globe, ChartBar } from "lucide-react";
import { Link } from "wouter";
import { MainLayout } from "@/layouts/main"; 

const Feature = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="card-hover"
  >
    <div className="p-6">
      <div className="feature-icon mb-4">
        <Icon className="feature-icon-inner" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export default function LearnMore() {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl font-bold tracking-tight mb-6 gradient-heading">
            Transform Your Advertising with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            NarratixAI combines cutting-edge artificial intelligence, neural avatars, and real-time optimization to revolutionize how brands create and deliver advertising content.
          </p>
          <Link href="/early-access">
            <Button size="lg" className="bg-primary/90 hover:bg-primary">
              Get Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Feature
            icon={Brain}
            title="AI Script Generation"
            description="Our advanced language models analyze your brand voice, market trends, and campaign goals to create compelling ad scripts that resonate with your target audience."
            delay={0.2}
          />
          <Feature
            icon={VideoIcon}
            title="Neural Avatar Technology"
            description="Create lifelike digital presenters using advanced CGI and neural networks. Our avatars can speak multiple languages and adapt their expressions in real-time."
            delay={0.3}
          />
          <Feature
            icon={Wand2}
            title="Autonomous Ad Creation"
            description="Just provide a brief prompt, and our AI will handle everything - from script writing to visual composition, CGI integration, and final production."
            delay={0.4}
          />
          <Feature
            icon={Zap}
            title="Real-Time Optimization"
            description="Our AI continuously analyzes engagement metrics and automatically adjusts ad content, timing, and targeting for maximum performance."
            delay={0.5}
          />
          <Feature
            icon={Users}
            title="Dynamic Personalization"
            description="Deliver personalized ad experiences that adapt to viewer demographics, behavior patterns, and emotional responses in real-time."
            delay={0.6}
          />
          <Feature
            icon={Globe}
            title="Multi-Platform Deployment"
            description="Automatically optimize and distribute your ads across social media, streaming platforms, and programmatic networks with perfect format adaptation."
            delay={0.7}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-heading">
            Advanced AI Technologies
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <Code className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">GPT-4o Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Leveraging the latest large language models for human-like script generation and content optimization.
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-6">
                <Cpu className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Neural Rendering</h3>
                <p className="text-sm text-muted-foreground">
                  State-of-the-art CGI and real-time rendering powered by advanced neural networks.
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-6">
                <ChartBar className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning algorithms that forecast ad performance and optimize delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card className="card-hover max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">
                Ready to Transform Your Advertising?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join the next generation of AI-powered advertising creation. Get early access to our platform and be among the first to experience the future of digital advertising.
              </p>
              <Link href="/auth">
                <Button size="lg" className="bg-primary/90 hover:bg-primary">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}