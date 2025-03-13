import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { UserCircle, Sliders, Brain, Languages, Mic2, Wand2 } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import { motion } from "framer-motion";
import { VoiceModulationPreview } from "@/components/audio/voice-modulation-preview";

interface Avatar {
  id: number;
  name: string;
  previewUrl: string;
  description: string;
  voiceOptions: string[];
  outfits: string[];
  backgrounds: string[];
  expressions: string[];
  styles: string[];
  languages: string[];
  physicalFeatures: {
    skinTones: string[];
    hairStyles: string[];
    faceShapes: string[];
    eyeColors: string[];
  };
}

interface CustomizationState {
  // Basic customization
  voiceStyle: number;
  voicePitch: number;
  voiceSpeed: number;
  outfit: string;
  background: string;
  expression: string;
  gestures: boolean;

  // Physical features
  skinTone: string;
  hairStyle: string;
  faceShape: string;
  eyeColor: string;

  // Advanced motion
  lipSync: boolean;
  expressionRecognition: boolean;
  bodyMotion: boolean;
  physicsEnabled: boolean;

  // AI behavior
  autonomousReactions: boolean;
  voiceCloning: boolean;
  emotionDetection: boolean;

  // Style & Language
  avatarStyle: string;
  language: string;
  accentStrength: number;
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
    expressions: ["Confident", "Approachable", "Enthusiastic"],
    styles: ["Photorealistic", "Stylized", "Animated"],
    languages: ["English", "Spanish", "French", "German", "Mandarin"],
    physicalFeatures: {
      skinTones: ["Light", "Medium", "Tan", "Dark"],
      hairStyles: ["Straight Long", "Wavy Medium", "Professional Updo", "Sleek Bob"],
      faceShapes: ["Oval", "Round", "Heart", "Square"],
      eyeColors: ["Brown", "Blue", "Green", "Hazel"]
    }
  },
  {
    id: 2,
    name: "Tech Expert Alex",
    previewUrl: "/avatars/alex.mp4",
    description: "Ideal for technology product demonstrations and tutorials",
    voiceOptions: ["Technical", "Casual", "Engaging"],
    outfits: ["Casual Shirt", "Hoodie", "Tech Jacket"],
    backgrounds: ["Tech Office", "Laboratory", "Home Office"],
    expressions: ["Focused", "Explanatory", "Excited"],
    styles: ["Photorealistic", "Stylized", "Animated"],
    languages: ["English", "Spanish", "French", "German", "Mandarin"],
    physicalFeatures: {
      skinTones: ["Light", "Medium", "Tan", "Dark"],
      hairStyles: ["Straight Long", "Wavy Medium", "Professional Updo", "Sleek Bob"],
      faceShapes: ["Oval", "Round", "Heart", "Square"],
      eyeColors: ["Brown", "Blue", "Green", "Hazel"]
    }
  },
  {
    id: 3,
    name: "Creative Sarah",
    previewUrl: "/avatars/sarah.mp4",
    description: "Great for creative and artistic content",
    voiceOptions: ["Artistic", "Inspirational", "Relaxed"],
    outfits: ["Bohemian Dress", "Artist Smock", "Casual Outfit"],
    backgrounds: ["Art Studio", "Gallery", "Nature Setting"],
    expressions: ["Inspired", "Passionate", "Calm"],
    styles: ["Photorealistic", "Stylized", "Animated"],
    languages: ["English", "Spanish", "French", "German", "Mandarin"],
    physicalFeatures: {
      skinTones: ["Light", "Medium", "Tan", "Dark"],
      hairStyles: ["Straight Long", "Wavy Medium", "Professional Updo", "Sleek Bob"],
      faceShapes: ["Oval", "Round", "Heart", "Square"],
      eyeColors: ["Brown", "Blue", "Green", "Hazel"]
    }
  },
  {
    id: 4,
    name: "Executive Michael",
    previewUrl: "/avatars/michael.mp4",
    description: "Perfect for executive presentations and corporate announcements",
    voiceOptions: ["Authoritative", "Confident", "Professional"],
    outfits: ["Business Suit", "Power Suit", "Formal Wear"],
    backgrounds: ["Boardroom", "Modern Office", "Luxury Setting"],
    expressions: ["Confident", "Determined", "Serious"],
    styles: ["Photorealistic", "Stylized", "Animated"],
    languages: ["English", "Spanish", "French", "German", "Mandarin"],
    physicalFeatures: {
      skinTones: ["Light", "Medium", "Tan", "Dark"],
      hairStyles: ["Straight Long", "Wavy Medium", "Professional Updo", "Sleek Bob"],
      faceShapes: ["Oval", "Round", "Heart", "Square"],
      eyeColors: ["Brown", "Blue", "Green", "Hazel"]
    }
  },
  {
    id: 5,
    name: "Lifestyle Coach Rachel",
    previewUrl: "/avatars/rachel.mp4",
    description: "Specialized in wellness, lifestyle, and motivational content",
    voiceOptions: ["Motivational", "Calming", "Energetic"],
    outfits: ["Yoga Outfit", "Casual Wear", "Activewear"],
    backgrounds: ["Yoga Studio", "Nature Setting", "Home Gym"],
    expressions: ["Positive", "Uplifting", "Friendly"],
    styles: ["Photorealistic", "Stylized", "Animated"],
    languages: ["English", "Spanish", "French", "German", "Mandarin"],
    physicalFeatures: {
      skinTones: ["Light", "Medium", "Tan", "Dark"],
      hairStyles: ["Straight Long", "Wavy Medium", "Professional Updo", "Sleek Bob"],
      faceShapes: ["Oval", "Round", "Heart", "Square"],
      eyeColors: ["Brown", "Blue", "Green", "Hazel"]
    }
  },
  {
    id: 6,
    name: "Sales Pro David",
    previewUrl: "/avatars/david.mp4",
    description: "Expert in sales pitches and product demonstrations",
    voiceOptions: ["Persuasive", "Friendly", "Dynamic"],
    outfits: ["Business Casual", "Smart Casual", "Suit"],
    backgrounds: ["Office", "Retail Store", "Conference Room"],
    expressions: ["Friendly", "Enthusiastic", "Confident"],
    styles: ["Photorealistic", "Stylized", "Animated"],
    languages: ["English", "Spanish", "French", "German", "Mandarin"],
    physicalFeatures: {
      skinTones: ["Light", "Medium", "Tan", "Dark"],
      hairStyles: ["Straight Long", "Wavy Medium", "Professional Updo", "Sleek Bob"],
      faceShapes: ["Oval", "Round", "Heart", "Square"],
      eyeColors: ["Brown", "Blue", "Green", "Hazel"]
    }
  },
  {
    id: 7,
    name: "Educational Lisa",
    previewUrl: "/avatars/lisa.mp4",
    description: "Perfect for educational content and e-learning materials",
    voiceOptions: ["Clear", "Patient", "Engaging"],
    outfits: ["Casual Wear", "Smart Casual", "Professional Outfit"],
    backgrounds: ["Classroom", "Library", "Home Office"],
    expressions: ["Patient", "Explanatory", "Enthusiastic"],
    styles: ["Photorealistic", "Stylized", "Animated"],
    languages: ["English", "Spanish", "French", "German", "Mandarin"],
    physicalFeatures: {
      skinTones: ["Light", "Medium", "Tan", "Dark"],
      hairStyles: ["Straight Long", "Wavy Medium", "Professional Updo", "Sleek Bob"],
      faceShapes: ["Oval", "Round", "Heart", "Square"],
      eyeColors: ["Brown", "Blue", "Green", "Hazel"]
    }
  },
  {
    id: 8,
    name: "Entertainment Host James",
    previewUrl: "/avatars/james.mp4",
    description: "Ideal for entertainment and media content",
    voiceOptions: ["Entertaining", "Dramatic", "Casual"],
    outfits: ["Formal Wear", "Smart Casual", "Casual Outfit"],
    backgrounds: ["Studio", "Stage", "Nightclub"],
    expressions: ["Energetic", "Dramatic", "Humorous"],
    styles: ["Photorealistic", "Stylized", "Animated"],
    languages: ["English", "Spanish", "French", "German", "Mandarin"],
    physicalFeatures: {
      skinTones: ["Light", "Medium", "Tan", "Dark"],
      hairStyles: ["Straight Long", "Wavy Medium", "Professional Updo", "Sleek Bob"],
      faceShapes: ["Oval", "Round", "Heart", "Square"],
      eyeColors: ["Brown", "Blue", "Green", "Hazel"]
    }
  },
  {
    id: 9,
    name: "Medical Expert Dr. Maria",
    previewUrl: "/avatars/maria.mp4",
    description: "Specialized in healthcare and medical content delivery",
    voiceOptions: ["Professional", "Compassionate", "Informative"],
    outfits: ["Lab Coat", "Scrubs", "Business Suit"],
    backgrounds: ["Hospital", "Clinic", "Laboratory"],
    expressions: ["Professional", "Compassionate", "Informative"],
    styles: ["Photorealistic", "Stylized", "Animated"],
    languages: ["English", "Spanish", "French", "German", "Mandarin"],
    physicalFeatures: {
      skinTones: ["Light", "Medium", "Tan", "Dark"],
      hairStyles: ["Straight Long", "Wavy Medium", "Professional Updo", "Sleek Bob"],
      faceShapes: ["Oval", "Round", "Heart", "Square"],
      eyeColors: ["Brown", "Blue", "Green", "Hazel"]
    }
  }
];

