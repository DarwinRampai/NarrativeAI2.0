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
import { Loader2 } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Script Generator</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
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
                            <Textarea {...field} rows={4} />
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
                            <Input {...field} placeholder="e.g. Professional, Casual, Energetic" />
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
                            <Input {...field} placeholder="e.g. Young professionals, Parents, Tech enthusiasts" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={generateMutation.isPending}
                      className="w-full"
                    >
                      {generateMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Generate Script
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Generated Script</h2>
                {generatedScript ? (
                  <div className="whitespace-pre-wrap">{generatedScript}</div>
                ) : (
                  <p className="text-muted-foreground">
                    Your generated script will appear here
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
