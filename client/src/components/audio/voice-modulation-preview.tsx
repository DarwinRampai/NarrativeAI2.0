import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Mic, Square, Play, Pause } from "lucide-react";
import * as Tone from 'tone';
import WaveSurfer from 'wavesurfer.js';

interface VoiceModulationPreviewProps {
  pitch: number;
  speed: number;
  onPreviewComplete?: (audioUrl: string) => void;
}

export function VoiceModulationPreview({
  pitch,
  speed,
  onPreviewComplete
}: VoiceModulationPreviewProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#8b5cf6',
        progressColor: '#6d28d9',
        cursorColor: '#4c1d95',
        barWidth: 2,
        barGap: 1,
        height: 60,
        normalize: true,
        partialRender: true,
      });

      return () => {
        wavesurferRef.current?.destroy();
      };
    }
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        wavesurferRef.current?.load(url);
        if (onPreviewComplete) {
          onPreviewComplete(url);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const togglePlayback = () => {
    if (!wavesurferRef.current) return;

    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const wavesurfer = wavesurferRef.current;
    if (wavesurfer) {
      wavesurfer.on('finish', () => setIsPlaying(false));
    }
  }, []);

  // Update pitch shift effect when pitch changes
  useEffect(() => {
    if (audioUrl && Tone.Transport.state === 'started') {
      const player = new Tone.Player(audioUrl).toDestination();
      const pitchShift = new Tone.PitchShift({
        pitch: (pitch - 50) / 10, // Convert slider value to semitones
      }).toDestination();

      player.chain(pitchShift);
      pitchShiftRef.current = pitchShift;

      return () => {
        player.dispose();
        pitchShift.dispose();
      };
    }
  }, [pitch, audioUrl]);

  return (
    <Card className="w-full bg-card/30 backdrop-blur-sm border-primary/10">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Voice Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          ref={waveformRef} 
          className="w-full rounded-lg bg-background/50 p-4"
        />

        <div className="flex justify-center gap-2">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="icon"
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? (
              <Square className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>

          {audioUrl && (
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlayback}
              disabled={isRecording}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Preview with current settings:</Label>
            <div className="text-sm text-muted-foreground">
              Pitch: {pitch}% • Speed: {speed}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}