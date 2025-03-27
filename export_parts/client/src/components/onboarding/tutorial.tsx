import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  targetId: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to NarratixAI",
    description: "Let's take a quick tour of our powerful AI-driven ad creation platform.",
    targetId: "welcome",
    placement: "center"
  },
  {
    title: "Create Your First Ad",
    description: "Click here to start creating your first AI-powered advertisement.",
    targetId: "create-ad-button",
    placement: "bottom"
  },
  {
    title: "Performance Metrics",
    description: "Monitor your ad performance with our intuitive analytics dashboard.",
    targetId: "metrics-grid",
    placement: "bottom"
  },
  {
    title: "AI Recommendations",
    description: "Get smart suggestions to optimize your ad campaigns.",
    targetId: "ai-recommendations",
    placement: "left"
  },
  {
    title: "Performance Forecast",
    description: "View predictive analytics and future performance trends.",
    targetId: "performance-forecast",
    placement: "top"
  }
];

export function OnboardingTutorial() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<DOMRect | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has completed tutorial before
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    if (tutorialCompleted) {
      setIsVisible(false);
      return;
    }

    // Update target element position
    const updateTargetPosition = () => {
      const step = tutorialSteps[currentStep];
      if (step.targetId === 'welcome') {
        setTargetElement(null);
        return;
      }

      const element = document.getElementById(step.targetId);
      if (element) {
        setTargetElement(element.getBoundingClientRect());
      }
    };

    updateTargetPosition();
    window.addEventListener('resize', updateTargetPosition);
    return () => window.removeEventListener('resize', updateTargetPosition);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTutorial();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeTutorial = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    setIsVisible(false);
    toast({
      title: "Tutorial Completed!",
      description: "You're all set to start creating amazing ads with AI.",
    });
  };

  const handleSkip = () => {
    const shouldSkip = window.confirm("Are you sure you want to skip the tutorial? You can always restart it from the help menu.");
    if (shouldSkip) {
      completeTutorial();
    }
  };

  if (!isVisible) return null;

  const currentTutorialStep = tutorialSteps[currentStep];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Tutorial card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="pointer-events-auto fixed transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: targetElement 
              ? `${targetElement.left + targetElement.width / 2}px`
              : '50%',
            top: targetElement
              ? `${targetElement.top + targetElement.height + 20}px`
              : '50%',
          }}
        >
          <Card className="w-[400px] p-6 shadow-lg bg-background/95 backdrop-blur border-primary/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{currentTutorialStep.title}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleSkip}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-6">
              {currentTutorialStep.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  size="sm"
                  onClick={handleNext}
                >
                  {currentStep === tutorialSteps.length - 1 ? (
                    'Finish'
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {currentStep + 1} / {tutorialSteps.length}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Highlight target element */}
        {targetElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute border-2 border-primary rounded-lg pointer-events-none"
            style={{
              left: targetElement.left - 4,
              top: targetElement.top - 4,
              width: targetElement.width + 8,
              height: targetElement.height + 8,
            }}
          >
            <div className="absolute inset-0 bg-primary/10 rounded-lg" />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
