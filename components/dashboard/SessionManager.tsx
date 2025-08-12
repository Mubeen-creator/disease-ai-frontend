'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Session {
  session_id: string;
  last_activity: string;
}

interface SessionManagerProps {
  currentSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
  refreshTrigger?: number; // Add this to trigger refresh
}

export function SessionManager({ currentSessionId, onSessionSelect, onNewChat, refreshTrigger }: SessionManagerProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, [refreshTrigger]); // Reload when refreshTrigger changes

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getSessions();
      setSessions(response.sort((a, b) => 
        new Date(b.last_activity).getTime() - new Date(a.last_activity).getTime()
      ));
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getSessionPreview = (sessionId: string) => {
    // For now, just show session ID. Later we can load first message
    return `Chat ${sessionId.slice(-8)}`;
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <Button
          onClick={onNewChat}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Sessions List */}
      <ScrollArea className="flex-1 p-2">
        {isLoading ? (
          <div className="text-center text-gray-400 mt-4">Loading...</div>
        ) : sessions.length === 0 ? (
          <div className="text-center text-gray-400 mt-4">No chats yet</div>
        ) : (
          <div className="space-y-1">
            {sessions.map((session) => (
              <Button
                key={session.session_id}
                onClick={() => onSessionSelect(session.session_id)}
                className={cn(
                  "w-full justify-start text-left p-3 h-auto bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white border-none",
                  currentSessionId === session.session_id && "bg-gray-800 text-white"
                )}
                variant="ghost"
              >
                <div className="flex items-start gap-2 w-full">
                  <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {getSessionPreview(session.session_id)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDate(session.last_activity)}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}