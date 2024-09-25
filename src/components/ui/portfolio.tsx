import { useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card"

interface Project {
  id: number;
  name: string;
  description: string;
  github: string;
  live: string;
}

const projects: Project[] = [
  { id: 1, name: "Cyberpunk Portfolio", description: "A 3D portfolio website built with React Three Fiber", github: "https://github.com/yourusername/cyberpunk-portfolio", live: "https://cyberpunk-portfolio.vercel.app" },
  { id: 2, name: "AI Chatbot", description: "An intelligent chatbot powered by machine learning", github: "https://github.com/yourusername/ai-chatbot", live: "https://ai-chatbot-demo.vercel.app" },
  { id: 3, name: "Blockchain Explorer", description: "A tool for visualizing blockchain data", github: "https://github.com/yourusername/blockchain-explorer", live: "https://blockchain-explorer.vercel.app" },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="w-full bg-black/80 text-white border border-purple-500 hover:border-cyan-400 transition-colors">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription className="text-gray-300">{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700
                     text-white border border-transparent transition-all duration-300 ease-in-out
                     hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] focus:shadow-[0_0_20px_rgba(139,92,246,0.7)]"
          asChild
        >
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700
                     text-white border border-transparent transition-all duration-300 ease-in-out
                     hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] focus:shadow-[0_0_20px_rgba(139,92,246,0.7)]"
          asChild
        >
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function Portfolio() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed inset-0 flex items-end justify-center pb-[34vh] pointer-events-none z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group pointer-events-auto"
        >
          <span className="sr-only">Open Portfolio</span>
          {'PORTFOLIO'.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block text-5xl font-bold transition-all duration-300 ease-in-out
                         hover:text-cyan-400 group-hover:animate-float"
              style={{
                textShadow: `
                  1px 1px 0 #8B5CF6,
                  2px 2px 0 #7C3AED,
                  3px 3px 0 #6D28D9,
                  4px 4px 0 #5B21B6,
                  5px 5px 0 #4C1D95,
                  6px 6px 10px rgba(0, 0, 0, 0.5)
                `,
                animation: `float 2s ease-in-out infinite ${index * 0.1}s`,
                color: '#E5E7EB', // Light gray color
              }}
            >
              {letter}
            </span>
          ))}
        </button>
      </div>

      <div className={`fixed inset-y-0 left-0 w-full md:w-96 bg-black/30 text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}>
        <Button
          className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700
                     text-white border border-transparent transition-all duration-300 ease-in-out
                     hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] focus:shadow-[0_0_20px_rgba(139,92,246,0.7)]"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
        <div className="h-full overflow-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Portfolio
          </h1>
          <div className="space-y-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  )
}