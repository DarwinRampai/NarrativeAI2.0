import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, LineChart, PieChart, TrendingUp } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => (
  <Card className="relative overflow-hidden bg-card/30 backdrop-blur-sm border-primary/10">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            {value}
          </h3>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="mt-2 flex items-center text-sm">
        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        <span className="text-green-500">{change}</span>
      </div>
    </CardContent>
    <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
  </Card>
);

export default function Analytics() {
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          Analytics Dashboard
        </h1>
        <Button variant="outline" className="bg-background/50 backdrop-blur-sm hover:bg-primary/10">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Views"
          value="245.8K"
          change="+12.3%"
          icon={LineChart}
        />
        <StatCard
          title="Engagement Rate"
          value="18.2%"
          change="+5.7%"
          icon={BarChart3}
        />
        <StatCard
          title="Conversion Rate"
          value="8.9%"
          change="+2.1%"
          icon={PieChart}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization will be implemented here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Campaign Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Audience Demographics</h4>
                  <span className="text-sm text-primary">View Details</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Primary audience: 25-34 age group (45%)
                </p>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Peak Performance Times</h4>
                  <span className="text-sm text-primary">View Details</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Highest engagement: 6PM - 9PM EST
                </p>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Platform Distribution</h4>
                  <span className="text-sm text-primary">View Details</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mobile: 65% | Desktop: 35%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}