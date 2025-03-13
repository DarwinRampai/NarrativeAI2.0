import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Play, Pause } from 'lucide-react';

export function WelcomeVideo() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // Check if user has watched the video before
    const hasWatchedVideo = localStorage.getItem('hasWatchedVideo');
    if (!hasWatchedVideo) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasWatchedVideo', 'true');
    setIsVisible(false);
  };

  const togglePlay = () => {
    const video = document.querySelector('video');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  if (!isVisible) return null;

  // Video sections based on prompt
  const sections = [
    { time: 0, title: "Opening" },
    { time: 10, title: "AI-Powered Creation" },
    { time: 30, title: "Advanced Features" },
    { time: 50, title: "Get Started" }
  ];

  const currentSection = sections.reduce((prev, curr) => {
    if (currentTime >= curr.time) return curr;
    return prev;
  }, sections[0]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative z-50 w-full max-w-4xl mx-auto p-4"
        >
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-black">
              <video
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/narratix-onboarding/welcome.mp4"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                playsInline
                controls={false}
              >
                Your browser does not support the video tag.
              </video>

              {/* Progress Timeline */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/20">
                <motion.div 
                  className="h-full bg-primary"
                  style={{ 
                    width: `${(currentTime / 60) * 100}%`,
                    transition: 'width 0.1s linear'
                  }}
                />
              </div>

              {/* Section Markers */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/20 backdrop-blur-sm hover:bg-background/40"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>

                <div className="flex-1 mx-4">
                  <p className="text-sm text-white/80">{currentSection.title}</p>
                </div>

                <Button
                  variant="outline"
                  className="bg-background/20 backdrop-blur-sm hover:bg-background/40"
                  onClick={handleClose}
                >
                  Skip Introduction
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}