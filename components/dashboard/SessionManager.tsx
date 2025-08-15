'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Session {
  session_id: string;
  last_activity: string;
  first_query?: string | null; // Allow both undefined and null
}

interface SessionManagerProps {
  currentSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
  refreshTrigger?: number; // Add this to trigger refresh
  onSessionDeleted?: (sessionId: string) => void; // Callback when session is deleted
}

export function SessionManager({ currentSessionId, onSessionSelect, onNewChat, refreshTrigger, onSessionDeleted }: SessionManagerProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    sessionId: string;
    sessionPreview: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadSessions();
  }, [refreshTrigger]); // Reload when refreshTrigger changes

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getSessions();

      // Load first query for each session
      const sessionsWithQueries = await Promise.all(
        response.map(async (session) => {
          try {
            const messages = await apiClient.getSessionMessages(session.session_id);
            const firstUserMessage = messages.find(msg => msg.role === 'user');
            return {
              ...session,
              first_query: firstUserMessage?.content || firstUserMessage?.query || null
            };
          } catch (error) {
            console.error(`Failed to load messages for session ${session.session_id}:`, error);
            return { ...session, first_query: null };
          }
        })
      );

      setSessions(sessionsWithQueries.sort((a, b) =>
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

  const getSessionPreview = (session: Session) => {
    if (session.first_query) {
      // Truncate long queries to 50 characters
      return session.first_query.length > 50
        ? session.first_query.substring(0, 50) + '...'
        : session.first_query;
    }
    return `Chat ${session.session_id.slice(-8)}`;
  };

  const handleDeleteClick = (e: React.MouseEvent, session: Session) => {
    e.stopPropagation(); // Prevent session selection
    setDeleteConfirmation({
      sessionId: session.session_id,
      sessionPreview: getSessionPreview(session)
    });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    setIsDeleting(true);
    try {
      await apiClient.deleteSession(deleteConfirmation.sessionId);

      // Remove session from local state
      setSessions(prev => prev.filter(s => s.session_id !== deleteConfirmation.sessionId));

      // Notify parent if current session was deleted
      if (currentSessionId === deleteConfirmation.sessionId && onSessionDeleted) {
        onSessionDeleted(deleteConfirmation.sessionId);
      }

      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Failed to delete session:', error);
      // You could add a toast notification here
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  return (
    <div className="fixed left-0 top-20 w-64 bg-gray-900 text-white flex flex-col h-[calc(100vh-80px)] z-40">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 p-4 border-b border-gray-700">
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
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        {isLoading ? (
          <div className="text-center text-gray-400 mt-4">Loading...</div>
        ) : sessions.length === 0 ? (
          <div className="text-center text-gray-400 mt-4">No chats yet</div>
        ) : (
          <div className="space-y-1">
            {sessions.map((session) => (
              <div
                key={session.session_id}
                className={cn(
                  "group relative rounded-lg mb-1 transition-all duration-200",
                  "hover:bg-gray-800",
                  currentSessionId === session.session_id && "bg-gray-800"
                )}
              >
                {/* Main session button */}
                <div
                  onClick={() => onSessionSelect(session.session_id)}
                  className={cn(
                    "w-full cursor-pointer p-3 rounded-lg transition-colors",
                    "text-gray-300 hover:text-white",
                    currentSessionId === session.session_id && "text-white"
                  )}
                >
                  <div className="flex items-start gap-3 w-full pr-8">
                    <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate leading-5 mb-1">
                        {getSessionPreview(session)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(session.last_activity)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete button - appears on hover */}
                <button
                  onClick={(e) => handleDeleteClick(e, session)}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2",
                    "w-6 h-6 rounded flex items-center justify-center",
                    "opacity-0 group-hover:opacity-100 transition-all duration-200",
                    "text-gray-400 hover:text-white hover:bg-red-600",
                    "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  )}
                  title="Delete chat"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Chat</h3>
              <Button
                onClick={cancelDelete}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete this chat?
              </p>
              <div className="bg-gray-50 rounded-lg p-3 border">
                <p className="text-sm text-gray-800 font-medium">
                  "{deleteConfirmation.sessionPreview}"
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                This action cannot be undone. All messages in this chat will be permanently deleted.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                onClick={cancelDelete}
                variant="outline"
                disabled={isDeleting}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Chat
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}