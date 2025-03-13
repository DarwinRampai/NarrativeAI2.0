import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PersonalityTraits {
  extraversion: number;
  agreeableness: number;
  conscientiousness: number;
  openness: number;
  emotionalStability: number;
}

interface PersonalityGeneratorProps {
  onPersonalityGenerated: (personality: any) => void;
}

export function PersonalityGenerator({ onPersonalityGenerated }: PersonalityGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [personalityTraits, setPersonalityTraits] = useState<PersonalityTraits>({
    extraversion: 50,
    agreeableness: 50,
    conscientiousness: 50,
    openness: 50,
    emotionalStability: 50
  });
  const [personalityDescription, setPersonalityDescription] = useState<string>('');
  const [speakingStyle, setSpeakingStyle] = useState<string>('professional');

  const handleTraitChange = (trait: keyof PersonalityTraits, value: number[]) => {
    setPersonalityTraits(prev => ({
      ...prev,
      [trait]: value[0]
    }));
  };

  const generatePersonality = async () => {
    setIsGenerating(true);
    try {
      // Here we'll integrate with OpenAI to generate personality traits
      // For now, simulate with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedDescription = `A ${speakingStyle} personality with balanced traits across all dimensions. Shows moderate levels of extraversion, making them adaptable to both social and independent scenarios. Their agreeable nature helps in maintaining positive relationships while staying true to their values.`;
      
      setPersonalityDescription(generatedDescription);
      onPersonalityGenerated({
        traits: personalityTraits,
        description: generatedDescription,
        speakingStyle
      });
    } catch (error) {
      console.error('Error generating personality:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Personality Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Speaking Style</Label>
            <Select value={speakingStyle} onValueChange={setSpeakingStyle}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select speaking style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="authoritative">Authoritative</SelectItem>
                <SelectItem value="empathetic">Empathetic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Extraversion</Label>
              <Slider
                value={[personalityTraits.extraversion]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => handleTraitChange('extraversion', value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Agreeableness</Label>
              <Slider
                value={[personalityTraits.agreeableness]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => handleTraitChange('agreeableness', value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Conscientiousness</Label>
              <Slider
                value={[personalityTraits.conscientiousness]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => handleTraitChange('conscientiousness', value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Openness</Label>
              <Slider
                value={[personalityTraits.openness]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => handleTraitChange('openness', value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Emotional Stability</Label>
              <Slider
                value={[personalityTraits.emotionalStability]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => handleTraitChange('emotionalStability', value)}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={generatePersonality}
          className="w-full bg-primary/90 hover:bg-primary"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Generating Personality...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Generate Personality
            </>
          )}
        </Button>

        {personalityDescription && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary mt-1" />
              <div>
                <Label className="text-sm font-medium">Generated Personality Profile</Label>
                <p className="mt-1 text-sm text-muted-foreground">{personalityDescription}</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
