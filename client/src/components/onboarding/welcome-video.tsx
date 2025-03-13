import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Play, Pause } from 'lucide-react';

export function WelcomeVideo() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
    setIsPlaying(!isPlaying);
  };

  if (!isVisible) return null;

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
                src="https://assets.example.com/welcome-video.mp4"
                autoPlay
                playsInline
                controls={false}
              >
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
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
