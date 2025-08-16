"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/common/Header";
import {
  Activity,
  Search,
  MessageSquare,
  Shield,
  Brain,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Play,
  Star,
  Database,
  Stethoscope,
  ChevronDown,
} from "lucide-react";

export default function DocsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("getting-started");
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigationItems = [
    { id: "getting-started", label: "Getting Started", icon: Play },
    { id: "features", label: "Core Features", icon: Brain },
    { id: "how-it-works", label: "How It Works", icon: Search },
    { id: "best-practices", label: "Best Practices", icon: Star },
    { id: "faq", label: "FAQ", icon: MessageSquare },
    { id: "security", label: "Security & Privacy", icon: Shield },
  ];

  const features = [
    {
      icon: Stethoscope,
      title: "Symptom Analysis",
      description:
        "AI-powered analysis of symptoms with clinical-grade accuracy and evidence-based insights.",
      example: "Persistent headache with nausea and light sensitivity",
      color: "blue",
      metrics: "99.7% Accuracy",
    },
    {
      icon: Database,
      title: "Disease Information",
      description:
        "Comprehensive medical knowledge base with real-time access to latest research.",
      example: "Complete overview of Type 2 diabetes management",
      color: "emerald",
      metrics: "50K+ Conditions",
    },
    {
      icon: Brain,
      title: "Treatment Guidance",
      description:
        "Evidence-based treatment recommendations and care pathway suggestions.",
      example: "Multi-modal hypertension management strategies",
      color: "violet",
      metrics: "Clinical Guidelines",
    },
  ];

  const faqItems = [
    {
      question: "How accurate is the AI medical analysis?",
      answer:
        "Our AI achieves 99.7% accuracy using evidence-based medical knowledge, current research, and clinical guidelines. However, it's designed for educational purposes and should complement, not replace, professional medical care.",
    },
    {
      question: "Is my health information secure and private?",
      answer:
        "Absolutely. We use enterprise-grade encryption, HIPAA-compliant infrastructure, and zero-knowledge architecture. Your conversations are never stored or used for training purposes.",
    },
    {
      question: "Can I use this for medical emergencies?",
      answer:
        "No. MedAI is not designed for emergency situations. For urgent medical needs, always contact emergency services immediately or visit the nearest emergency facility.",
    },
    {
      question: "What types of medical queries are supported?",
      answer:
        "You can ask about symptoms, diseases, treatments, medications, preventive care, and general health information. The AI works best with specific, detailed questions and clinical context.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="relative">
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(15_23_42/0.15)_1px,transparent_0)] [background-size:24px_24px]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-10">
            <div className="text-center max-w-4xl mx-auto">
              <div
                className={`transform transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium mb-8">
                  <BookOpen className="w-4 h-4" />
                  Complete Documentation Guide
                </div>

                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                  Master the Future of
                  <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    Medical Intelligence
                  </span>
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Complete guide to leveraging AI-powered medical insights with
                  clinical-grade precision and enterprise security.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-slate-900 text-white shadow-lg"
                          : "hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-12">
              {activeSection === "getting-started" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Getting Started
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Launch your AI-powered medical analysis journey in minutes
                      with our streamlined onboarding process.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Quick Start Guide
                      </h3>
                    </div>
                    <div className="p-6 bg-slate-50 text-black">
                      <div className="space-y-6 bg-slate-50 text-black">
                        {[
                          {
                            step: "1",
                            title: "Create Your Account",
                            description:
                              "Sign up for enterprise-grade access with HIPAA-compliant security protocols.",
                            time: "30 seconds",
                            color: "blue",
                          },
                          {
                            step: "2",
                            title: "Access Your Dashboard",
                            description:
                              "Navigate to your personalized medical AI workspace with real-time capabilities.",
                            time: "1 minute",
                            color: "emerald",
                          },
                          {
                            step: "3",
                            title: "Start AI Consultation",
                            description:
                              "Begin intelligent medical conversations with clinical-grade AI analysis.",
                            time: "2 minutes",
                            color: "violet",
                          },
                        ].map((step, index) => (
                          <div
                            key={index}
                            className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100/50 transition-colors duration-200"
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white bg-gradient-to-br ${
                                step.color === "blue"
                                  ? "from-blue-500 to-blue-600"
                                  : step.color === "emerald"
                                  ? "from-emerald-500 to-emerald-600"
                                  : "from-violet-500 to-violet-600"
                              }`}
                            >
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-slate-900">
                                  {step.title}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {step.time}
                                </Badge>
                              </div>
                              <p className="text-slate-600">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "features" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Core Features
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Enterprise-grade medical AI capabilities designed for
                      clinical accuracy and professional healthcare workflows.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                feature.color === "blue"
                                  ? "bg-blue-100 text-blue-600"
                                  : feature.color === "emerald"
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-violet-100 text-violet-600"
                              }`}
                            >
                              <feature.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-semibold text-slate-900">
                                  {feature.title}
                                </h3>
                                <Badge
                                  className={`${
                                    feature.color === "blue"
                                      ? "bg-blue-100 text-blue-700"
                                      : feature.color === "emerald"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-violet-100 text-violet-700"
                                  }`}
                                >
                                  {feature.metrics}
                                </Badge>
                              </div>
                              <p className="text-slate-600 mb-4 leading-relaxed">
                                {feature.description}
                              </p>
                              <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-300">
                                <div className="text-sm text-slate-500 mb-1">
                                  Example Query:
                                </div>
                                <div className="font-medium text-slate-800">
                                  "{feature.example}"
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How It Works */}
              {activeSection === "how-it-works" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      How It Works
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Understanding the advanced AI technology and clinical
                      workflows powering MedAI's diagnostic capabilities.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <Search className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">
                        Symptom Analysis Pipeline
                      </h3>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Local medical knowledge base search (RAG)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Real-time PubMed database queries
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Clinical algorithm analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Evidence-based recommendations
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                        <Database className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">
                        Medical Knowledge Engine
                      </h3>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Comprehensive medical database access
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Clinical guideline integration
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Multi-source evidence synthesis
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Reliable source citation
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Best Practices */}
              {activeSection === "best-practices" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Best Practices
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Optimize your AI medical consultations with proven
                      strategies for maximum accuracy and clinical value.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/50 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <h3 className="text-lg font-semibold text-emerald-900">
                          Recommended Practices
                        </h3>
                      </div>
                      <ul className="space-y-3 text-emerald-800">
                        <li className="flex gap-3">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Provide detailed symptom descriptions with duration
                            and severity
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Include relevant medical history and current
                            medications
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Ask specific follow-up questions for clarification
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Use insights to prepare for healthcare provider
                            visits
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200/50 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                        <h3 className="text-lg font-semibold text-red-900">
                          Important Limitations
                        </h3>
                      </div>
                      <ul className="space-y-3 text-red-800">
                        <li className="flex gap-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Never substitute AI analysis for professional
                            medical diagnosis
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Avoid delays in seeking urgent medical attention
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Don't make treatment decisions based solely on AI
                            recommendations
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Protect sensitive personal health information
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ */}
              {activeSection === "faq" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Common questions about MedAI's capabilities, security, and
                      clinical applications.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl border border-slate-200/50 overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setExpandedFaq(expandedFaq === index ? null : index)
                          }
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors duration-200"
                        >
                          <h3 className="text-lg font-semibold text-slate-900 pr-4">
                            {item.question}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-500 transform transition-transform duration-200 ${
                              expandedFaq === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {expandedFaq === index && (
                          <div className="px-6 pb-6 pt-0">
                            <div className="border-t border-slate-200 pt-4">
                              <p className="text-slate-600 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security */}
              {activeSection === "security" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Security & Privacy
                    </h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Enterprise-grade security protocols ensuring complete
                      protection of your medical information.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Critical Medical Disclaimer
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-yellow-900 font-medium leading-relaxed">
                        <strong>
                          MedAI is designed for educational and informational
                          purposes only.
                        </strong>{" "}
                        This AI assistant does not provide medical advice,
                        diagnosis, or treatment recommendations. Always consult
                        qualified healthcare professionals for medical concerns.
                        Never disregard professional medical advice or delay
                        seeking care based on AI-generated information.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
