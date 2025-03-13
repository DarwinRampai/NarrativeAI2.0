import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Upload,
  Wand2,
  Sparkles,
  Target,
  Users,
  Settings,
  RefreshCcw,
  AlertCircle,
  PenSquare,
  Video,
  Layers,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Plus,
  LineChart,
  Globe,
  Layout,
  Zap,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/app-layout";

export default function CreateAd() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState("details");
  const [selectedTemplate, setSelectedTemplate] = useState("custom");
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Here we would integrate with AI generation API
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Script Generated Successfully",
        description: "Your ad script has been created and is ready for review.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your script. Please try again.",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-heading mb-2">
              Create New Ad
            </h1>
            <p className="text-muted-foreground">
              Let AI help you create engaging and effective advertisements
            </p>
          </div>
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
                Generate Ad
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="details" className="space-y-6" onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="details">
              <Brain className="h-4 w-4 mr-2" />
              Ad Details
            </TabsTrigger>
            <TabsTrigger value="script">
              <PenSquare className="h-4 w-4 mr-2" />
              Script Generator
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="h-4 w-4 mr-2" />
              Video Editor
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              Multi-Platform Preview
            </TabsTrigger>
            <TabsTrigger value="optimize">
              <Zap className="h-4 w-4 mr-2" />
              Smart Optimization
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              AI Settings
            </TabsTrigger>
          </TabsList>

          {/* Ad Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5 text-primary" />
                  Template Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer p-4 ${selectedTemplate === 'storytelling' ? 'border-primary' : 'border-primary/10'}`}
                    onClick={() => setSelectedTemplate('storytelling')}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Storytelling</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Emotional narrative-driven ads</p>
                  </Card>

                  <Card 
                    className={`cursor-pointer p-4 ${selectedTemplate === 'product-showcase' ? 'border-primary' : 'border-primary/10'}`}
                    onClick={() => setSelectedTemplate('product-showcase')}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Product Showcase</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Feature-focused product presentations</p>
                  </Card>

                  <Card 
                    className={`cursor-pointer p-4 ${selectedTemplate === 'custom' ? 'border-primary' : 'border-primary/10'}`}
                    onClick={() => setSelectedTemplate('custom')}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Wand2 className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Custom</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Build from scratch with AI assistance</p>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Campaign Goals</Label>
                    <Input placeholder="e.g., Increase brand awareness, drive sales, etc." />
                  </div>

                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Input placeholder="e.g., Young professionals, tech enthusiasts, etc." />
                  </div>

                  <div className="space-y-2">
                    <Label>Key Message</Label>
                    <Textarea 
                      placeholder="What's the main message you want to convey?"
                      className="h-32"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Assets</Label>
                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-primary/60" />
                      <p className="text-sm text-muted-foreground">
                        Drop your logos, images, or videos here, or click to browse
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Script Generator Tab */}
          <TabsContent value="script" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenSquare className="h-5 w-5 text-primary" />
                  Script Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tone of Voice</Label>
                    <Input placeholder="e.g., Professional, Friendly, Energetic" />
                  </div>

                  <div className="space-y-2">
                    <Label>Script Length</Label>
                    <Input placeholder="e.g., 30 seconds, 60 seconds" />
                  </div>

                  <div className="space-y-2">
                    <Label>Key Points to Include</Label>
                    <Textarea 
                      placeholder="List the main points you want to highlight in your script"
                      className="h-32"
                    />
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Generated Script</h3>
                  <div className="bg-background/50 rounded-lg p-4 min-h-[200px]">
                    <p className="text-muted-foreground text-sm">
                      Your AI-generated script will appear here...
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" className="mr-2">
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Edit Script
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Editor Tab */}
          <TabsContent value="video" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Video Editor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video bg-black rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white/60">Video preview will appear here</p>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-4">Scenes</h3>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-primary/5 cursor-pointer hover:bg-primary/10">
                        <div className="flex items-center gap-2">
                          <div className="h-12 w-20 bg-background rounded"></div>
                          <div>
                            <p className="font-medium">Opening Scene</p>
                            <p className="text-sm text-muted-foreground">0:00 - 0:05</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/5 cursor-pointer hover:bg-primary/10">
                        <div className="flex items-center gap-2">
                          <div className="h-12 w-20 bg-background rounded"></div>
                          <div>
                            <p className="font-medium">Main Message</p>
                            <p className="text-sm text-muted-foreground">0:05 - 0:20</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Assets</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-video bg-primary/5 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/10">
                        <Upload className="h-6 w-6 text-primary/60" />
                      </div>
                      <div className="aspect-video bg-primary/5 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/10">
                        <Plus className="h-6 w-6 text-primary/60" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">
                    <Layers className="h-4 w-4 mr-2" />
                    Add Scene
                  </Button>
                  <Button>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Apply AI Enhancement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Multi-Platform Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Platform Previews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Instagram Feed</Label>
                    <div className="aspect-square bg-black rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white/60">Instagram preview</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>TikTok</Label>
                    <div className="aspect-[9/16] bg-black rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white/60">TikTok preview</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>YouTube</Label>
                    <div className="aspect-video bg-black rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white/60">YouTube preview</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Auto-Adapt for All Platforms
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Optimization Tab */}
          <TabsContent value="optimize" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Performance Prediction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                    <h3 className="font-semibold">Engagement Score</h3>
                    <div className="h-2 w-full bg-primary/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '85%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground">85% predicted engagement</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                    <h3 className="font-semibold">Conversion Rate</h3>
                    <div className="h-2 w-full bg-primary/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '72%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground">72% estimated conversions</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                    <h3 className="font-semibold">Brand Alignment</h3>
                    <div className="h-2 w-full bg-primary/10 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '95%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground">95% brand consistency</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic A/B Testing</Label>
                      <p className="text-sm text-muted-foreground">Create and test multiple variations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dynamic Content Optimization</Label>
                      <p className="text-sm text-muted-foreground">Auto-adjust based on performance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Smart Budget Allocation</Label>
                      <p className="text-sm text-muted-foreground">AI-driven spend optimization</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  AI Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Neural Avatars</Label>
                      <p className="text-sm text-muted-foreground">Use AI presenters</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dynamic CGI</Label>
                      <p className="text-sm text-muted-foreground">Generate custom visuals</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Voice Synthesis</Label>
                      <p className="text-sm text-muted-foreground">AI-powered voiceovers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-primary mt-1" />
                    <p className="text-sm text-muted-foreground">
                      AI will automatically optimize these settings based on your campaign goals and target audience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}