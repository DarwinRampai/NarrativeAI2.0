import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Loader2, Play, UserCircle, Volume2 } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import { motion } from "framer-motion";

interface Avatar {
  id: number;
  name: string;
  previewUrl: string;
  description: string;
  voiceOptions: string[];
}

const demoAvatars: Avatar[] = [
  {
    id: 1,
    name: "Professional Emma",
    previewUrl: "/avatars/emma.mp4",
    description: "Perfect for corporate communications and business presentations",
    voiceOptions: ["Professional", "Friendly", "Energetic"]
  },
  {
    id: 2,
    name: "Tech Expert Alex",
    previewUrl: "/avatars/alex.mp4",
    description: "Ideal for technology product demonstrations and tutorials",
    voiceOptions: ["Technical", "Casual", "Engaging"]
  },
  {
    id: 3,
    name: "Creative Sarah",
    previewUrl: "/avatars/sarah.mp4",
    description: "Great for creative and artistic content",
    voiceOptions: ["Artistic", "Inspirational", "Relaxed"]
  }
];

export default function AvatarsPage() {
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Voice Style</Label>
                    <span className="text-sm text-primary">{avatar.voiceOptions[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      defaultValue={[0]}
                      max={avatar.voiceOptions.length - 1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
                <Button className="w-full bg-primary/90 hover:bg-primary">
                  Customize Avatar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}
