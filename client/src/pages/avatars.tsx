import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Play, UserCircle, Volume2, Palette, Gestures } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import { motion } from "framer-motion";

interface Avatar {
  id: number;
  name: string;
  previewUrl: string;
  description: string;
  voiceOptions: string[];
  outfits: string[];
  backgrounds: string[];
  expressions: string[];
}

const demoAvatars: Avatar[] = [
  {
    id: 1,
    name: "Professional Emma",
    previewUrl: "/avatars/emma.mp4",
    description: "Perfect for corporate communications and business presentations",
    voiceOptions: ["Professional", "Friendly", "Energetic"],
    outfits: ["Business Suit", "Smart Casual", "Professional Dress"],
    backgrounds: ["Office", "Conference Room", "Modern Studio"],
    expressions: ["Confident", "Approachable", "Enthusiastic"]
  },
  {
    id: 2,
    name: "Tech Expert Alex",
    previewUrl: "/avatars/alex.mp4",
    description: "Ideal for technology product demonstrations and tutorials",
    voiceOptions: ["Technical", "Casual", "Engaging"],
    outfits: ["Casual Shirt", "Hoodie", "Tech Jacket"],
    backgrounds: ["Tech Office", "Laboratory", "Home Office"],
    expressions: ["Focused", "Explanatory", "Excited"]
  },
  {
    id: 3,
    name: "Creative Sarah",
    previewUrl: "/avatars/sarah.mp4",
    description: "Great for creative and artistic content",
    voiceOptions: ["Artistic", "Inspirational", "Relaxed"],
    outfits: ["Bohemian Dress", "Artist Smock", "Casual Outfit"],
    backgrounds: ["Art Studio", "Gallery", "Nature Setting"],
    expressions: ["Inspired", "Passionate", "Calm"]
  },
  {
    id: 4,
    name: "Executive Michael",
    previewUrl: "/avatars/michael.mp4",
    description: "Perfect for executive presentations and corporate announcements",
    voiceOptions: ["Authoritative", "Confident", "Professional"],
    outfits: ["Business Suit", "Power Suit", "Formal Wear"],
    backgrounds: ["Boardroom", "Modern Office", "Luxury Setting"],
    expressions: ["Confident", "Determined", "Serious"]
  },
  {
    id: 5,
    name: "Lifestyle Coach Rachel",
    previewUrl: "/avatars/rachel.mp4",
    description: "Specialized in wellness, lifestyle, and motivational content",
    voiceOptions: ["Motivational", "Calming", "Energetic"],
    outfits: ["Yoga Outfit", "Casual Wear", "Activewear"],
    backgrounds: ["Yoga Studio", "Nature Setting", "Home Gym"],
    expressions: ["Positive", "Uplifting", "Friendly"]
  },
  {
    id: 6,
    name: "Sales Pro David",
    previewUrl: "/avatars/david.mp4",
    description: "Expert in sales pitches and product demonstrations",
    voiceOptions: ["Persuasive", "Friendly", "Dynamic"],
    outfits: ["Business Casual", "Smart Casual", "Suit"],
    backgrounds: ["Office", "Retail Store", "Conference Room"],
    expressions: ["Friendly", "Enthusiastic", "Confident"]
  },
  {
    id: 7,
    name: "Educational Lisa",
    previewUrl: "/avatars/lisa.mp4",
    description: "Perfect for educational content and e-learning materials",
    voiceOptions: ["Clear", "Patient", "Engaging"],
    outfits: ["Casual Wear", "Smart Casual", "Professional Outfit"],
    backgrounds: ["Classroom", "Library", "Home Office"],
    expressions: ["Patient", "Explanatory", "Enthusiastic"]
  },
  {
    id: 8,
    name: "Entertainment Host James",
    previewUrl: "/avatars/james.mp4",
    description: "Ideal for entertainment and media content",
    voiceOptions: ["Entertaining", "Dramatic", "Casual"],
    outfits: ["Formal Wear", "Smart Casual", "Casual Outfit"],
    backgrounds: ["Studio", "Stage", "Nightclub"],
    expressions: ["Energetic", "Dramatic", "Humorous"]
  },
  {
    id: 9,
    name: "Medical Expert Dr. Maria",
    previewUrl: "/avatars/maria.mp4",
    description: "Specialized in healthcare and medical content delivery",
    voiceOptions: ["Professional", "Compassionate", "Informative"],
    outfits: ["Lab Coat", "Scrubs", "Business Suit"],
    backgrounds: ["Hospital", "Clinic", "Laboratory"],
    expressions: ["Professional", "Compassionate", "Informative"]
  }
];

