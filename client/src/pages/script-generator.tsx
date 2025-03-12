import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import { useLocation } from "wouter";

const scriptSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  tone: z.string().min(1, "Tone is required"),
  audience: z.string().min(1, "Target audience is required"),
});

export default function ScriptGenerator() {
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [, params] = useLocation();
  const projectId = new URLSearchParams(params).get("projectId");

  const form = useForm({
    resolver: zodResolver(scriptSchema),
    defaultValues: {
      prompt: "",
      tone: "",
      audience: "",
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (data: z.infer<typeof scriptSchema>) => {
      const res = await apiRequest(
        "POST",
        `/api/projects/${projectId}/scripts/generate`,
        data
      );
      return res.json();
    },
    onSuccess: (data) => {
      setGeneratedScript(data.content);
    },
  });

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
        Script Generator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) =>
                    generateMutation.mutate(data)
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What would you like to advertise?</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            className="bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tone of Voice</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                            placeholder="e.g. Professional, Casual, Energetic"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                            placeholder="e.g. Young professionals, Parents, Tech enthusiasts"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={generateMutation.isPending}
                    className="w-full bg-primary/90 hover:bg-primary"
                  >
                    {generateMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Generate Script
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
        </div>

        <div className="relative">
          <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Generated Script
              </h2>
              {generatedScript ? (
                <div className="whitespace-pre-wrap">{generatedScript}</div>
              ) : (
                <p className="text-muted-foreground">
                  Your generated script will appear here
                </p>
              )}
            </CardContent>
          </Card>
          <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
        </div>
      </div>
    </AppLayout>
  );
}