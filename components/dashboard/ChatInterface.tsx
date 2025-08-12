'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageBubble } from './MessageBubble';
import { Send, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Message } from '@/types';
import { apiClient } from '@/lib/api';

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

      // Group messages by query-answer pairs
      const messageMap = new Map();
      sessionMessages.forEach(msg => {
        if (msg.role === 'user') {
          messageMap.set(msg.timestamp, { user: msg, assistant: null });
        } else if (msg.role === 'assistant') {
          // Find the corresponding user message
          const userEntry = Array.from(messageMap.values()).find(entry =>
            entry.user && !entry.assistant && entry.user.query === msg.query
          );
          if (userEntry) {
            userEntry.assistant = msg;
          }
        }
      });

      // Convert to Message format
      Array.from(messageMap.values()).forEach((entry, index) => {
        if (entry.user) {
          formattedMessages.push({
            id: `user-${index}`,
            content: entry.user.query,
            role: 'user',
            timestamp: new Date(entry.user.timestamp),
          });
        }
        if (entry.assistant) {
          formattedMessages.push({
            id: `assistant-${index}`,
            content: entry.assistant.answer,
            role: 'assistant',
            timestamp: new Date(entry.assistant.timestamp),
          });
        }
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
    <div className="h-screen flex flex-col">
      {/* Chat messages area - takes all available space */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading ? (
          // Welcome Screen - Centered like Claude.ai/OpenAI
          <div className="flex items-center justify-center h-full">
            <div className="max-w-2xl mx-auto text-center px-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  AI Medical Assistant
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  I can help you understand symptoms, provide information about diseases, and suggest treatments.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">🩺 Symptom Analysis</h3>
                  <p className="text-sm text-gray-600">Describe your symptoms and get insights about possible conditions</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">💊 Treatment Information</h3>
                  <p className="text-sm text-gray-600">Learn about treatment options and medical procedures</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">🏥 Health Education</h3>
                  <p className="text-sm text-gray-600">Get reliable information about diseases and conditions</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-blue-300 transition-colors">
                  <h3 className="font-semibent text-gray-900 mb-2">🎤 Voice Interaction</h3>
                  <p className="text-sm text-gray-600">Use voice input and listen to responses</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> This AI assistant provides educational information only.
                  Always consult healthcare professionals for medical decisions and emergency situations.
                </p>
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
          </>
        )}
      </div>

      {/* Input form - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 flex-shrink-0">
        {/* Main input container with subtle shadow and modern styling */}
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-3 bg-gray-50 rounded-2xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">

              {/* Voice button - left side */}
              <Button
                type="button"
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                size="sm"
                className={`h-10 w-10 rounded-full transition-all duration-600 ${isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700'
                  }`}
                variant="ghost"
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>

              {/* Input field */}
              <div className="flex-1 min-w-0">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your symptoms or ask a medical question..."
                  disabled={isLoading}
                  className="border-0 bg-transparent p-0 text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[40px]"
                  style={{ boxShadow: 'none' }}
                />
              </div>

              {/* Send button - right side */}
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                size="sm"
                className="h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Status indicators */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                {isListening && (
                  <div className="flex items-center gap-2 text-red-500 animate-pulse transition-all duration-600 ">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs transition-all duration-600 font-medium">Listening..</span>
                  </div>
                )}
                {isLoading && !isListening && (
                  <div className="flex items-center gap-2 text-blue-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <span className="text-xs font-medium">AI is thinking...</span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}