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
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/app-layout";

export default function CreateAd() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Here we would integrate with AI generation API
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Ad Generated Successfully",
        description: "Your ad has been created and is ready for review.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your ad. Please try again.",
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Ad Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Campaign Goal</Label>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Targeting & Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Platforms</Label>
                    <Input placeholder="e.g., Instagram, Facebook, YouTube" />
                  </div>
                  <div className="space-y-2">
                    <Label>Geographic Focus</Label>
                    <Input placeholder="e.g., Global, United States, Europe" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dynamic Targeting</Label>
                      <p className="text-sm text-muted-foreground">Automatically adjust for different audiences</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>A/B Testing</Label>
                      <p className="text-sm text-muted-foreground">Create multiple variations for testing</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  AI Settings
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 space-y-2">
                    <p className="text-sm">
                      Fill in your campaign details and our AI will provide personalized suggestions for maximizing impact.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
