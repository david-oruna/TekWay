'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, Github, HelpCircle, Linkedin, Twitter } from "lucide-react"
import Link from 'next/link'

interface LandingPageProps {
  onCareerSelect: (careerPath: string) => void;
}

export function LandingPageComponent({ onCareerSelect }: LandingPageProps) {
  const [showCareerSelect, setShowCareerSelect] = useState(false)
  const careerSelectRef = useRef<HTMLDivElement>(null)

  const handleStartJourney = () => {
    setShowCareerSelect(true)
  }

  const handleCareerSelect = (value: string) => {
    onCareerSelect(value)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between text-foreground relative overflow-visible">
    <div className="absolute top-4 left-10 flex items-center space-x-4">
      <Link href="/" className="flex items-center space-x-2">
        <img src="/images/logo.svg" alt="TekWay" width={40} height={40} />
      </Link>
    </div>

      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <Link href="https://github.com/david-oruna/tekway" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-6 w-6" />
              <span className="sr-only">About TekWay</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About TekWay</DialogTitle>
              <DialogDescription>
                TekWay is an innovative platform designed to guide tech professionals through their career journey. 
                We provide interactive skill roadmaps tailored to various tech roles, helping you navigate the 
                ever-evolving landscape of technology careers. Whether you're just starting out or looking to 
                level up your skills, TekWay offers personalized learning paths, industry insights, and 
                practical resources to accelerate your professional growth in the tech industry.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 animate-in fade-in slide-in-from-top duration-700">TekWay</h1>
          <p className="text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            An interactive skill roadmap for your tech career
          </p>
        </header>

        <Button 
          onClick={handleStartJourney}
          className="text-xl py-6 px-8 rounded-full animate-in fade-in slide-in-from-bottom duration-700 delay-500 relative z-10"
        >
          Start your journey
          <ChevronDown className="ml-2 h-5 w-5" />
        </Button>

        {showCareerSelect && (
          <div ref={careerSelectRef} className="mt-24 w-full max-w-md animate-in fade-in slide-in-from-bottom duration-700 relative z-10">
            <Select onValueChange={handleCareerSelect}>
              <SelectTrigger className="w-full text-lg">
                <SelectValue placeholder="Select your career path" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend Developer</SelectItem>
                <SelectItem value="backend">Backend Developer</SelectItem>
                <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                <SelectItem value="devops">DevOps Engineer</SelectItem>
                <SelectItem value="data">Data Scientist</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <footer className="bottom-0 right-0 p-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} TekWay. All rights reserved.
      </footer>

      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      
      <div className="fixed bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="currentColor" fillOpacity="0.1" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,165.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Adjust the top-right SVG */}
      <div className="fixed top-60 right-20 opacity-10 transform translate-x-2/4">
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <path d="M150,300c82.84,0,150-67.16,150-150S232.84,0,150,0,0,67.16,0,150,67.16,300,150,300Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="fixed bottom-0 left-0 opacity-10">
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="150" fill="currentColor"/>
        </svg>
      </div>
    </div>
  )
}