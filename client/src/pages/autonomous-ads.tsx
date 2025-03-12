import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Brain,
  Sparkles,
  Gauge,
  Target,
  Layers,
  Video,
  LineChart,
  Wand2,
  Globe,
  RefreshCcw
} from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import { motion } from "framer-motion";

export default function AutonomousAds() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Here we would integrate with AI to generate the ad
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold gradient-heading">
            Autonomous Ads
          </h1>
          <Button 
            className="bg-primary/90 hover:bg-primary"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Create New Ad
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="creation">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="creation">
              <Brain className="h-4 w-4 mr-2" />
              AI Creation
            </TabsTrigger>
            <TabsTrigger value="optimization">
              <Gauge className="h-4 w-4 mr-2" />
              Real-Time Optimization
            </TabsTrigger>
            <TabsTrigger value="personalization">
              <Target className="h-4 w-4 mr-2" />
              Personalization
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <LineChart className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="creation" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  AI-Driven Ad Creation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Campaign Goals</Label>
                  <Textarea 
                    placeholder="Describe your campaign objectives and target audience..."
                    className="h-24"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Brand Voice</Label>
                    <Input placeholder="Professional, Casual, Energetic..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input placeholder="Tech, Fashion, Health..." />
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Generate Video Ads</Label>
                      <p className="text-sm text-muted-foreground">Let AI create complete video ads</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dynamic CGI & Avatars</Label>
                      <p className="text-sm text-muted-foreground">Use AI avatars for presentation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Smart Scene Composition</Label>
                      <p className="text-sm text-muted-foreground">AI-powered scene selection</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Real-Time Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Adaptive Storytelling</Label>
                      <p className="text-sm text-muted-foreground">Dynamic content evolution</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automated A/B Testing</Label>
                      <p className="text-sm text-muted-foreground">AI-driven variant testing</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Audience Optimization</Label>
                      <p className="text-sm text-muted-foreground">Dynamic audience targeting</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personalization" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Advanced Personalization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emotion Detection</Label>
                      <p className="text-sm text-muted-foreground">Adapt to viewer emotions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Context Awareness</Label>
                      <p className="text-sm text-muted-foreground">Time and location-based changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Voice Personalization</Label>
                      <p className="text-sm text-muted-foreground">Dynamic voice adaptation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Predictive Success Rate</h3>
                    <div className="h-2 w-full bg-primary/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '85%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">85% predicted success rate</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Budget Optimization</h3>
                    <div className="h-2 w-full bg-primary/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '92%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">92% budget efficiency</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Engagement Score</h3>
                    <div className="h-2 w-full bg-primary/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '78%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">78% viewer engagement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Multichannel Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                <h3 className="font-semibold">Platform Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Connected to YouTube, TikTok, Instagram
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                <h3 className="font-semibold">API Status</h3>
                <p className="text-sm text-muted-foreground">
                  All systems operational
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                <h3 className="font-semibold">Brand Consistency</h3>
                <p className="text-sm text-muted-foreground">
                  100% cross-platform alignment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
