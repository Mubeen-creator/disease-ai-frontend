import { ChatInterface } from '@/components/dashboard/ChatInterface';

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">AI Medical Assistant</h1>
        <p className="text-gray-600">Ask me about symptoms, diseases, or treatments</p>
      </div>
      <div className="flex-1 bg-gray-50">
        <ChatInterface />
      </div>
    </div>
  );
}