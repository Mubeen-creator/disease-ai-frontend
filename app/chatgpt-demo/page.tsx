"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send, Mic, ArrowDown, MessageSquare } from "lucide-react";

export default function ChatGPTDemoPage() {
  const [showCentered, setShowCentered] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const toggleView = () => {
    setShowCentered(!showCentered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            ChatGPT-Style Input Interface
          </h1>
          <p className="text-xl text-gray-700 font-medium mb-6">
            Centered input field that moves to bottom after first message
          </p>
          <Button onClick={toggleView} className="enhanced-button">
            {showCentered ? "Show Chat Mode" : "Show Welcome Mode"}
          </Button>
        </div>

        {/* Demo Interface */}
        <div className="max-w-6xl mx-auto">
          <Card className="enhanced-card overflow-hidden">
            <CardHeader>
              <CardTitle className="high-contrast-text flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                {showCentered
                  ? "Welcome Screen (No Messages)"
                  : "Chat Mode (With Messages)"}
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                {showCentered
                  ? "Input field is centered with welcome content behind it"
                  : "Input field is at bottom with messages above"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Demo Chat Interface */}
              <div className="h-96 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative">
                {showCentered ? (
                  // Centered Input Mode (Welcome Screen)
                  <div className="h-full flex flex-col">
                    {/* Welcome content - positioned behind input */}
                    <div className="flex-1 flex items-center justify-center relative">
                      {/* Background welcome content */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="max-w-lg mx-auto text-center px-8 opacity-60">
                          <div className="space-y-4">
                            {/* Main Heading */}
                            <div className="space-y-2">
                              <h2 className="text-2xl font-light text-gray-900 tracking-tight">
                                Medical AI Assistant
                              </h2>
                              <p className="text-sm text-gray-600 font-normal leading-relaxed">
                                Ask questions about symptoms, treatments, or
                                medical conditions
                              </p>
                            </div>

                            {/* Simple capabilities */}
                            <div className="space-y-1 text-gray-500">
                              <p className="text-xs font-medium">
                                Symptom Analysis • Treatment Information •
                                Health Education
                              </p>
                            </div>

                            {/* Minimal disclaimer */}
                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-xs text-gray-500 font-medium">
                                Educational information only. Consult healthcare
                                professionals.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Centered Input Form */}
                      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
                        <div className="flex items-end gap-3 bg-gradient-to-r from-white to-gray-50 rounded-3xl border border-gray-300 p-3 shadow-xl">
                          <Button
                            size="sm"
                            className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 text-gray-600 hover:text-blue-700 shadow-lg"
                            variant="ghost"
                          >
                            <Mic className="h-4 w-4" />
                          </Button>

                          <div className="flex-1 min-w-0 relative">
                            <Input
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder="Describe your symptoms or ask a medical question..."
                              className="border-0 bg-transparent p-0 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[40px] font-medium"
                              style={{ boxShadow: "none", color: "#111827" }}
                            />
                          </div>

                          <Button
                            size="sm"
                            className={`h-10 w-10 rounded-full transition-all duration-300 shadow-lg ${
                              inputValue.trim()
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Chat Mode (Messages + Bottom Input)
                  <div className="h-full flex flex-col">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {/* Sample Messages */}
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl px-4 py-2 max-w-xs">
                          <p className="text-sm">
                            I have been having headaches for the past few days.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl px-4 py-2 max-w-xs shadow-lg border border-gray-200">
                          <p className="text-sm text-gray-800">
                            I understand you are experiencing headaches. Can you
                            describe when they occur and their intensity?
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Input */}
                    <div className="bg-gradient-to-r from-white via-gray-50 to-white border-t border-gray-200 p-4">
                      <div className="flex items-end gap-3 bg-gradient-to-r from-white to-gray-50 rounded-3xl border border-gray-300 p-3 shadow-xl">
                        <Button
                          size="sm"
                          className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 text-gray-600 hover:text-blue-700 shadow-lg"
                          variant="ghost"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>

                        <div className="flex-1 min-w-0 relative">
                          <Input
                            placeholder="Type your follow-up question..."
                            className="border-0 bg-transparent p-0 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[40px] font-medium"
                            style={{ boxShadow: "none", color: "#111827" }}
                          />
                        </div>

                        <Button
                          size="sm"
                          className="h-10 w-10 rounded-full bg-gray-300 text-gray-500 cursor-not-allowed shadow-lg"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Feature Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="high-contrast-text text-blue-600">
                  ✨ Welcome Mode Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Centered Input:</strong> Input field is positioned
                      in the center of the screen like ChatGPT
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Background Content:</strong> Welcome text appears
                      behind the input field with reduced opacity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Focus on Input:</strong> Users attention is
                      immediately drawn to the input area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Clean Layout:</strong> No scrollbars or clutter,
                      just clean input interface
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="high-contrast-text text-green-600">
                  💬 Chat Mode Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Bottom Input:</strong> Input moves to bottom after
                      first message is sent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Message History:</strong> All previous messages
                      are displayed above the input
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Scrollable Area:</strong> Messages area becomes
                      scrollable for long conversations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Consistent Input:</strong> Same input styling
                      maintained in both modes
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Details */}
          <Card className="enhanced-card mt-8">
            <CardHeader>
              <CardTitle className="high-contrast-text">
                🔧 Implementation Details
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                How the ChatGPT-style interface works
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900">State Management</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      •{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        hasMessages
                      </code>{" "}
                      determines layout
                    </li>
                    <li>• Dynamic component rendering</li>
                    <li>• Smooth transitions between modes</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900">Layout Strategy</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Flexbox for vertical centering</li>
                    <li>• Absolute positioning for background</li>
                    <li>• Z-index layering for input focus</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900">User Experience</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Immediate focus on input field</li>
                    <li>• Contextual welcome information</li>
                    <li>• Seamless mode transitions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
