import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, TrendingUp, Target, Brain, BarChart3, Zap, Activity, Globe, Users, ArrowRight, ChartBar } from "lucide-react";
import { Link } from "wouter";
import AppLayout from "@/components/layout/app-layout";
import { PerformanceForecast } from "@/components/charts/performance-forecast"; // Added import

const getMetricColor = (value: string | number, type: string) => {
    // Remove % sign and convert to number if necessary
    const numValue = typeof value === 'string' ? parseFloat(value.replace('%', '')) : value;

    switch(type) {
      case 'engagement':
        return numValue >= 7 ? 'text-green-500' : numValue >= 4 ? 'text-yellow-500' : 'text-red-500';
      case 'conversion':
        return numValue >= 2 ? 'text-green-500' : numValue >= 1 ? 'text-yellow-500' : 'text-red-500';
      case 'ai_score':
        return numValue >= 85 ? 'text-green-500' : numValue >= 70 ? 'text-yellow-500' : 'text-red-500';
      case 'roi':
        return numValue >= 250 ? 'text-green-500' : numValue >= 150 ? 'text-yellow-500' : 'text-red-500';
      default:
        return numValue > 0 ? 'text-green-500' : 'text-red-500';
    }
  };

  export default function Dashboard() {
    const { data: projects, isLoading } = useQuery<Project[]>({
      queryKey: ["/api/projects"],
    });

    const metrics = [
      { title: "Total Views", value: "124.7K", change: "+12.3%", trend: "up", type: "views" },
      { title: "Engagement Rate", value: "8.2%", change: "+3.1%", trend: "up", type: "engagement" },
      { title: "Conversion Rate", value: "2.4%", change: "+0.8%", trend: "up", type: "conversion" },
      { title: "AI Score", value: "92", change: "+5", trend: "up", type: "ai_score" },
      { title: "ROI", value: "315%", change: "+25%", trend: "up", type: "roi" },
      { title: "Click-Through Rate", value: "4.8%", change: "+1.2%", trend: "up", type: "engagement" },
    ];

    return (
      <AppLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold gradient-heading">Dashboard</h1>
            <Link href="/create-ad">
              <Button className="bg-primary/90 hover:bg-primary">
                <Plus className="h-4 w-4 mr-2" />
                Create New Ad
              </Button>
            </Link>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.title} className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <h3 className={`text-2xl font-bold mt-2 ${getMetricColor(metric.value, metric.type)}`}>
                        {metric.value}
                      </h3>
                    </div>
                    <div className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {metric.change}
                    </div>
                  </div>
                  {/* Add a performance indicator bar */}
                  <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricColor(metric.value, metric.type)} bg-current transition-all duration-500`}
                      style={{ 
                        width: `${Math.min(100, parseFloat(metric.value.replace('%', '')) / (metric.type === 'roi' ? 4 : 1))}%` 
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Platform Performance */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Platform Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {platformMetrics.map((platform) => (
                  <div key={platform.platform} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{platform.platform}</h4>
                      <span className="text-sm text-primary">{platform.engagement}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-primary/10 rounded-full">
                        <div
                          className="h-2 bg-primary rounded-full"
                          style={{ width: `${platform.engagement}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Reach: {platform.reach}</span>
                        <span>Conv: {platform.conversion}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Recommendations */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiRecommendations.map((rec) => (
                  <div key={rec.title} className="p-4 rounded-lg bg-primary/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">{rec.title}</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {rec.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <p className="text-sm text-primary">{rec.impact}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Audience Insights */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Audience Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Demographics</h4>
                      <span className="text-sm text-primary">25-34 age group leads</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="h-20 bg-primary/10 rounded-lg relative">
                        <div className="absolute bottom-0 w-full bg-primary rounded-lg" style={{ height: '40%' }} />
                        <span className="absolute top-2 left-2 text-xs">18-24</span>
                      </div>
                      <div className="h-20 bg-primary/10 rounded-lg relative">
                        <div className="absolute bottom-0 w-full bg-primary rounded-lg" style={{ height: '75%' }} />
                        <span className="absolute top-2 left-2 text-xs">25-34</span>
                      </div>
                      <div className="h-20 bg-primary/10 rounded-lg relative">
                        <div className="absolute bottom-0 w-full bg-primary rounded-lg" style={{ height: '55%' }} />
                        <span className="absolute top-2 left-2 text-xs">35-44</span>
                      </div>
                      <div className="h-20 bg-primary/10 rounded-lg relative">
                        <div className="absolute bottom-0 w-full bg-primary rounded-lg" style={{ height: '30%' }} />
                        <span className="absolute top-2 left-2 text-xs">45+</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Interaction Patterns</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-primary/5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Peak Activity</span>
                          <span className="text-sm font-medium">2PM - 6PM</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Device Type</span>
                          <span className="text-sm font-medium">78% Mobile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Forecast */}
          <PerformanceForecast />

          {/* Recent Projects */}
          <div>
            <h2 className="text-2xl font-bold mb-4 gradient-heading">Recent Projects</h2>
            {isLoading ? (
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects?.map((project) => (
                  <Card key={project.id} className="group relative overflow-hidden bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader>
                      <CardTitle className="text-xl gradient-heading">
                        {project.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Performance</span>
                          <span className="text-primary">92% effectiveness</span>
                        </div>
                        <div className="h-1.5 w-full bg-primary/10 rounded-full">
                          <div className="h-1.5 bg-primary rounded-full" style={{ width: '92%' }} />
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm hover:bg-primary/10">
                            <ChartBar className="h-4 w-4 mr-2" />
                            Analytics
                          </Button>
                          <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm hover:bg-primary/10">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    );
  }
const platformMetrics = [
    { platform: "Instagram", engagement: 78, reach: "45K", conversion: "2.1%" },
    { platform: "Facebook", engagement: 65, reach: "38K", conversion: "1.8%" },
    { platform: "TikTok", engagement: 92, reach: "62K", conversion: "3.2%" },
    { platform: "YouTube", engagement: 71, reach: "29K", conversion: "1.5%" },
  ];

  const aiRecommendations = [
    {
      title: "Optimize Script Tone",
      description: "Our AI suggests adjusting the script tone to be more conversational for better engagement",
      impact: "Potential +15% engagement",
      priority: "high"
    },
    {
      title: "Avatar Expression Enhancement",
      description: "Add more dynamic expressions to increase viewer connection",
      impact: "Potential +20% retention",
      priority: "medium"
    },
    {
      title: "Content Length Optimization",
      description: "Shorten video duration to optimal 60 seconds based on audience data",
      impact: "Potential +25% completion rate",
      priority: "high"
    },
  ];