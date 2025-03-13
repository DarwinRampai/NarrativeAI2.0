import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { UserInteraction, FeatureRecommendation } from "@shared/schema";

export function useFeatureRecommendations() {
  const [location] = useLocation();

  // Record user interaction
  const recordInteractionMutation = useMutation({
    mutationFn: async (data: {
      featurePath: string;
      interactionType: string;
      metadata?: any;
    }) => {
      const res = await fetch("/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  });

  // Get recommendations
  const { data: recommendations, isLoading: isLoadingRecommendations } = useQuery<{
    recommendations: FeatureRecommendation[];
  }>({
    queryKey: ["/api/recommendations", location],
    queryFn: async () => {
      const res = await fetch(`/api/recommendations?feature=${encodeURIComponent(location)}`);
      return res.json();
    },
  });

  // Get behavior insights
  const { data: insights, isLoading: isLoadingInsights } = useQuery({
    queryKey: ["/api/behavior-insights"],
    queryFn: async () => {
      const res = await fetch("/api/behavior-insights");
      return res.json();
    },
  });

  // Record page view on route change
  React.useEffect(() => {
    if (location) {
      recordInteractionMutation.mutate({
        featurePath: location,
        interactionType: "view",
      });
    }
  }, [location]);

  // Record feature interaction
  const recordFeatureInteraction = async (
    featurePath: string,
    interactionType: string,
    metadata?: any
  ) => {
    await recordInteractionMutation.mutateAsync({
      featurePath,
      interactionType,
      metadata,
    });
    // Invalidate recommendations to get fresh ones after new interaction
    queryClient.invalidateQueries({ queryKey: ["/api/recommendations"] });
  };

  return {
    recommendations: recommendations?.recommendations || [],
    insights,
    isLoading: isLoadingRecommendations || isLoadingInsights,
    recordFeatureInteraction,
  };
}
