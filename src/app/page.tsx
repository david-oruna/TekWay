'use client'

import { useState, useRef } from 'react'
import { useChat } from 'ai/react'
import { LandingPageComponent } from '@/components/LandingPage'
import { LearningBoard } from '@/components/LearningBoard'
import { nanoid } from 'nanoid'

export default function Home() {
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null)
  const learningBoardRef = useRef<HTMLDivElement>(null)

  const chatHelpers = useChat({
    initialMessages: [
      {
        id: nanoid(),
        role: 'assistant',
        content: "Hey I'm Tek! Please start by selecting a skill in the roadmap or chat directly from here."
      }
    ],
  })

  const handleCareerSelect = (careerPath: string) => {
    setSelectedCareerPath(careerPath)
    setTimeout(() => {
      learningBoardRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div>
      <LandingPageComponent onCareerSelect={handleCareerSelect} />
      {selectedCareerPath && (
        <div ref={learningBoardRef} className="min-h-screen">
          <LearningBoard
            chatHelpers={chatHelpers}
            careerPathId={selectedCareerPath}
          />
        </div>
      )}
    </div>
  )
}