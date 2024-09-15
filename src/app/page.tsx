'use client'

import { useState, useRef } from 'react'
import { useChat } from 'ai/react'
import { Roadmap } from '@/components/Roadmap'
import { ChatBoxComponent } from '@/components/ChatBox'
import { LandingPageComponent } from '@/components/LandingPage'
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

  const handleRoadmapInteraction = (message: string) => {
    chatHelpers.setMessages(prevMessages => [
      ...prevMessages,
      { id: nanoid(), role: 'user', content: message }
    ]);
    chatHelpers.reload();
  }

  const handleCareerSelect = (careerPath: string) => {
    setSelectedCareerPath(careerPath)
    setTimeout(() => {
      if (learningBoardRef.current) {
        const startPosition = window.pageYOffset
        const targetPosition = learningBoardRef.current.getBoundingClientRect().top + window.pageYOffset
        const distance = targetPosition - startPosition
        let startTime: number | null = null

        function animation(currentTime: number) {
          if (startTime === null) startTime = currentTime
          const timeElapsed = currentTime - startTime
          const run = easeInOutQuad(timeElapsed, startPosition, distance, 1000)
          window.scrollTo(0, run)
          if (timeElapsed < 1000) requestAnimationFrame(animation)
        }

        function easeInOutQuad(t: number, b: number, c: number, d: number) {
          t /= d / 2
          if (t < 1) return c / 2 * t * t + b
          t--
          return -c / 2 * (t * (t - 2) - 1) + b
        }

        requestAnimationFrame(animation)
      }
    }, 100)
  }

  return (
    <div>
      <LandingPageComponent onCareerSelect={handleCareerSelect} />
      {selectedCareerPath && (
        <div ref={learningBoardRef} className="min-h-screen flex items-start pt-20">
          <Roadmap 
            chatHelpers={{
              handleSubmit: handleRoadmapInteraction,
              setMessages: chatHelpers.setMessages
            }} 
            careerPathId={selectedCareerPath} 
          />
          <ChatBoxComponent chatHelpers={{
            ...chatHelpers,
            handleSubmit: (event, data) => {
              chatHelpers.handleSubmit(event, data);
            },
            setMessages: (updater) => {
              chatHelpers.setMessages(updater);
              chatHelpers.reload();
            }
          }} />   
        </div>
      )}
    </div>
  )
}