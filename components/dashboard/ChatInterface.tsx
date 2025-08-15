'use client';

import { useState, useRef, useEffect } from 'react';
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  return (
    <div className="h-screen flex flex-col relative bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Chat messages area - takes all available space */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {messages.length === 0 && !isLoading ? (
          // Welcome Screen - Clean and Professional
          <div className="flex items-center justify-center h-full">
            <div className="max-w-3xl mx-auto text-center px-6">
              {/* Animated Logo/Icon */}
              <div className="mb-12 relative">
                <div className="w-32 h-32 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                  <div className="absolute inset-3 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-2xl">
                    <img src="/logo2.png" alt="MedAI" className="w-16 h-16 object-contain" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-xl animate-pulse"></div>
                </div>
                
                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                  AI Medical Assistant
                </h1>
                
                <p className="text-2xl text-gray-700 font-medium mb-8 leading-relaxed max-w-2xl mx-auto">
                  Your intelligent healthcare companion powered by advanced AI technology
                </p>

                {/* Feature highlights - horizontal layout */}
                <div className="flex flex-wrap justify-center gap-8 mb-12 text-gray-600">
                  <div className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg">🩺</span>
                    </div>
                    <span className="font-semibold group-hover:text-blue-700 transition-colors duration-300">Symptom Analysis</span>
                  </div>
                  
                  <div className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg">💊</span>
                    </div>
                    <span className="font-semibold group-hover:text-green-700 transition-colors duration-300">Treatment Info</span>
                  </div>
                  
                  <div className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg">🏥</span>
                    </div>
                    <span className="font-semibold group-hover:text-purple-700 transition-colors duration-300">Health Education</span>
                  </div>
                  
                  <div className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg">🎤</span>
                    </div>
                    <span className="font-semibold group-hover:text-red-700 transition-colors duration-300">Voice Interaction</span>
                  </div>
                </div>

                {/* Call to action */}
                <div className="mb-8">
                  <p className="text-lg text-gray-600 font-medium mb-4">
                    Start by describing your symptoms or asking a medical question below
                  </p>
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Type your message or use voice input</span>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>

                {/* Compact disclaimer */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-sm font-medium">
                  <span className="text-amber-600">⚠️</span>
                  <span>For educational purposes only • Always consult healthcare professionals</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Regular chat messages
          <>
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
          </>
        )}
      </div>

      {/* Input form - Fixed at bottom */}
      <div className="bg-gradient-to-r from-white via-gray-50 to-white border-t border-gray-200 flex-shrink-0 backdrop-blur-sm">
        {/* Main input container with professional styling */}
        <div className="max-w-5xl mx-auto p-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-4 bg-gradient-to-r from-white to-gray-50 rounded-3xl border border-gray-300 p-4 shadow-xl hover:shadow-2xl transition-all duration-300 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 focus-within:shadow-blue-100/50">

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
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your symptoms or ask a medical question..."
                  disabled={isLoading}
                  className="border-0 bg-transparent p-0 text-base text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[48px] font-medium"
                  style={{ boxShadow: 'none', color: '#111827' }}
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
      </div>
    </div>
  );
}