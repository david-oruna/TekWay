'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, Send, Plus } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'



export function ChatBoxComponent({ chatHelpers }) {
  if (!chatHelpers) {
    console.error('ChatBoxComponent: chatHelpers is undefined')
    return null // or return a loading state
  }

  const { messages, input, handleInputChange, handleSubmit, setMessages } = chatHelpers
  const [darkMode, setDarkMode] = useState(false)
  const [showLevels, setShowLevels] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (option: string) => {
    chatHelpers.handleSubmit(option);
    setShowLevels(false);
    setShowOptions(false);
  }

  const handleClearChat = () => {
    setMessages([]);
    handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    // If you have an initial message from the AI, you might want to add it here
  }

  useEffect(() => {
    console.log("ChatBox: Messages updated", messages)
  }, [messages])

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'assistant') {
      setShowLevels(lastMessage.content.toLowerCase().includes('current level'))
      setShowOptions(lastMessage.content.toLowerCase().includes('looking for'))
    }
  }, [messages])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Card className={`w-full h-full flex flex-col ${darkMode ? 'dark' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">TekChat</CardTitle>
        <div className="flex items-center space-x-2 z-10">
          <Sun className="h-4 w-4" />
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <Moon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={message.id} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {message.role === 'assistant' ? (
                  <ReactMarkdown
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            {...props}
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code {...props} className={className}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
              {message.role === 'assistant' && index === messages.length - 1 && (
                <div className="flex flex-wrap  gap-6 mt-6">
                  {showLevels && ["Just starting ✌️", 'Got some experience 😌', 'Expert 😎'].map((level) => (
                    <Button key={level} variant="outline" size="lg" onClick={() => handleOptionClick(level)}>
                      {level}
                    </Button>
                  ))}
                  {showOptions && ['Learning ✍️', 'Resources 📚', 'Project Ideas 💡'].map((option) => (
                    <Button key={option} variant="outline" size="lg" onClick={() => handleOptionClick(option)}>
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={(e) => {
          e.preventDefault();
          chatHelpers.handleSubmit(input);
          chatHelpers.setInput('');
        }} className="flex w-full items-center space-x-2 z-10">
           <Button type="button" size="icon" variant="outline" onClick={handleClearChat} title="New Chat">
            <Plus className="h-4 w-4" />
          </Button>
          <Input 
            type="text" 
            placeholder="Type your message..." 
            value={input} 
            onChange={handleInputChange}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
         
        </form>
      </CardFooter>
    </Card>
  )
}