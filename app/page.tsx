'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Utensils } from 'lucide-react'
import Message from './components/Message'
import Header from './components/Header'

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const [isFirstInput, setIsFirstInput] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (!isFirstInput) {
      scrollToBottom()
    }
  }, [messages, isFirstInput, scrollToBottom])

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTyping(true)
    setIsFirstInput(false)
    handleSubmit(e)
    // Set a timeout to change isTyping back to false
    setTimeout(() => setIsTyping(false), 100)
  }, [handleSubmit])

  const handleInputFocus = useCallback(() => {
    if (!isFirstInput) {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [isFirstInput])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      <Header />
      <main className="flex-grow container max-w-2xl mx-auto p-4">
        <Card className="w-full h-[calc(100vh-8rem)] flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-700">🍴Allergy Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <Message key={m.id} message={m} />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500">
                <Utensils className="w-4 h-4 animate-spin" />
                <span>Analyzing dish...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter>
            <form onSubmit={onSubmit} className="flex w-full space-x-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="Enter a dish name..."
                className="flex-grow"
              />
              <Button type="submit" disabled={isTyping}>
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
