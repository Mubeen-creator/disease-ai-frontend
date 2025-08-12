'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageBubble } from './MessageBubble';
import { Send, Loader2 } from 'lucide-react';
import { Message } from '@/types';
import { apiClient } from '@/lib/api';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI medical assistant. I can help you understand symptoms, provide information about diseases, and suggest treatments. Please describe your symptoms or ask me about any medical condition you'd like to know more about.\n\nRemember: This is for educational purposes only and should not replace professional medical advice.",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Typewriter effect function
  const typewriterEffect = (text: string, messageId: string) => {
    setTypingMessageId(messageId);
    let currentIndex = 0;
    
    // Add empty message first
    const emptyMessage: Message = {
      id: messageId,
      content: '',
      role: 'assistant',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, emptyMessage]);
    
    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, content: text.slice(0, currentIndex + 1) }
              : msg
          )
        );
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTypingMessageId(null);
      }
    }, 20); // Adjust speed here (lower = faster)
    
    return () => clearInterval(typeInterval);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await apiClient.sendMessage(inputValue);
      const messageId = (Date.now() + 1).toString();
      
      // Use typewriter effect for AI response
      typewriterEffect(response.response, messageId);
    } catch (error: any) {
      const errorMessageId = (Date.now() + 1).toString();
      const errorText = "I apologize, but I'm having trouble processing your request right now. Please try again later, or contact support if the problem persists.";
      
      // Use typewriter effect for error message too
      typewriterEffect(errorText, errorMessageId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex gap-3 p-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
            </div>
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <p className="text-sm text-gray-600">AI is thinking...</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your symptoms or ask a medical question..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This AI assistant provides educational information only. Always consult healthcare professionals for medical decisions.
        </p>
      </div>
    </div>
  );
}