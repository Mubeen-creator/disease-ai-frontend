'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceVisualizer, TypingIndicator } from '@/components/ui/voice-visualizer';
import { MessageBubble } from '@/components/dashboard/MessageBubble';
import { Mic, MicOff, Send, Volume2, Sparkles } from 'lucide-react';
import { Message } from '@/types';

export default function ChatDemoPage() {
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const demoMessages: Message[] = [
    {
      id: '1',
      content: 'Hello! I\'ve been experiencing headaches for the past few days. They seem to get worse in the afternoon.',
      role: 'user',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      content: 'I understand you\'re experiencing headaches that worsen in the afternoon. This pattern can be associated with several factors:\n\n**Possible causes:**\n- Tension headaches from stress or poor posture\n- Dehydration throughout the day\n- Eye strain from screen time\n- Caffeine withdrawal\n- Blood sugar fluctuations\n\n**Recommendations:**\n1. Stay hydrated - drink water regularly\n2. Take breaks from screens every 20 minutes\n3. Practice good posture\n4. Consider stress management techniques\n\n*Please consult a healthcare professional if headaches persist or worsen.*',
      role: 'assistant',
      timestamp: new Date(Date.now() - 250000),
    },
  ];

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const toggleTyping = () => {
    setIsTyping(!isTyping);
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  const handleSpeak = (text: string, messageId: string) => {
    setIsSpeaking(true);
    // Simulate speaking for demo
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Enhanced Chat Interface Demo
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Professional voice controls, animations, and modern UI elements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Interface Demo */}
          <div className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="high-contrast-text flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Live Chat Demo
                </CardTitle>
                <CardDescription className="text-gray-700 font-medium">
                  Interactive chat interface with professional styling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Demo Messages */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 max-h-80 overflow-y-auto custom-scrollbar space-y-4">
                  {demoMessages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      onSpeak={handleSpeak}
                      onStopSpeaking={stopSpeaking}
                      isSpeaking={isSpeaking}
                      speakingMessageId={isSpeaking ? message.id : null}
                    />
                  ))}
                  
                  {/* Typing Indicator Demo */}
                  {isTyping && (
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
                </div>

                {/* Enhanced Input Area */}
                <div className="bg-gradient-to-r from-white via-gray-50 to-white border border-gray-300 rounded-3xl p-4 shadow-xl">
                  <div className="flex items-end gap-4">
                    {/* Voice Button */}
                    <div className="relative">
                      <Button
                        onClick={toggleListening}
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
                      {isListening && (
                        <div className="absolute -inset-2 pointer-events-none">
                          <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-40"></div>
                          <div className="absolute inset-1 rounded-full border-2 border-red-300 animate-ping opacity-30" style={{ animationDelay: '0.2s' }}></div>
                          <div className="absolute inset-2 rounded-full border-2 border-red-200 animate-ping opacity-20" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      )}
                    </div>

                    {/* Input Field */}
                    <div className="flex-1 min-w-0 relative">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your medical question here..."
                        className="border-0 bg-transparent p-0 text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[48px] font-medium"
                        style={{ boxShadow: 'none' }}
                      />
                      {inputValue && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>

                    {/* Send Button */}
                    <div className="relative">
                      <Button
                        size="sm"
                        className={`h-12 w-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden ${
                          inputValue.trim()
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white scale-105 hover:scale-110'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <div className="relative z-10">
                          <Send className="h-5 w-5" />
                        </div>
                        {inputValue.trim() && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse opacity-20"></div>
                        )}
                      </Button>
                      {inputValue.trim() && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-30 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Demo */}
          <div className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="high-contrast-text">Animation Controls</CardTitle>
                <CardDescription className="text-gray-700 font-medium">
                  Test different animation states
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Voice Visualizer Demo */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">Voice Visualizer</h3>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                    <VoiceVisualizer isActive={isListening} className="text-red-500" size="md" />
                    <Button onClick={toggleListening} variant="outline" size="sm">
                      {isListening ? 'Stop' : 'Start'} Listening
                    </Button>
                  </div>
                </div>

                {/* Typing Indicator Demo */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">Typing Indicator</h3>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <TypingIndicator className="text-blue-500" />
                    <Button onClick={toggleTyping} variant="outline" size="sm">
                      {isTyping ? 'Hide' : 'Show'} Typing
                    </Button>
                  </div>
                </div>

                {/* Speaking Indicator Demo */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">Speaking Animation</h3>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="relative">
                      <Volume2 className={`w-6 h-6 text-green-600 ${isSpeaking ? 'speaking-pulse' : ''}`} />
                      {isSpeaking && (
                        <div className="absolute -inset-1 bg-green-400 rounded-full animate-ping opacity-30"></div>
                      )}
                    </div>
                    <Button onClick={toggleSpeaking} variant="outline" size="sm">
                      {isSpeaking ? 'Stop' : 'Start'} Speaking
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features List */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="high-contrast-text">Enhanced Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Professional gradient backgrounds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Enhanced voice control animations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Smooth message transitions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Interactive typing indicators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Professional glow effects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Enhanced contrast and readability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}