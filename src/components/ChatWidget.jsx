import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const CHAT_SESSION_STORAGE_KEY = 'eloProtectionChatSessionId'

const generateSessionId = () =>
  `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! Welcome to Elo Protection Orlando. How can we help?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId] = useState(() => {
    if (typeof window === 'undefined') {
      return generateSessionId()
    }

    const storedId = sessionStorage.getItem(CHAT_SESSION_STORAGE_KEY)
    if (storedId) {
      return storedId
    }
    const newId = generateSessionId()
    sessionStorage.setItem(CHAT_SESSION_STORAGE_KEY, newId)
    return newId
  })

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await fetch('https://n8n.unadigital.dev/webhook/16c98758-804a-429b-99c3-7c43db4076bc/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          action: 'send_message',
          chatInput: messageText,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        const data = await response.json()

        const botReply = data?.output || data?.response || data?.message || data?.reply

        const botMessage = {
          id: Date.now() + 1,
          text: botReply || 'Thanks for your message! Our team will connect with you shortly.',
          sender: 'bot',
          timestamp: new Date()
        }

        setTimeout(() => {
          setMessages(prev => [...prev, botMessage])
          setIsTyping(false)
        }, 1000)
      } else {
        throw new Error('Server response error')
      }
    } catch (error) {
      console.error('Error sending message:', error)

      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, something went wrong. Please try again or reach us on WhatsApp: (19) 99934-0914.',
        sender: 'bot',
        timestamp: new Date()
      }

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage])
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white dark:text-primary rounded-full p-4 shadow-lg animate-pulse"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 bg-background border border-border rounded-lg shadow-xl transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-80 h-96'
        }`}>
          <div className="flex items-center justify-between p-4 bg-green-600 text-white dark:text-primary rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Elo Protection Chat</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMinimize}
                className="text-white dark:text-primary hover:bg-green-700 h-8 w-8"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-white dark:text-primary hover:bg-green-700 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 p-4 h-64 overflow-y-auto bg-muted/20">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-green-600 text-white dark:text-primary'
                            : 'bg-background border border-border text-foreground'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-background border border-border text-foreground px-3 py-2 rounded-lg text-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-background text-foreground text-sm"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-green-600 hover:bg-green-700 text-white dark:text-primary p-2"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default ChatWidget

