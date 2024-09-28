'use client'

import { Button } from "~/components/ui/button";
import { useVideoStore } from "~/providers/video-store-provider";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";

import { api } from "~/trpc/react";

type VideoResponse = {
  videoPath: string;
};

export default function VideoControls() {
  const { videoLoaded, isPlaying, setIsPlaying, audio, videoElement, videoSrc, setVideoSrc } = useVideoStore((state) => state);

  const [inputLink, setInputLink] = useState("");
  const isIPhone = true;
  const [iphoneAudio, setIphoneAudio] = useState<HTMLAudioElement | null>(null);
  const [inputSubmitted, setInputSubmitted] = useState(false);

  const toggleVideo = () => {
    if (videoSrc && audio && videoElement) {
      if (!isPlaying) {
        setIsPlaying(true);
        const tempAudio = document.createElement("audio");
        tempAudio.autoplay = false;
        tempAudio.muted = true;
        tempAudio.preload = "auto";
        tempAudio.src = videoSrc;
        tempAudio.currentTime = videoElement.currentTime;
        tempAudio.load();
        void tempAudio.play();
        setIphoneAudio(tempAudio);
        audio.setVolume(0.5);
        audio.play();
        void videoElement.play();
      } else {
        setIsPlaying(false);
        audio.pause();
        if (isIPhone && iphoneAudio) {
          iphoneAudio.pause();
        }
        videoElement.pause();
      }
    }
  };

  // Updated to match the new youtubeRouter API
  const { data: mp4Video, refetch, isLoading } = api.youtube.getVideoUrl.useQuery(
    { url: inputLink },
    {
      enabled: false, // Disable automatic fetching
      select: (data) => data as VideoResponse, // Cast the result to the VideoResponse type
    }
  );

  useEffect(() => {
    if (inputSubmitted) {
      refetch().then(() => {
        console.log('here 1')
        if (mp4Video?.videoPath) {
          console.log('here 2')
          setVideoSrc('/video.mp4'); // Set the path returned by the server
          setInputSubmitted(false); // Reset input submission state
        }
      }).catch((error) => console.error(error));
    }
  }, [inputSubmitted, mp4Video, refetch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputSubmitted(true);
  };

  return (
    <div className="fixed left-1/2 top-[87%] z-50 -translate-x-1/2 -translate-y-1/2 scale-75 transform rounded-lg border border-purple-500/30 bg-black/30 p-4 text-white backdrop-blur-md md:scale-100">
      <div className="flex h-16 flex-col items-center justify-center">
        {!videoSrc ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter video URL"
              value={inputLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputLink(e.target.value)}
              className="border-cyan-600 bg-transparent text-white"
            />
            <Button
              type="submit"
              className="bg-cyan-600 text-white hover:bg-cyan-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Set Video"
              )}
            </Button>
          </form>
        ) : !videoLoaded ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" aria-hidden="true" />
            <p className="mt-2 text-sm" aria-live="polite">Loading video...</p>
          </div>
        ) : (
          <Button
            onClick={toggleVideo}
            className="border border-transparent bg-cyan-600 text-white transition-all duration-300 ease-in-out hover:bg-cyan-700 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] focus:shadow-[0_0_20px_rgba(139,92,246,0.7)]"
          >
            {isPlaying ? "Stop" : "Play"}
          </Button>
        )}
      </div>
    </div>
  );
}