'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Send, ArrowRight } from 'lucide-react';

export default function WelcomeDemoPage() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            New Welcome Screen Design
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Clean, professional, and no unnecessary scrollbars
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Before - Old Design */}
          <Card className="enhanced-card">
            <CardHeader>
              <CardTitle className="high-contrast-text text-red-600">❌ Before: Card-based Layout</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Cards caused height issues and scrollbars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4 text-center text-sm text-gray-600">
                <p className="mb-2">Issues with old design:</p>
                <ul className="text-left space-y-1">
                  <li>• Large cards took too much vertical space</li>
                  <li>• Caused scrollbars in welcome screen</li>
                  <li>• Multiple scrollbars looked unprofessional</li>
                  <li>• Less focus on the main message</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* After - New Design */}
          <Card className="enhanced-card">
            <CardHeader>
              <CardTitle className="high-contrast-text text-green-600">✅ After: Clean Layout</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Streamlined design that fits in one screen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-lg p-6 min-h-96">
                {/* New Welcome Screen Preview */}
                <div className="text-center">
                  {/* Logo */}
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                    <div className="absolute inset-2 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-xl">
                      <img src="/logo2.png" alt="MedAI" className="w-10 h-10 object-contain" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
                    AI Medical Assistant
                  </h2>
                  
                  <p className="text-sm text-gray-700 font-medium mb-6 leading-relaxed">
                    Your intelligent healthcare companion
                  </p>

                  {/* Horizontal feature highlights */}
                  <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
                        <span className="text-xs">🩺</span>
                      </div>
                      <span className="font-semibold text-gray-600">Symptoms</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 bg-gradient-to-br from-green-100 to-green-200 rounded flex items-center justify-center">
                        <span className="text-xs">💊</span>
                      </div>
                      <span className="font-semibold text-gray-600">Treatment</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded flex items-center justify-center">
                        <span className="text-xs">🏥</span>
                      </div>
                      <span className="font-semibold text-gray-600">Education</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 bg-gradient-to-br from-red-100 to-red-200 rounded flex items-center justify-center">
                        <span className="text-xs">🎤</span>
                      </div>
                      <span className="font-semibold text-gray-600">Voice</span>
                    </div>
                  </div>

                  {/* Call to action */}
                  <p className="text-xs text-gray-600 font-medium mb-3">
                    Start by typing your question below
                  </p>

                  {/* Compact disclaimer */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-medium">
                    <span className="text-amber-600">⚠️</span>
                    <span>Educational purposes only</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Input Field Contrast Demo */}
        <div className="mt-12">
          <Card className="enhanced-card max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="high-contrast-text">Input Field Contrast Fix</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Enhanced text visibility and contrast
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Demo Input */}
                <div className="bg-gradient-to-r from-white to-gray-50 rounded-3xl border border-gray-300 p-4 shadow-xl">
                  <div className="flex items-end gap-4">
                    <Button
                      size="sm"
                      className="h-12 w-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 text-gray-600 hover:text-blue-700 shadow-lg"
                      variant="ghost"
                    >
                      <Mic className="h-5 w-5" />
                    </Button>

                    <div className="flex-1 min-w-0 relative">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your medical question here..."
                        className="border-0 bg-transparent p-0 text-base text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[48px] font-medium"
                        style={{ boxShadow: 'none', color: '#111827' }}
                      />
                    </div>

                    <Button
                      size="sm"
                      className={`h-12 w-12 rounded-full transition-all duration-300 shadow-lg ${
                        inputValue.trim()
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Improvements List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900">Welcome Screen Improvements:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Removed large cards to save vertical space</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Horizontal feature layout</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Compact disclaimer design</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>No scrollbars in welcome screen</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900">Input Field Improvements:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Dark text color (#111827) for better contrast</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Proper placeholder color (#6b7280)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>CSS !important rules for consistency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Enhanced readability across all themes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}