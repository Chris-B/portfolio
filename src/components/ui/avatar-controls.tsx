'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Mic, MessageSquare, Send } from "lucide-react"
import { useAvatarStore } from "~/providers/avatar-store-provider";

export default function AvatarControls() {
  const [speechText, setSpeechText] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { isSitting, togglePosition } = useAvatarStore((state) => state)

  const handleStance = () => {
    togglePosition()
  }

  const handleSpeech = () => {
    // Here you would add logic to trigger text-to-speech with the speechText
    console.log('Speaking:', speechText)
    setSpeechText('')
    setIsDialogOpen(false)
  }

  return (
    <>
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-16 bg-black/30 backdrop-blur-md text-white p-2 border-l border-purple-500/30 rounded-l-lg z-50">
        <div className="space-y-4">
          <Button
            onClick={handleStance}
            className={`w-full aspect-square ${
              isSitting
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-cyan-600 hover:bg-cyan-700"
            } text-white border border-transparent transition-all duration-300 ease-in-out
            hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] focus:shadow-[0_0_20px_rgba(139,92,246,0.7)]`}
          >
            {isSitting ? "Stand" : "Sit"}
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full aspect-square bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700
                text-white border border-transparent transition-all duration-300 ease-in-out
                hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] focus:shadow-[0_0_20px_rgba(139,92,246,0.7)]"
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black/80 border border-purple-500/50 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Enter Speech</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter text to speak..."
                    value={speechText}
                    onChange={(e) => setSpeechText(e.target.value)}
                    className="w-full bg-black/50 border-purple-500/50 text-white placeholder-gray-400
                    focus:border-cyan-400 focus:ring-cyan-400/50 transition-all duration-300 ease-in-out
                    hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  />
                  <Button
                    onClick={handleSpeech}
                    className="absolute right-1 top-1 p-1 bg-transparent hover:bg-purple-500/20
                    text-purple-400 hover:text-cyan-400 rounded-full transition-all duration-300 ease-in-out"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            className="w-full aspect-square bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700
            text-white border border-transparent transition-all duration-300 ease-in-out
            hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] focus:shadow-[0_0_20px_rgba(139,92,246,0.7)]"
          >
            <Mic className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  )
}