import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Wand2, Eye } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";
import { motion } from "framer-motion";
import * as THREE from 'three';
import { PersonalityGenerator } from "@/components/avatar/personality-generator";

export default function CustomAvatarPage() {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [personalityProfile, setPersonalityProfile] = useState<any>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!previewContainerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      previewContainerRef.current.clientWidth / previewContainerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(
      previewContainerRef.current.clientWidth,
      previewContainerRef.current.clientHeight
    );
    previewContainerRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 5;

    // Create a placeholder model (sphere)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x6d28d9 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    modelRef.current = sphere;

    // Store refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Animation loop
    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (renderer && previewContainerRef.current) {
        previewContainerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Here we would integrate with AI to generate the avatar
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Set a placeholder URL for now
      setAvatarUrl("/placeholder-avatar.glb");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePersonalityGenerated = (personality: any) => {
    setPersonalityProfile(personality);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold gradient-heading mb-6">
          Create Custom Avatar
        </h1>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Avatar Generation Form */}
          <div className="space-y-6">
            <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Generate Avatar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Describe Your Avatar</Label>
                  <Textarea
                    placeholder="Describe the avatar you want to create... For example: 'A professional female presenter in her 30s with shoulder-length brown hair, wearing a navy business suit. She should have a warm and approachable demeanor, suitable for corporate training videos.'"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-32 bg-background/50 backdrop-blur-sm border-primary/10 focus:border-primary/30"
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  className="w-full bg-primary/90 hover:bg-primary"
                  disabled={!description.trim() || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Avatar...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Avatar
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <PersonalityGenerator onPersonalityGenerated={handlePersonalityGenerated} />
          </div>

          {/* 3D Avatar Preview */}
          <Card className="bg-card/30 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Avatar Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={previewContainerRef}
                className="relative aspect-square rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10"
              >
                {!avatarUrl && (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Generate an avatar to see preview
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}