function GenerateAvatarSection() {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Here we would integrate with AI to generate the avatar
    // For now, just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <Card className="mb-8 bg-card/30 backdrop-blur-sm border-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          Generate Custom Avatar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Describe Your Avatar</Label>
          <Textarea
            placeholder="Describe the avatar you want to create... For example: 'A professional female presenter in her 30s with shoulder-length brown hair, wearing a navy business suit. She should have a warm and approachable demeanor, suitable for corporate training videos.'"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-32 bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30"
          />
        </div>
        <Button
          onClick={handleGenerate}
          className="w-full bg-primary/90 hover:bg-primary"
          disabled={!description.trim() || isGenerating}
        >
          {isGenerating ? (
            <>
              <Sliders className="mr-2 h-4 w-4 animate-spin" />
              Generating Avatar...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Avatar
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

function CustomizationPanel({
  avatar,
  customization,
  onCustomizationChange,
  onClose
}: {
  avatar: Avatar;
  customization: CustomizationState;
  onCustomizationChange: (field: keyof CustomizationState, value: any) => void;
  onClose: () => void;
}) {
  return (
    <Card className="mt-4 bg-card/30 backdrop-blur-sm border-primary/10">
      <CardContent className="p-6">
        <Tabs defaultValue="physical">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="physical">
              <UserCircle className="h-4 w-4 mr-2" />
              Physical
            </TabsTrigger>
            <TabsTrigger value="motion">
              <Sliders className="h-4 w-4 mr-2" />
              Motion
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Brain className="h-4 w-4 mr-2" />
              AI
            </TabsTrigger>
            <TabsTrigger value="voice">
              <Mic2 className="h-4 w-4 mr-2" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="language">
              <Languages className="h-4 w-4 mr-2" />
              Language
            </TabsTrigger>
          </TabsList>

          <TabsContent value="physical" className="space-y-4">
            <div>
              <Label>Avatar Style</Label>
              <Select
                value={customization.avatarStyle}
                onValueChange={(value) => onCustomizationChange('avatarStyle', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {avatar.styles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Skin Tone</Label>
              <Select
                value={customization.skinTone}
                onValueChange={(value) => onCustomizationChange('skinTone', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select skin tone" />
                </SelectTrigger>
                <SelectContent>
                  {avatar.physicalFeatures.skinTones.map((tone) => (
                    <SelectItem key={tone} value={tone}>
                      {tone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Hair Style</Label>
              <Select
                value={customization.hairStyle}
                onValueChange={(value) => onCustomizationChange('hairStyle', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select hair style" />
                </SelectTrigger>
                <SelectContent>
                  {avatar.physicalFeatures.hairStyles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Face Shape</Label>
              <Select
                value={customization.faceShape}
                onValueChange={(value) => onCustomizationChange('faceShape', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select face shape" />
                </SelectTrigger>
                <SelectContent>
                  {avatar.physicalFeatures.faceShapes.map((shape) => (
                    <SelectItem key={shape} value={shape}>
                      {shape}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Eye Color</Label>
              <Select
                value={customization.eyeColor}
                onValueChange={(value) => onCustomizationChange('eyeColor', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select eye color" />
                </SelectTrigger>
                <SelectContent>
                  {avatar.physicalFeatures.eyeColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="motion" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>AI Lip Sync</Label>
                <Checkbox
                  checked={customization.lipSync}
                  onCheckedChange={(checked) =>
                    onCustomizationChange('lipSync', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Expression Recognition</Label>
                <Checkbox
                  checked={customization.expressionRecognition}
                  onCheckedChange={(checked) =>
                    onCustomizationChange('expressionRecognition', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Full Body Motion</Label>
                <Checkbox
                  checked={customization.bodyMotion}
                  onCheckedChange={(checked) =>
                    onCustomizationChange('bodyMotion', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Physics-Based Animation</Label>
                <Checkbox
                  checked={customization.physicsEnabled}
                  onCheckedChange={(checked) =>
                    onCustomizationChange('physicsEnabled', checked)
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Autonomous Reactions</Label>
                  <p className="text-sm text-muted-foreground">Avatar responds naturally to interactions</p>
                </div>
                <Checkbox
                  checked={customization.autonomousReactions}
                  onCheckedChange={(checked) =>
                    onCustomizationChange('autonomousReactions', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Voice Cloning</Label>
                  <p className="text-sm text-muted-foreground">Use AI to clone a specific voice</p>
                </div>
                <Checkbox
                  checked={customization.voiceCloning}
                  onCheckedChange={(checked) =>
                    onCustomizationChange('voiceCloning', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Emotion Detection</Label>
                  <p className="text-sm text-muted-foreground">Adapt to audience reactions</p>
                </div>
                <Checkbox
                  checked={customization.emotionDetection}
                  onCheckedChange={(checked) =>
                    onCustomizationChange('emotionDetection', checked)
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="voice" className="space-y-6">
            <VoiceModulationPreview
              pitch={customization.voicePitch || 50}
              speed={customization.voiceSpeed || 50}
              onPreviewComplete={(audioUrl) => {
                // Handle the recorded audio URL if needed
                console.log('Audio preview completed:', audioUrl);
              }}
            />

            <div className="space-y-4">
              <div>
                <Label>Voice Style</Label>
                <Select
                  value={avatar.voiceOptions[customization.voiceStyle || 0]}
                  onValueChange={(value) => onCustomizationChange(
                    'voiceStyle',
                    avatar.voiceOptions.indexOf(value)
                  )}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {avatar.voiceOptions.map((voice) => (
                      <SelectItem key={voice} value={voice}>
                        {voice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Voice Pitch</Label>
                <Slider
                  value={[customization.voicePitch || 50]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => onCustomizationChange('voicePitch', value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Speaking Speed</Label>
                <Slider
                  value={[customization.voiceSpeed || 50]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => onCustomizationChange('voiceSpeed', value[0])}
                  className="mt-2"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="language" className="space-y-4">
            <div>
              <Label>Language</Label>
              <Select
                value={customization.language}
                onValueChange={(value) => onCustomizationChange('language', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {avatar.languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Accent Strength</Label>
              <Slider
                value={[customization.accentStrength || 50]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => onCustomizationChange('accentStrength', value[0])}
                className="mt-2"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-primary/90 hover:bg-primary">
            Apply Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
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

  const startCustomizing = (avatarId: number) => {
    setSelectedAvatar(avatarId);
    setIsCustomizing(true);
    if (!customization[avatarId]) {
      setCustomization(prev => ({
        ...prev,
        [avatarId]: {
          // Basic customization
          voiceStyle: 0,
          voicePitch: 50,
          voiceSpeed: 50,
          outfit: "Business Suit",
          background: "Office",
          expression: "Confident",
          gestures: true,

          // Physical features
          skinTone: "Light",
          hairStyle: "Straight Long",
          faceShape: "Oval",
          eyeColor: "Brown",

          // Advanced motion
          lipSync: true,
          expressionRecognition: true,
          bodyMotion: true,
          physicsEnabled: true,

          // AI behavior
          autonomousReactions: true,
          voiceCloning: false,
          emotionDetection: true,

          // Style & Language
          avatarStyle: "Photorealistic",
          language: "English",
          accentStrength: 50
        }
      }));
    }
  };

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

      <GenerateAvatarSection />

      <div className="grid md:grid-cols-3 gap-6">
        {demoAvatars.map((avatar) => (
          <motion.div
            key={avatar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="group relative overflow-hidden bg-card/30 backdrop-blur-sm border-primary/10">
              <div className="relative h-48 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <UserCircle className="h-20 w-20 text-primary/40" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">
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
              <CustomizationPanel
                avatar={avatar}
                customization={customization[avatar.id] || ({} as CustomizationState)}
                onCustomizationChange={(field, value) => handleCustomizationChange(avatar.id, field, value)}
                onClose={() => setIsCustomizing(false)}
              />
            )}
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}