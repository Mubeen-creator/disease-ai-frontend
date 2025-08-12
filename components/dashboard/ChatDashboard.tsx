'use client';

import { useState, useEffect } from 'react';
import { SessionManager } from './SessionManager';
import { ChatInterface } from './ChatInterface';

export function ChatDashboard() {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [refreshSessions, setRefreshSessions] = useState(0);

  // Load current session from localStorage on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('session_id');
    if (savedSessionId) {
      setCurrentSessionId(savedSessionId);
    }
  }, []);

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    localStorage.setItem('session_id', sessionId);
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    localStorage.removeItem('session_id');
  };

  const handleSessionUpdate = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    localStorage.setItem('session_id', sessionId);
    // Trigger refresh of sessions list
    setRefreshSessions(prev => prev + 1);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SessionManager
        currentSessionId={currentSessionId}
        onSessionSelect={handleSessionSelect}
        onNewChat={handleNewChat}
        refreshTrigger={refreshSessions}
      />
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Medical Assistant
          </h1>
          <p className="text-gray-600">
            Ask me about symptoms, diseases, or treatments
          </p>
        </div>
        <div className="flex-1">
          <ChatInterface
            sessionId={currentSessionId}
            onSessionUpdate={handleSessionUpdate}
          />
        </div>
      </div>
    </div>
  );
}