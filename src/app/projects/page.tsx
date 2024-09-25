'use client'

import React, { useState } from 'react'
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"

interface Project {
  id: number;
  name: string;
  description: string;
  github: string;
  live: string;
  writeup: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: "Cyberpunk Portfolio",
    description: "A 3D portfolio website built with React Three Fiber",
    github: "https://github.com/yourusername/cyberpunk-portfolio",
    live: "https://cyberpunk-portfolio.vercel.app",
    writeup: "This project was an exploration into creating immersive web experiences using React Three Fiber. The goal was to showcase my portfolio in a unique, cyberpunk-themed 3D environment. I faced challenges in optimizing 3D rendering performance and creating intuitive user interactions within a 3D space. To overcome these, I implemented level-of-detail techniques and custom shaders for improved performance, and designed a hybrid 2D/3D UI for better usability.",
    technologies: ["React", "Three.js", "React Three Fiber", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 2,
    name: "AI Chatbot",
    description: "An intelligent chatbot powered by machine learning",
    github: "https://github.com/yourusername/ai-chatbot",
    live: "https://ai-chatbot-demo.vercel.app",
    writeup: "The AI Chatbot project was aimed at creating a responsive and intelligent conversational agent. I utilized natural language processing techniques and machine learning models to understand user inputs and generate contextually relevant responses. One of the main challenges was handling the wide variety of user inputs and maintaining context over long conversations. I addressed this by implementing a context management system and fine-tuning the language model on domain-specific data.",
    technologies: ["Python", "TensorFlow", "Natural Language Processing", "Flask", "React"]
  },
  {
    id: 3,
    name: "Blockchain Explorer",
    description: "A tool for visualizing blockchain data",
    github: "https://github.com/yourusername/blockchain-explorer",
    live: "https://blockchain-explorer.vercel.app",
    writeup: "The Blockchain Explorer project was developed to provide an intuitive interface for exploring and analyzing blockchain data. I worked on creating efficient data structures to handle large volumes of blockchain transactions and implemented real-time updates using WebSocket connections. A significant challenge was optimizing the performance of complex queries on the blockchain data. I solved this by implementing a caching layer and utilizing database indexing strategies for faster data retrieval.",
    technologies: ["Node.js", "Express", "MongoDB", "React", "D3.js", "WebSocket"]
  },
  {
    id: 4,
    name: "Example Project 4",
    description: "A tool for exampling the example",
    github: "https://github.com/yourusername/blockchain-explorer",
    live: "https://blockchain-explorer.vercel.app",
    writeup: "The Blockchain Explorer project was developed to provide an intuitive interface for exploring and analyzing blockchain data. I worked on creating efficient data structures to handle large volumes of blockchain transactions and implemented real-time updates using WebSocket connections. A significant challenge was optimizing the performance of complex queries on the blockchain data. I solved this by implementing a caching layer and utilizing database indexing strategies for faster data retrieval.",
    technologies: ["Node.js", "Express", "MongoDB", "React", "D3.js", "WebSocket"]
  },
]

function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full bg-black/80 text-white border border-purple-500 hover:border-cyan-400 transition-colors">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          {project.name}
        </CardTitle>
        <CardDescription className="text-gray-300">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-purple-800 text-white text-sm rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
          <h4 className="text-lg font-semibold mb-2">Project Details:</h4>
          <p className="text-gray-300">{project.writeup}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
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
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-400 hover:text-purple-400 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Less Info
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              More Info
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function Home() {

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20 px-5">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        Projects
      </h1>
      <div className="space-y-8">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}