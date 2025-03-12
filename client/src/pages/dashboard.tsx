import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Link } from "wouter";
import AppLayout from "@/components/layout/app-layout";

export default function Dashboard() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Projects</h1>
        <Button className="bg-primary/90 hover:bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <Card key={project.id} className="group relative overflow-hidden bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex space-x-2">
                  <Link href={`/script-generator?projectId=${project.id}`}>
                    <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm hover:bg-primary/10">
                      Generate Script
                    </Button>
                  </Link>
                  <Link href={`/video-editor?projectId=${project.id}`}>
                    <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm hover:bg-primary/10">
                      Edit Video
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
}