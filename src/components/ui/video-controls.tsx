'use client'

import { Button } from "~/components/ui/button"
import { useVideoStore } from "~/providers/video-store-provider"
import { Loader2 } from "lucide-react"
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";

function loadAudio(audioBuffer: AudioBuffer) {

  if(audioBuffer){
    const audioListener = new THREE.AudioListener();
    const audioTemp = new THREE.Audio(audioListener);
    audioTemp.setBuffer(audioBuffer);
    audioTemp.setLoop(true);
    audioTemp.autoplay = false;
    audioTemp.setVolume(0);
    return audioTemp
  }

  return null

}

export default function VideoControls() {
  const { videoLoaded, isPlaying, setIsPlaying, audio, videoElement, videoSrc, audioLoaded, setAudio } = useVideoStore((state) => state)

  const audioBuffer = useLoader(THREE.AudioLoader, videoSrc)

  const toggleVideo = () => {
    if (!audioLoaded) {
      const tempAudio = loadAudio(audioBuffer)
      if (tempAudio) {
        setAudio(tempAudio)
      }
      console.log("Loading Audio")
    }
    if (audio && videoElement) {
      if (!isPlaying) {
        setIsPlaying(true)
        audio.setVolume(0.5)
        audio.play()
        void videoElement.play()
      } else {
        setIsPlaying(false)
        audio.pause()
        videoElement.pause()
      }
    }
  }

  return (
    <div className="fixed left-1/2 top-[80%] transform -translate-x-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md text-white p-4 border border-purple-500/30 rounded-lg z-50 md:scale-100 scale-75">
      <div className="flex flex-col items-center justify-center h-16">
        {!videoLoaded ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" aria-hidden="true" />
            <p className="text-sm mt-2" aria-live="polite">Loading video...</p>
          </div>
        ) : (
          <Button
            onClick={toggleVideo}
            className="bg-cyan-600 hover:bg-cyan-700 text-white border border-transparent transition-all duration-300 ease-in-out
            hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] focus:shadow-[0_0_20px_rgba(139,92,246,0.7)]"
          >
            {isPlaying ? 'Stop' : 'Play'}
          </Button>
        )}
      </div>
    </div>
  )
}