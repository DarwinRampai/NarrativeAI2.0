import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Play, Pause } from 'lucide-react';

export function WelcomeVideo() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
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
        video.play().catch(error => {
          console.error('Video playback failed:', error);
          setHasError(true);
          toast({
            title: "Video Playback Error",
            description: "There was an error playing the video. Please try again later.",
            variant: "destructive",
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    toast({
      title: "Video Loading Error",
      description: "There was an error loading the video. Please try again later.",
      variant: "destructive",
    });
  };

  if (!isVisible) return null;

  // Video sections based on prompt
  const sections = [
    { time: 0, title: "Opening: Welcome to NarratixAI" },
    { time: 10, title: "AI-Powered Ad Creation" },
    { time: 30, title: "Advanced Neural Avatars" },
    { time: 50, title: "Your Journey Begins" }
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
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white mb-4">Failed to load video</p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setIsLoading(true);
                        setHasError(false);
                        const video = document.querySelector('video');
                        if (video) video.load();
                      }}
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              )}

              <video
                className="w-full h-full object-cover"
                src="/assets/onboarding/welcome.mp4"
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={handleLoadedData}
                onError={handleError}
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