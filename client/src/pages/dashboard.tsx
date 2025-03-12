import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, TrendingUp, Target, Brain, BarChart3, Zap, Activity } from "lucide-react";
import { Link } from "wouter";
import AppLayout from "@/components/layout/app-layout";

export default function Dashboard() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const metrics = [
    { title: "Total Views", value: "124.7K", change: "+12.3%", trend: "up" },
    { title: "Engagement Rate", value: "8.2%", change: "+3.1%", trend: "up" },
    { title: "Conversion Rate", value: "2.4%", change: "+0.8%", trend: "up" },
    { title: "AI Score", value: "92", change: "+5", trend: "up" },
  ];

  const aiRecommendations = [
    {
      title: "Optimize Script Tone",
      description: "Our AI suggests adjusting the script tone to be more conversational for better engagement",
      impact: "Potential +15% engagement",
    },
    {
      title: "Avatar Expression Enhancement",
      description: "Add more dynamic expressions to increase viewer connection",
      impact: "Potential +20% retention",
    },
    {
      title: "Content Length Optimization",
      description: "Shorten video duration to optimal 60 seconds based on audience data",
      impact: "Potential +25% completion rate",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold gradient-heading">Dashboard</h1>
          <Button className="bg-primary/90 hover:bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.title} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                  </div>
                  <div className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Optimization */}
        <div className="grid md:grid-cols-2 gap-6">
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
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">{rec.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                  <p className="text-sm text-primary">{rec.impact}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Audience Retention</p>
                    <div className="h-2 w-full bg-primary/10 rounded-full mt-2">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Click-Through Rate</p>
                    <div className="h-2 w-full bg-primary/10 rounded-full mt-2">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '62%' }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Social Shares</p>
                    <div className="h-2 w-full bg-primary/10 rounded-full mt-2">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
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
                    <div className="flex space-x-2">
                      <Link href={`/script-generator?projectId=${project.id}`}>
                        <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm hover:bg-primary/10">
                          Generate Script
                        </Button>
                      </Link>
                      <Link href={`/video-editor?projectId=${project.id}`}>
                        <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm hover:bg-primary/10">
                          Edit Video
                        </Button>
                      </Link>
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