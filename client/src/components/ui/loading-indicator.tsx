import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface LoadingIndicatorProps {
  steps?: Step[];
  currentStep?: number;
  title?: string;
  description?: string;
}

export function LoadingIndicator({ 
  steps,
  currentStep = 0,
  title = "Loading...",
  description = "Please wait while we process your request"
}: LoadingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center space-y-6 p-8"
    >
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        {steps && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: (currentStep + 1) / steps.length }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-2"
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </motion.div>

      {steps && (
        <div className="space-y-4 w-full max-w-md">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.5,
                x: 0 
              }}
              className="flex items-start space-x-4"
            >
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center
                  ${index <= currentStep ? 'bg-primary' : 'bg-primary/20'}`}
              >
                {index < currentStep ? (
                  '✓'
                ) : (
                  (index + 1).toString()
                )}
              </div>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function AdGenerationLoading({ stage }: { stage: number }) {
  const steps: Step[] = [
    { title: "Analyzing requirements...", description: "Gathering information for ad generation." },
    { title: "Generating creative concepts...", description: "Creating initial ad concepts." },
    { title: "Crafting neural avatars...", description: "Generating avatars for the ad." },
    { title: "Optimizing for target audience...", description: "Tailoring the ad to the target audience." },
    { title: "Finalizing your ad...", description: "Putting the finishing touches on your ad." }
  ];

  return (
    <LoadingIndicator
      steps={steps}
      currentStep={stage - 1}
    />
  );
}