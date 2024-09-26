'use client'

import { Button } from "~/components/ui/button"
import { useVideoStore } from "~/providers/video-store-provider"

export default function VideoControls() {

  const { isPlaying, toggleVideo } = useVideoStore((state) => state)

  const playVideo = () => {
    if(!isPlaying) {
      toggleVideo()
    }
  }

  if (isPlaying) {
    return null
  }

  return (
    <>
      <div className="fixed left-1/2 top-[90%] transform -translate-x-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md text-white p-2 border border-purple-500/30 rounded-lg z-50  md:scale-100 scale-75">
        <div className="flex space-x-4">
          <Button
            onClick={playVideo}
            className={` ${
              isPlaying
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-cyan-600 hover:bg-cyan-700"
            } text-white border border-transparent transition-all duration-300 ease-in-out
            hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] focus:shadow-[0_0_20px_rgba(139,92,246,0.7)]`}
          >
            {isPlaying ? "Stop" : "Play"}
          </Button>
        </div>
      </div>
    </>
  )
}