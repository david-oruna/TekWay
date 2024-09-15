import { Roadmap } from "./Roadmap"
import { ChatBoxComponent } from "./ChatBox"
import { useChat } from 'ai/react'
import {nanoid} from 'nanoid'





export function LearningBoard() {

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
  
  return (
    <div>
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
    }}
    />
    </div>
  )
}
