import { Cpu, Database } from "lucide-react"

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm text-white py-1 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center relative">
          <div className="z-10">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse">
              Data Dynamics LLC
            </h2>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2">
          <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500/40 animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2">
          <Database className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400/40 animate-pulse" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-400/5 pointer-events-none"></div>
    </footer>
  )
}