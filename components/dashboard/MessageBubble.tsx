import { Bot, User, Volume2, VolumeX } from 'lucide-react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
  message: Message;
  onSpeak?: (text: string, messageId: string) => void;
  onStopSpeaking?: () => void;
  isSpeaking?: boolean;
  speakingMessageId?: string | null;
}

export function MessageBubble({ 
  message, 
  onSpeak, 
  onStopSpeaking, 
  isSpeaking = false, 
  speakingMessageId 
}: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isCurrentlySpeaking = isSpeaking && speakingMessageId === message.id;
  
  return (
    <div className={cn("flex gap-3 p-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-3 break-words",
        isUser 
          ? "bg-blue-600 text-white ml-auto" 
          : "bg-gray-100 text-gray-900"
      )}>
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-headings:text-gray-900 prose-strong:text-gray-900 prose-p:text-gray-900 prose-li:text-gray-900">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        <div className={cn(
          "flex items-center justify-between text-xs mt-2 opacity-70",
          isUser ? "text-blue-100" : "text-gray-500"
        )}>
          <span>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {!isUser && onSpeak && onStopSpeaking && (
            <Button
              onClick={() => isCurrentlySpeaking ? onStopSpeaking() : onSpeak(message.content, message.id)}
              className="h-6 w-6 p-0 bg-transparent hover:bg-gray-200 text-gray-600 hover:text-gray-800"
              variant="ghost"
            >
              {isCurrentlySpeaking ? (
                <VolumeX className="h-3 w-3" />
              ) : (
                <Volume2 className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
  );
}