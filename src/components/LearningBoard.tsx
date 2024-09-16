'use client'

import { useState, useEffect } from 'react'
import { Roadmap } from '@/components/Roadmap'
import { ChatBoxComponent } from '@/components/ChatBox'
import { Button } from '@/components/ui/button'
import { MessageCircle, Map } from 'lucide-react'
import { nanoid } from 'nanoid'
import { Message } from 'ai'
import { ChatHelpers } from '../types/chat'




interface LearningBoardProps {
  chatHelpers: ChatHelpers;
  careerPathId: string;
}

export function LearningBoard({ chatHelpers, careerPathId }: LearningBoardProps) {
  const [activeView, setActiveView] = useState<'roadmap' | 'chat'>('roadmap')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Adjust this breakpoint as needed
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleInteraction = (message: string) => {
    chatHelpers.setMessages(prevMessages => [
      ...prevMessages,
      { id: nanoid(), role: 'user', content: message } as Message
    ]);
    chatHelpers.reload();
    if (isMobile) {
      setActiveView('chat');
    }
  }

  return (
    <div className="w-full h-screen flex flex-col md:flex-row md:items-start md:justify-center md:space-x-4 p-4 pb-20">
      <div className={`flex overflow-hidden ${isMobile && activeView !== 'roadmap' ? 'hidden' : 'block'} md:w-5/12 md:h-[calc(100vh-2rem)] bg-background rounded-lg shadow-lg`}>
        <Roadmap
          chatHelpers={{
            handleSubmit: handleInteraction,
            setMessages: chatHelpers.setMessages
          }}
          careerPathId={careerPathId}
        />
      </div>
      <div className={`flex-grow overflow-hidden ${isMobile && activeView !== 'chat' ? 'hidden' : 'block'} md:w-5/12 md:h-[calc(100vh-2rem)] bg-background rounded-lg shadow-lg`}>
      <ChatBoxComponent 
  chatHelpers={{
    ...chatHelpers,
    handleSubmit: handleInteraction
  }} 
/>
      </div>
      {isMobile && (
        <div className="flex justify-around p-4 bg-background ">
          <Button
            variant={activeView === 'roadmap' ? 'default' : 'outline'}
            onClick={() => setActiveView('roadmap')}
            className="w-1/2 mr-2 z-50"
          >
            <Map className="mr-2 h-4 w-4" /> Roadmap
          </Button>
          <Button
            variant={activeView === 'chat' ? 'default' : 'outline'}
            onClick={() => setActiveView('chat')}
            className="w-1/2 ml-2 z-50"
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Chat
          </Button>
        </div>
      )}
    </div>
  )
}