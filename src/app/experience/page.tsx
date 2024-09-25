'use client'

import React, { useState, useEffect } from 'react'
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2019 - Present",
    description: [
      "Lead a team of 5 developers in creating scalable web applications",
      "Implemented microservices architecture, improving system reliability by 30%",
      "Mentored junior developers and conducted code reviews"
    ]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions LLC",
    period: "2016 - 2019",
    description: [
      "Developed and maintained multiple client-facing web applications",
      "Integrated third-party APIs and services to enhance application functionality",
      "Optimized database queries, reducing average query time by 40%"
    ]
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "StartUp Ventures",
    period: "2014 - 2016",
    description: [
      "Assisted in the development of responsive web designs",
      "Collaborated with the design team to implement UI/UX improvements",
      "Participated in daily stand-ups and sprint planning meetings"
    ]
  },
  {
    id: 4,
    title: "Big Chiller",
    company: "Chilling",
    period: "Since Birth",
    description: [
      "Assisted in the development of responsive web designs",
      "Collaborated with the design team to implement UI/UX improvements",
      "Participated in daily stand-ups and sprint planning meetings"
    ]
  }
]

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Card className="w-full bg-black/80 text-white border border-purple-500 hover:border-cyan-400 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          {experience.title}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {experience.company} | {experience.period}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-gray-300">
          {experience.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function ExperiencePage() {

  return (
    <div className="min-h-screen bg-black text-white  pt-20 pb-20 px-5">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        Experience
      </h1>

      <div className="space-y-8">
        {experiences.map(experience => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  )
}