'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Menu, X, Trash2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ChatInterface } from './ChatInterface';

interface Session {
  session_id: string;
  last_activity: string;
  first_query?: string | null;
}

interface ResponsiveSessionManagerProps {
  currentSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
  refreshTrigger?: number;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSessionDeleted?: (sessionId: string) => void;
}

function ResponsiveSessionManager({ 
  currentSessionId, 
  onSessionSelect, 
  onNewChat, 
  refreshTrigger,
  isOpen,
  onToggle,
  onClose,
  onSessionDeleted
}: ResponsiveSessionManagerProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    sessionId: string;
    sessionPreview: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadSessions();
  }, [refreshTrigger]);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getSessions();

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
      // Clean the query and get first few words
      const cleanQuery = session.first_query.trim();
      const words = cleanQuery.split(' ');
      
      // Take first 4-6 words or limit to 40 characters
      let preview = '';
      for (let i = 0; i < Math.min(words.length, 6); i++) {
        const newPreview = preview + (i > 0 ? ' ' : '') + words[i];
        if (newPreview.length > 40) break;
        preview = newPreview;
      }
      
      // Add ellipsis if original query is longer
      if (preview.length < cleanQuery.length) {
        preview += '...';
      }
      
      return preview || 'New Chat';
    }
    return 'New Chat';
  };

  const handleSessionSelect = (sessionId: string) => {
    onSessionSelect(sessionId);
    onClose(); // Auto-close on mobile after selection
  };

  const handleNewChat = () => {
    onNewChat();
    onClose(); // Auto-close on mobile after creating new chat
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
      if (onSessionDeleted) {
        onSessionDeleted(deleteConfirmation.sessionId);
      }

      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Failed to delete session:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  return (
    <>
      {/* Mobile Menu Button - Fixed Position */}
      <Button
        onClick={onToggle}
        className="lg:hidden fixed top-20 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full w-12 h-12 p-0 transition-all duration-200"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-16 left-0 bg-gray-900 text-white flex flex-col z-40 transition-all duration-300 ease-in-out",
          // Desktop: always visible, full height
          "lg:translate-x-0 lg:w-64 lg:h-[calc(100vh-4rem)]",
          // Mobile: slide in/out, with shadow
          "w-80 max-w-[85vw] h-[calc(100vh-4rem)] shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4 lg:mb-0">
            <h2 className="text-lg font-semibold lg:hidden">Chat History</h2>
            <Button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-800 transition-colors"
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleNewChat}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 transition-all duration-200 hover:border-gray-500"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Sessions List - Scrollable */}
        <div className="flex-1 overflow-y-auto p-2">
          {isLoading ? (
            <div className="text-center text-gray-400 mt-8">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 animate-pulse" />
              <p>Loading chats...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No chats yet</p>
              <p className="text-xs mt-1">Start a conversation to see your chat history</p>
            </div>
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
                  <Button
                    onClick={() => handleSessionSelect(session.session_id)}
                    className={cn(
                      "w-full justify-start text-left p-3 h-auto bg-transparent hover:bg-transparent text-gray-300 hover:text-white border-none rounded-lg transition-all duration-200",
                      currentSessionId === session.session_id && "text-white shadow-lg border-l-4 border-l-blue-500"
                    )}
                    variant="ghost"
                  >
                    <div className="flex items-start gap-3 w-full pr-8">
                      <MessageSquare className={cn(
                        "h-4 w-4 mt-1 flex-shrink-0 transition-colors duration-200",
                        currentSessionId === session.session_id 
                          ? "text-blue-400" 
                          : "text-gray-400 group-hover:text-gray-300"
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate leading-5 mb-1">
                          {getSessionPreview(session)}
                        </div>
                        <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                          {formatDate(session.last_activity)}
                        </div>
                      </div>
                    </div>
                  </Button>

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

        {/* Footer - Optional */}
        <div className="flex-shrink-0 p-4 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">
            {sessions.length} chat{sessions.length !== 1 ? 's' : ''} total
          </p>
        </div>
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
    </>
  );
}

export function ChatDashboard() {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [refreshSessions, setRefreshSessions] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load current session from localStorage on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('session_id');
    if (savedSessionId) {
      setCurrentSessionId(savedSessionId);
    }
  }, []);

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    setRefreshSessions(prev => prev + 1);
  };

  const handleSessionDeleted = (deletedSessionId: string) => {
    // If the deleted session was the current one, clear it
    if (currentSessionId === deletedSessionId) {
      setCurrentSessionId(null);
      localStorage.removeItem('session_id');
    }
    // Refresh the sessions list
    setRefreshSessions(prev => prev + 1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Session Manager */}
      <ResponsiveSessionManager
        currentSessionId={currentSessionId}
        onSessionSelect={handleSessionSelect}
        onNewChat={handleNewChat}
        refreshTrigger={refreshSessions}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
        onSessionDeleted={handleSessionDeleted}
      />

      {/* Main Chat Area */}
      <div className="flex-1 lg:ml-64 h-screen overflow-hidden transition-all duration-300">
        <ChatInterface
          sessionId={currentSessionId}
          onSessionUpdate={handleSessionUpdate}
        />
      </div>
    </div>
  );
}