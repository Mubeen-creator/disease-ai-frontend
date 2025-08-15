'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageBubble } from './MessageBubble';
import { Send, Loader2, Mic, MicOff } from 'lucide-react';
import { Message } from '@/types';
import { apiClient } from '@/lib/api';
import { VoiceVisualizer, TypingIndicator } from '@/components/ui/voice-visualizer';
import Link from 'next/link';

interface ChatInterfaceProps {
  sessionId: string | null;
  onSessionUpdate?: (sessionId: string) => void;
}

export function ChatInterface({ sessionId, onSessionUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Calculate hasMessages early to avoid reference errors
  const hasMessages = messages.length > 0 || isLoading;

  // Simple focus management - only auto-focus on initial load
  useEffect(() => {
    if (!hasMessages && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasMessages]);

  // Load session messages when sessionId changes
  useEffect(() => {
    if (sessionId) {
      loadSessionMessages(sessionId);
    } else {
      // New chat - clear messages to show welcome screen
      setMessages([]);
    }
  }, [sessionId]);

  const loadSessionMessages = async (sessionId: string) => {
    try {
      const sessionMessages = await apiClient.getSessionMessages(sessionId);
      const formattedMessages: Message[] = [];

      // Convert messages directly since they're already in chronological order
      sessionMessages.forEach((msg, index) => {
        formattedMessages.push({
          id: `${msg.role}-${index}-${msg.timestamp}`,
          content: msg.content || msg.query || msg.answer || '', // Handle different field names
          role: msg.role as 'user' | 'assistant',
          timestamp: new Date(msg.timestamp),
        });
      });

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Failed to load session messages:', error);
      setMessages([{
        id: 'error',
        content: "Sorry, I couldn't load the chat history. Let's start fresh!",
        role: 'assistant',
        timestamp: new Date(),
      }]);
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => prev + transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesisRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Speech-to-text functions
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Text-to-speech functions
  const speakMessage = (text: string, messageId: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel();

      // Remove markdown formatting for speech
      const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1')     // Remove italic
        .replace(/#{1,6}\s/g, '')        // Remove headers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
        .replace(/`([^`]+)`/g, '$1');    // Remove code

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakingMessageId(messageId);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      };

      speechSynthesisRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    }
  };

  // Typewriter effect function
  const typewriterEffect = (text: string, messageId: string) => {
    setTypingMessageId(messageId);
    let currentIndex = 0;
    const step = 10; // Number of characters to add at once

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
              ? { ...msg, content: text.slice(0, currentIndex + step) }
              : msg
          )
        );
        currentIndex += step;
      } else {
        clearInterval(typeInterval);
        setTypingMessageId(null);
      }
    }, 5); // You can keep this low
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
      const response = await apiClient.sendMessage(inputValue, sessionId || undefined);
      const messageId = (Date.now() + 1).toString();

      // If this was a new chat, notify parent about the new session
      if (!sessionId && response.session_id && onSessionUpdate) {
        onSessionUpdate(response.session_id);
      }

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

  // Input form component - render directly without memoization to prevent focus issues
  const renderInputForm = (className = "") => (
    <div className={className}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end gap-4 bg-gradient-to-r from-white to-gray-50 rounded-3xl border border-gray-300 p-4 shadow-xl hover:shadow-2xl transition-all duration-300">

          {/* Voice button - left side with enhanced animations */}
          <div className="relative">
            <Button
              type="button"
              onClick={isListening ? stopListening : startListening}
              disabled={isLoading}
              size="sm"
              className={`h-12 w-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden ${isListening
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white scale-110'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 text-gray-600 hover:text-blue-700'
                }`}
              variant="ghost"
            >
              <div className="relative z-10">
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </div>
              {isListening && (
                <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
              )}
            </Button>
            {/* Voice wave animation */}
            {isListening && (
              <div className="absolute -inset-2 pointer-events-none">
                <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-40"></div>
                <div className="absolute inset-1 rounded-full border-2 border-red-300 animate-ping opacity-30" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute inset-2 rounded-full border-2 border-red-200 animate-ping opacity-20" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>

          {/* Enhanced Input field */}
          <div className="flex-1 min-w-0 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your symptoms or ask a medical question..."
              disabled={isLoading}
              className="chat-input border-0 bg-transparent p-0 text-base text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:border-transparent focus:outline-none resize-none min-h-[48px] font-medium"
              style={{ boxShadow: 'none !important', color: '#111827', outline: 'none', border: 'none' }}
              autoFocus={!hasMessages}
            />
            {/* Typing indicator */}
            {inputValue && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Enhanced Send button */}
          <div className="relative">
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              size="sm"
              className={`h-12 w-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden ${
                inputValue.trim() && !isLoading
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white scale-105 hover:scale-110'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="relative z-10">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </div>
              {inputValue.trim() && !isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse opacity-20"></div>
              )}
            </Button>
            {/* Send button glow effect */}
            {inputValue.trim() && !isLoading && (
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-30 animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Enhanced Status indicators */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            {isListening && (
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 rounded-full border border-red-200 shadow-sm">
                <div className="relative">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-40"></div>
                </div>
                <span className="text-sm font-semibold text-red-700">Listening...</span>
                <VoiceVisualizer isActive={true} className="text-red-500" size="sm" />
              </div>
            )}
            {isLoading && !isListening && (
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full border border-blue-200 shadow-sm">
                <TypingIndicator className="text-blue-500" />
                <span className="text-sm font-semibold text-blue-700">AI is processing...</span>
              </div>
            )}
            {typingMessageId && (
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 rounded-full border border-green-200 shadow-sm">
                <TypingIndicator className="text-green-500" />
                <span className="text-sm font-semibold text-green-700">AI is typing...</span>
              </div>
            )}
          </div>
          
          {/* Input character count */}
          {inputValue && (
            <div className="text-xs text-gray-500 font-medium">
              {inputValue.length} characters
            </div>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div className="h-screen flex flex-col relative bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {!hasMessages ? (
        // Welcome Screen with Centered Input (ChatGPT Style)
        <div className="flex-1 flex flex-col justify-center items-center px-6">
          <div className="w-full max-w-3xl mx-auto space-y-8">
            {/* Heading above input */}
            <div className="text-center">
              <h1 className="text-4xl font-light text-gray-900 tracking-tight mb-2">
                Medical AI Assistant
              </h1>
            </div>

            {/* Centered Input Form */}
            <div className="w-full">
              {renderInputForm()}
            </div>

            {/* Disclaimer below input */}
            <div className="text-center">
              <p className="text-sm text-gray-500 font-medium">
                Educational information only. Consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Regular Chat Layout with Messages
        <>
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onSpeak={speakMessage}
                onStopSpeaking={stopSpeaking}
                isSpeaking={isSpeaking}
                speakingMessageId={speakingMessageId}
              />
            ))}

            {isLoading && (
              <div className="flex gap-4 p-6">
                <div className="flex-shrink-0 w-12 h-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                  <div className="absolute inset-1 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                    <img src="/logo2.png" alt="AI" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping opacity-30"></div>
                </div>
                <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl px-6 py-4 shadow-xl border border-gray-200 flex-1 max-w-sm professional-glow">
                  <div className="flex items-center gap-4">
                    <TypingIndicator className="text-blue-500" />
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-700 font-semibold">AI is analyzing...</p>
                      <p className="text-xs text-gray-500">Processing your medical query</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input form - Fixed at bottom */}
          <div className="bg-gradient-to-r from-white via-gray-50 to-white border-t border-gray-200 flex-shrink-0 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto p-6">
              {renderInputForm()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}