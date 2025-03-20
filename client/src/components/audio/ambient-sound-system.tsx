import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { motion, useAnimation } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AmbientSoundSystemProps {
  mood?: 'focused' | 'creative' | 'relaxed' | 'energetic';
  intensity?: number;
}

export function AmbientSoundSystem({ 
  mood = 'focused',
  intensity = 0.5 
}: AmbientSoundSystemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const effectsRef = useRef<{
    reverb: Tone.Reverb;
    delay: Tone.FeedbackDelay;
    filter: Tone.Filter;
  } | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    // Initialize Tone.js instruments and effects
    synthRef.current = new Tone.PolySynth().toDestination();
    effectsRef.current = {
      reverb: new Tone.Reverb({ decay: 4, wet: 0.3 }).toDestination(),
      delay: new Tone.FeedbackDelay("8n", 0.2).toDestination(),
      filter: new Tone.Filter(1000, "lowpass").toDestination()
    };

    // Connect synth through effects chain
    if (synthRef.current && effectsRef.current) {
      synthRef.current.connect(effectsRef.current.reverb)
                     .connect(effectsRef.current.delay)
                     .connect(effectsRef.current.filter);
    }

    return () => {
      // Cleanup
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      if (effectsRef.current) {
        Object.values(effectsRef.current).forEach(effect => effect.dispose());
      }
    };
  }, []);

  useEffect(() => {
    if (!synthRef.current) return;

    // Update sound based on mood
    const moodSettings = {
      focused: {
        notes: ['C4', 'E4', 'G4'],
        filterFreq: 1000,
        reverbDecay: 2
      },
      creative: {
        notes: ['D4', 'F#4', 'A4', 'C5'],
        filterFreq: 2000,
        reverbDecay: 4
      },
      relaxed: {
        notes: ['G3', 'B3', 'D4'],
        filterFreq: 800,
        reverbDecay: 6
      },
      energetic: {
        notes: ['E4', 'G#4', 'B4', 'D5'],
        filterFreq: 3000,
        reverbDecay: 1
      }
    };

    const settings = moodSettings[mood];
    
    if (effectsRef.current) {
      effectsRef.current.filter.frequency.value = settings.filterFreq;
      effectsRef.current.reverb.decay = settings.reverbDecay;
    }

    if (isPlaying) {
      // Start ambient sound generation
      const interval = setInterval(() => {
        const note = settings.notes[Math.floor(Math.random() * settings.notes.length)];
        synthRef.current?.triggerAttackRelease(note, "8n", undefined, 0.1 * intensity);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [mood, intensity, isPlaying]);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = Tone.gainToDb(volume);
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!isPlaying) {
      await Tone.start();
      setIsPlaying(true);
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 }
      });
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <motion.div 
      className="fixed bottom-6 right-6 flex items-center gap-4 p-4 rounded-full bg-background/60 backdrop-blur-xl border border-primary/10 shadow-lg"
      animate={controls}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className="relative group"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/10"
          initial={{ scale: 0 }}
          animate={{ scale: isPlaying ? 1.5 : 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-primary" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </Button>

      <div className="w-32">
        <Slider
          value={[volume * 100]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0] / 100)}
          className="w-full"
        />
      </div>
    </motion.div>
  );
}
