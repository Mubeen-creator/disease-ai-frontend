import { Header } from '@/components/common/Header';
import { Footer } from '@/components/landing/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Activity, Search, FileText, MessageSquare, Shield, Clock } from 'lucide-react';

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header showAuthButtons={true} />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-xl text-gray-600">
            Learn how to use MedAI Assistant effectively for your health information needs
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-blue-600" />
              Quick Start Guide
            </CardTitle>
            <CardDescription>
              Get started with MedAI Assistant in just a few steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex gap-3">
                <Badge className="bg-blue-100 text-blue-800 min-w-fit">1</Badge>
                <div>
                  <h4 className="font-semibold">Create Your Account</h4>
                  <p className="text-gray-600">Sign up for a free account to access the AI assistant</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge className="bg-blue-100 text-blue-800 min-w-fit">2</Badge>
                <div>
                  <h4 className="font-semibold">Start a Conversation</h4>
                  <p className="text-gray-600">Navigate to the dashboard and begin chatting with the AI</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge className="bg-blue-100 text-blue-800 min-w-fit">3</Badge>
                <div>
                  <h4 className="font-semibold">Ask Questions</h4>
                  <p className="text-gray-600">Describe symptoms, ask about diseases, or request treatment information</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-6 w-6 text-green-600" />
              Core Features
            </CardTitle>
            <CardDescription>
              Understanding what MedAI Assistant can do for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-lg">Symptom Analysis</h4>
                <p className="text-gray-600 mb-2">
                  Describe your symptoms and get AI-powered analysis of possible conditions.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Example:</strong> "I have a persistent headache, nausea, and sensitivity to light"
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-lg">Disease Information</h4>
                <p className="text-gray-600 mb-2">
                  Get comprehensive information about specific diseases, conditions, or medical terms.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Example:</strong> "Tell me about Type 2 diabetes"
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-lg">Treatment Options</h4>
                <p className="text-gray-600 mb-2">
                  Learn about treatment options, management strategies, and care approaches.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Example:</strong> "What are the treatment options for hypertension?"
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-purple-600" />
              How It Works
            </CardTitle>
            <CardDescription>
              Understanding the AI technology behind MedAI Assistant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">For Symptom Queries:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>AI searches local medical knowledge base (RAG)</li>
                  <li>If not found, queries PubMed database for latest research</li>
                  <li>Analyzes symptoms using advanced medical algorithms</li>
                  <li>Returns possible conditions with explanations</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">For Disease Information:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Searches comprehensive medical databases</li>
                  <li>Provides evidence-based information</li>
                  <li>Includes causes, symptoms, treatments, and management</li>
                  <li>Cites reliable medical sources</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-orange-600" />
              Best Practices
            </CardTitle>
            <CardDescription>
              Tips for getting the most accurate and helpful responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Do:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Be specific and detailed when describing symptoms</li>
                  <li>Mention duration, severity, and any triggers</li>
                  <li>Ask follow-up questions for clarification</li>
                  <li>Use the information to prepare for doctor visits</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-700 mb-2">❌ Don't:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                  <li>Use AI advice as a substitute for professional medical care</li>
                  <li>Delay seeking medical attention for serious symptoms</li>
                  <li>Self-diagnose based solely on AI responses</li>
                  <li>Share sensitive personal health information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Is the AI medical advice accurate?</h4>
              <p className="text-gray-600">
                Our AI uses evidence-based medical knowledge and current research. However, it's designed for educational purposes and should not replace professional medical advice, diagnosis, or treatment.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-2">Is my health information secure?</h4>
              <p className="text-gray-600">
                Yes, we take privacy seriously. Your conversations are encrypted, and we don't store personal health information. See our privacy policy for details.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-2">Can I use this for emergency situations?</h4>
              <p className="text-gray-600">
                No, this AI is not for emergencies. For urgent medical situations, call emergency services immediately or visit the nearest emergency room.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-2">What types of medical questions can I ask?</h4>
              <p className="text-gray-600">
                You can ask about symptoms, diseases, treatments, medications, preventive care, and general health information. The AI works best with specific, detailed questions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Shield className="h-6 w-6" />
              Important Medical Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-800">
              <strong>This AI assistant is for educational and informational purposes only.</strong> It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions about your health or medical conditions. Never disregard professional medical advice or delay seeking it because of information provided by this AI.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  );
}