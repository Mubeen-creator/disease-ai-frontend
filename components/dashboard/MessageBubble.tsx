import { Bot, User, Volume2, VolumeX, Sparkles } from 'lucide-react';
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
    <div className={cn(
      "group flex gap-6 px-6 py-8 relative overflow-hidden transition-all duration-500 ease-out message-slide-in",
      "hover:bg-gradient-to-r hover:from-transparent hover:via-blue-50/20 hover:to-transparent",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-1000 hover:before:translate-x-[100%]",
      isUser ? "justify-end" : "justify-start"
    )}>

      {!isUser && (
        <div className="relative flex-shrink-0 group">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-pulse opacity-20"></div>
            <div className="absolute inset-1 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo2.png"
                alt="MedAI Logo"
                className="w-10 h-10 object-contain"
              />
              {isCurrentlySpeaking && (
                <div className="absolute -top-1 -right-1 w-4 h-4">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            {/* Enhanced glow effect */}
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
            {/* Speaking animation rings */}
            {isCurrentlySpeaking && (
              <div className="absolute -inset-2 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl border-2 border-green-400 animate-ping opacity-40"></div>
                <div className="absolute inset-1 rounded-2xl border-2 border-green-300 animate-ping opacity-30" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={cn(
        "relative max-w-[70%] transition-all duration-500 ease-out group-hover:scale-[1.02]",
        isUser ? "order-first" : ""
      )}>
        <div className={cn(
          "relative rounded-3xl px-8 py-6 backdrop-blur-xl border transition-all duration-500 group-hover:scale-[1.01]",
          "before:absolute before:inset-0 before:rounded-3xl before:p-px before:bg-gradient-to-br before:opacity-60",
          isUser
            ? "bg-gradient-to-br from-blue-600/95 via-blue-700/95 to-indigo-800/95 text-white shadow-2xl shadow-blue-500/30 before:from-white/20 before:via-white/10 before:to-transparent border-white/20 hover:shadow-blue-500/40"
            : "bg-gradient-to-br from-white/95 to-gray-50/95 text-slate-800 shadow-2xl shadow-slate-200/60 before:from-slate-200/50 before:via-transparent before:to-slate-200/30 border-slate-200/60 hover:shadow-slate-300/70"
        )}>

          {/* Enhanced Message Content */}
          <div className="relative z-10">
            {isUser ? (
              <p className="text-base leading-relaxed font-medium whitespace-pre-wrap text-white/95">
                {message.content}
              </p>
            ) : (
              <div className={cn(
                "text-base leading-relaxed prose prose-sm max-w-none",
                "prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight",
                "prose-strong:text-slate-900 prose-strong:font-bold",
                "prose-p:text-slate-800 prose-p:my-4 prose-li:text-slate-800 prose-p:font-medium",
                "prose-code:text-indigo-800 prose-code:bg-indigo-100/80 prose-code:px-3 prose-code:py-1.5 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm prose-code:font-semibold prose-code:shadow-sm",
                "prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700/50 prose-pre:rounded-xl prose-pre:shadow-xl prose-pre:p-4",
                "prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50/60 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:shadow-sm",
                "prose-ul:my-4 prose-ol:my-4 prose-li:my-1"
              )}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Floating Action Bar */}
          <div className={cn(
            "flex items-center justify-between mt-4 pt-3 relative",
            "before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r",
            isUser
              ? "before:from-transparent before:via-white/30 before:to-transparent"
              : "before:from-transparent before:via-slate-300/60 before:to-transparent"
          )}>
            <div className="flex items-center gap-4">
              <span className={cn(
                "text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm",
                isUser
                  ? "text-blue-100 bg-white/15 border border-white/20"
                  : "text-slate-600 bg-slate-100/90 border border-slate-200"
              )}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
              {!isUser && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200 shadow-sm">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span className="font-bold text-xs text-blue-700">AI ASSISTANT</span>
                </div>
              )}
            </div>

            {!isUser && onSpeak && onStopSpeaking && (
              <div className="relative">
                <Button
                  onClick={() => isCurrentlySpeaking ? onStopSpeaking() : onSpeak(message.content, message.id)}
                  className={cn(
                    "h-10 w-10 p-0 rounded-xl transition-all duration-300 backdrop-blur-sm border group/btn shadow-lg",
                    "hover:scale-110 active:scale-95 hover:shadow-xl",
                    isCurrentlySpeaking
                      ? "bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-600 border-red-300/50 shadow-red-500/20"
                      : "bg-gradient-to-r from-slate-100/90 to-slate-200/90 hover:from-blue-100/90 hover:to-blue-200/90 text-slate-600 border-slate-300/50 hover:text-blue-700 hover:border-blue-300/50"
                  )}
                  variant="ghost"
                >
                  <div className="relative">
                    {isCurrentlySpeaking ? (
                      <>
                        <VolumeX className="h-5 w-5 transition-transform duration-200 group-hover/btn:scale-110" />
                        <div className="absolute -inset-1 rounded-xl bg-red-400/30 animate-pulse"></div>
                      </>
                    ) : (
                      <Volume2 className="h-5 w-5 transition-transform duration-200 group-hover/btn:scale-110" />
                    )}
                  </div>
                </Button>
                {/* Speaking indicator glow */}
                {isCurrentlySpeaking && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-xl blur opacity-30 animate-pulse"></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isUser && (
        <div className="relative flex-shrink-0 group">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
            "bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 shadow-xl shadow-slate-500/30",
            "before:absolute before:inset-0 before:rounded-2xl before:p-0.5 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300"
          )}>
            <div className="relative z-10">
              <User className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
          </div>
          <div className="absolute -inset-3 bg-gradient-to-r from-slate-600/20 via-slate-700/20 to-slate-800/20 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
        </div>
      )}
    </div>
  );
}