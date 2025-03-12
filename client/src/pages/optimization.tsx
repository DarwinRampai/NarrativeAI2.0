import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, TrendingUp, Zap } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  delay?: number;
}

const MetricCard = ({ title, value, icon: Icon, delay = 0 }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <Card className="relative overflow-hidden bg-card/30 backdrop-blur-sm border-primary/10">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              {value}
            </h3>
          </div>
        </div>
      </CardContent>
      <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
    </Card>
  </motion.div>
);

export default function Optimization() {
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          AI Optimization
        </h1>
        <Button className="bg-primary/90 hover:bg-primary">
          <Sparkles className="h-4 w-4 mr-2" />
          Auto-Optimize All
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Active Optimizations"
          value="24"
          icon={Zap}
          delay={0.1}
        />
        <MetricCard
          title="Performance Boost"
          value="+45%"
          icon={TrendingUp}
          delay={0.2}
        />
        <MetricCard
          title="AI Suggestions"
          value="12"
          icon={Sparkles}
          delay={0.3}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Real-Time Optimizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Summer Collection Ad</h4>
                  <span className="text-sm text-primary">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Tech Gadget Campaign</h4>
                  <span className="text-sm text-primary">Optimizing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-primary rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <Sparkles className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Audience Targeting</h4>
                  <p className="text-sm text-muted-foreground">
                    Expand targeting to include tech-savvy millennials based on recent engagement patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <Sparkles className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Content Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Add more dynamic elements to increase viewer retention by estimated 23%.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}