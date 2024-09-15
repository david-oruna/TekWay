'use client'

import { useState, useRef} from 'react'
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
      if (learningBoardRef.current) {
        smoothScrollTo(learningBoardRef.current.offsetTop, 1000)
      }
    }, 100)
  }

  const smoothScrollTo = (targetPosition: number, duration: number) => {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime: number | null = null

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function easeInOutQuad(t: number, b: number, c: number, d: number) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
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