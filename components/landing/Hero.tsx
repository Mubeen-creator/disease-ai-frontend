"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Play,
  Shield,
  Brain,
  ChevronRight,
  Users,
} from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(15_23_42/0.15)_1px,transparent_0)] [background-size:24px_24px]" />

      {/* Main Hero */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10 lg:pt-10 lg:pb-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Premium Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium mb-8 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Trusted by 50,000+ Healthcare Professionals
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>

            {/* Main Headline */}
            <div
              className={`transform transition-all duration-700 delay-100 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                The Future of
                <span className="block bg-gradient-to-r pb-2 from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  Medical Intelligence
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              className={`transform transition-all duration-700 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto font-light">
                Advanced AI-powered diagnostic platform delivering instant,
                accurate medical insights with clinical-grade precision and
                enterprise security.
              </p>
            </div>

            {/* CTA Section */}
            <div
              className={`transform transition-all duration-700 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 border-slate-200 hover:border-slate-300 text-white hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 min-w-[180px]"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
                <Button
                  onClick={() => router.push("/docs")}
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 border-slate-200 hover:border-slate-300 text-white hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 min-w-[180px]"
                >
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div
          className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20 transform transition-all duration-700 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="relative">
            {/* Main Dashboard Card */}
            <div className="bg-white rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.12)] border border-slate-200/50 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      MedAI Diagnostic Platform
                    </div>
                    <div className="text-slate-400 text-sm">
                      Real-time Analysis
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 text-sm font-medium">
                    Live
                  </span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 bg-gradient-to-br from-slate-50 to-white">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Analysis Results */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl p-5 border border-slate-200/50 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">
                          Diagnostic Analysis
                        </h3>
                        <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                          Complete
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">
                            Confidence Level
                          </span>
                          <span className="font-bold text-slate-900">
                            96.8%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                            style={{ width: "96.8%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-slate-200/50 shadow-sm">
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Key Findings
                      </h4>
                      <div className="space-y-2">
                        {[
                          "Primary symptoms identified",
                          "Risk factors assessed",
                          "Treatment options available",
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2 text-slate-600"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200/50">
                      <div className="text-2xl font-bold text-blue-900 mb-1">
                        2.3s
                      </div>
                      <div className="text-blue-700 text-sm">Analysis Time</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200/50">
                      <div className="text-2xl font-bold text-emerald-900 mb-1">
                        99.7%
                      </div>
                      <div className="text-emerald-700 text-sm">
                        Accuracy Rate
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200/50">
                      <div className="text-2xl font-bold text-violet-900 mb-1">
                        HIPAA
                      </div>
                      <div className="text-violet-700 text-sm">Compliant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Security Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-slate-200/50">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>

            {/* Floating Users Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-slate-200/50 flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                50K+ Users
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
