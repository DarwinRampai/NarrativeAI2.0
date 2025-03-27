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
  RefreshCcw,
  Upload,
  Users,
  Clock,
  Palette,
  Zap
} from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import { motion } from "framer-motion";

export default function AutonomousAds() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [adMode, setAdMode] = useState("fully-ai");
  const [prompt, setPrompt] = useState("");

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

        <Tabs defaultValue="creation" className="space-y-6">
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
            <TabsTrigger value="deployment">
              <Globe className="h-4 w-4 mr-2" />
              Deployment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="creation" className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Creation Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card className={`cursor-pointer p-4 ${adMode === 'fully-ai' ? 'border-primary' : 'border-primary/10'}`}
                    onClick={() => setAdMode('fully-ai')}>
                    <div className="flex items-center gap-2 mb-2">
                      <Wand2 className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Fully AI-Generated</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">AI builds everything from a simple prompt</p>
                  </Card>

                  <Card className={`cursor-pointer p-4 ${adMode === 'semi-custom' ? 'border-primary' : 'border-primary/10'}`}
                    onClick={() => setAdMode('semi-custom')}>
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Semi-Customized</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Upload assets, AI adapts them</p>
                  </Card>

                  <Card className={`cursor-pointer p-4 ${adMode === 'manual' ? 'border-primary' : 'border-primary/10'}`}
                    onClick={() => setAdMode('manual')}>
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Manual Override</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Full control over AI suggestions</p>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ad Description or Goals</Label>
                    <Textarea 
                      placeholder="Describe your ad or campaign goals..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="h-32"
                    />
                  </div>

                  {adMode === 'semi-custom' && (
                    <div className="space-y-2">
                      <Label>Brand Assets</Label>
                      <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-primary/60" />
                        <p className="text-sm text-muted-foreground">
                          Drop your logos, images, or videos here, or click to browse
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Generate Video</Label>
                      <p className="text-sm text-muted-foreground">Create complete video ads</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dynamic CGI & Avatars</Label>
                      <p className="text-sm text-muted-foreground">Use AI presenters</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Smart Scene Selection</Label>
                      <p className="text-sm text-muted-foreground">AI-powered composition</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  Real-Time Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold">Adaptive Storytelling</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Content evolves based on user interactions
                    </p>
                    <Switch defaultChecked />
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold">A/B Testing</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Auto-test multiple variations
                    </p>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Smart Budget Allocation</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-medium mb-2">Facebook</p>
                      <div className="h-2 w-full bg-primary/10 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '60%' }} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">60% allocated</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-medium mb-2">Instagram</p>
                      <div className="h-2 w-full bg-primary/10 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '25%' }} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">25% allocated</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <p className="font-medium mb-2">TikTok</p>
                      <div className="h-2 w-full bg-primary/10 rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: '15%' }} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">15% allocated</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personalization" className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Audience Targeting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Demographics</Label>
                    <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Age Range</span>
                        <span className="text-sm text-primary">25-34</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Location</span>
                        <span className="text-sm text-primary">Global</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Interests</span>
                        <span className="text-sm text-primary">Tech, Fashion</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Behavioral Data</Label>
                    <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Shopping Habits</span>
                        <span className="text-sm text-primary">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Brand Affinity</span>
                        <span className="text-sm text-primary">High</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Device Usage</span>
                        <span className="text-sm text-primary">Mobile</span>
                      </div>
                    </div>
                  </div>
                </div>

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

          <TabsContent value="deployment" className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Multichannel Deployment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                    <h3 className="font-semibold">Platform Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Connected to Meta, Google, TikTok
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
                      Cross-platform alignment active
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-primary/90 hover:bg-primary">
                    <Globe className="mr-2 h-4 w-4" />
                    Deploy Across All Channels
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}