interface CustomizationState {
  voiceStyle: number;
  voicePitch: number;
  voiceSpeed: number;
  outfit: string;
  background: string;
  expression: string;
  gestures: boolean;
}

export default function AvatarsPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [customization, setCustomization] = useState<Record<number, CustomizationState>>({});
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleCustomizationChange = (avatarId: number, field: keyof CustomizationState, value: any) => {
    setCustomization(prev => ({
      ...prev,
      [avatarId]: {
        ...prev[avatarId],
        [field]: value
      }
    }));
  };

  const getDefaultCustomization = (): CustomizationState => ({
    voiceStyle: 0,
    voicePitch: 50,
    voiceSpeed: 50,
    outfit: "Business Suit",
    background: "Office",
    expression: "Confident",
    gestures: true
  });

  const startCustomizing = (avatarId: number) => {
    setSelectedAvatar(avatarId);
    setIsCustomizing(true);
    if (!customization[avatarId]) {
      setCustomization(prev => ({
        ...prev,
        [avatarId]: getDefaultCustomization()
      }));
    }
  };

  const CustomizationPanel = ({ avatar }: { avatar: Avatar }) => (
    <Card className="mt-4 bg-card/30 backdrop-blur-sm border-primary/10">
      <CardContent className="p-6">
        <Tabs defaultValue="voice">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="space-y-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label>Voice Style</Label>
                  <span className="text-sm text-primary">
                    {avatar.voiceOptions[customization[avatar.id]?.voiceStyle || 0]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0]}
                  max={avatar.voiceOptions.length - 1}
                  step={1}
                  className="mt-2"
                  onValueChange={(value) => handleCustomizationChange(avatar.id, 'voiceStyle', value[0])}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label>Voice Pitch</Label>
                  <span className="text-sm text-primary">{customization[avatar.id]?.voicePitch}%</span>
                </div>
                <Slider
                  defaultValue={[50]}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                  onValueChange={(value) => handleCustomizationChange(avatar.id, 'voicePitch', value[0])}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label>Speaking Speed</Label>
                  <span className="text-sm text-primary">{customization[avatar.id]?.voiceSpeed}%</span>
                </div>
                <Slider
                  defaultValue={[50]}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                  onValueChange={(value) => handleCustomizationChange(avatar.id, 'voiceSpeed', value[0])}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Outfit</Label>
                <Select 
                  value={customization[avatar.id]?.outfit}
                  onValueChange={(value) => handleCustomizationChange(avatar.id, 'outfit', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select outfit" />
                  </SelectTrigger>
                  <SelectContent>
                    {avatar.outfits.map((outfit) => (
                      <SelectItem key={outfit} value={outfit}>
                        {outfit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Background</Label>
                <Select
                  value={customization[avatar.id]?.background}
                  onValueChange={(value) => handleCustomizationChange(avatar.id, 'background', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select background" />
                  </SelectTrigger>
                  <SelectContent>
                    {avatar.backgrounds.map((bg) => (
                      <SelectItem key={bg} value={bg}>
                        {bg}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Expression</Label>
                <Select
                  value={customization[avatar.id]?.expression}
                  onValueChange={(value) => handleCustomizationChange(avatar.id, 'expression', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select expression" />
                  </SelectTrigger>
                  <SelectContent>
                    {avatar.expressions.map((expression) => (
                      <SelectItem key={expression} value={expression}>
                        {expression}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Hand Gestures</Label>
                <Button
                  variant={customization[avatar.id]?.gestures ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCustomizationChange(
                    avatar.id,
                    'gestures',
                    !customization[avatar.id]?.gestures
                  )}
                >
                  {customization[avatar.id]?.gestures ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setIsCustomizing(false)}>
            Cancel
          </Button>
          <Button className="bg-primary/90 hover:bg-primary">
            Apply Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          Neural Avatars
        </h1>
        <Button className="bg-primary/90 hover:bg-primary">
          <UserCircle className="h-4 w-4 mr-2" />
          Create Custom Avatar
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {demoAvatars.map((avatar) => (
          <motion.div
            key={avatar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="group relative overflow-hidden bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-48 bg-background/50">
                {/* Video preview placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <UserCircle className="h-20 w-20 text-primary/40" />
                  <Button
                    size="icon"
                    className="absolute bg-primary/90 hover:bg-primary"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  {avatar.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {avatar.description}
                </p>
                <Button 
                  className="w-full bg-primary/90 hover:bg-primary"
                  onClick={() => startCustomizing(avatar.id)}
                >
                  Customize Avatar
                </Button>
              </CardContent>
            </Card>
            {isCustomizing && selectedAvatar === avatar.id && (
              <CustomizationPanel avatar={avatar} />
            )}
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}