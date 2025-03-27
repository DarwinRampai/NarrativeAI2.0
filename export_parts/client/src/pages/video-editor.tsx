import { useQuery } from "@tanstack/react-query";
import { Template } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";

export default function VideoEditor() {
  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
        Video Editor
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          Templates
        </h2>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {templates?.map((template) => (
              <Card key={template.id} className="group relative overflow-hidden bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div
                  className="relative h-40 bg-background/50"
                  style={{
                    backgroundImage: `url(${template.thumbnailUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>
                  <Button className="w-full bg-primary/90 hover:bg-primary">
                    <Play className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}