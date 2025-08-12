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
      "group flex gap-6 px-8 py-6 relative overflow-hidden transition-all duration-700 ease-out",
      "hover:bg-gradient-to-r hover:from-transparent hover:via-slate-50/30 hover:to-transparent",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-1000 hover:before:translate-x-[100%]",
      isUser ? "justify-end" : "justify-start"
    )}>

      {!isUser && (
        <div className="relative flex-shrink-0 group">
          <div className={cn(
            "w-16 h-16  bg-red",
          )}>
            <div className="relative z-10">
              <img
                src="/logo2.png"
                alt="MedAI Logo"
                className="object-contain"
              />
              {isCurrentlySpeaking && (
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-600/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
        </div>
      )}

      <div className={cn(
        "relative max-w-[70%] transition-all duration-500 ease-out group-hover:scale-[1.02]",
        isUser ? "order-first" : ""
      )}>
        <div className={cn(
          "relative rounded-3xl px-6 py-5 backdrop-blur-xl border transition-all duration-500",
          "before:absolute before:inset-0 before:rounded-3xl before:p-px before:bg-gradient-to-br before:opacity-60",
          isUser
            ? "bg-gradient-to-br from-blue-600/95 via-blue-700/95 to-indigo-800/95 text-white shadow-2xl shadow-blue-500/25 before:from-white/20 before:via-white/10 before:to-transparent border-white/20"
            : "bg-white/80 text-slate-800 shadow-xl shadow-slate-200/50 before:from-slate-200/50 before:via-transparent before:to-slate-200/30 border-slate-200/60"
        )}>

          {/* Message Content */}
          <div className="relative z-10">
            {isUser ? (
              <p className="text-[15px] leading-relaxed font-medium whitespace-pre-wrap">
                {message.content}
              </p>
            ) : (
              <div className={cn(
                "text-[15px] leading-relaxed prose prose-sm max-w-none",
                "prose-headings:text-slate-800 prose-headings:font-bold prose-headings:tracking-tight",
                "prose-strong:text-slate-800 prose-strong:font-semibold",
                "prose-p:text-slate-700 prose-p:my-3 prose-li:text-slate-700",
                "prose-code:text-indigo-700 prose-code:bg-indigo-50/80 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm",
                "prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700/50 prose-pre:rounded-xl prose-pre:shadow-lg",
                "prose-blockquote:border-l-4 prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
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
            <div className="flex items-center gap-3">
              <span className={cn(
                "text-xs font-semibold tracking-wider uppercase px-2 py-1 rounded-full",
                isUser
                  ? "text-blue-100 bg-white/10"
                  : "text-slate-500 bg-slate-100/80"
              )}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
              {!isUser && (
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Sparkles className="w-3 h-3" />
                  <span className="font-medium">AI</span>
                </div>
              )}
            </div>

            {!isUser && onSpeak && onStopSpeaking && (
              <Button
                onClick={() => isCurrentlySpeaking ? onStopSpeaking() : onSpeak(message.content, message.id)}
                className={cn(
                  "h-9 w-9 p-0 rounded-xl transition-all duration-300 backdrop-blur-sm border group/btn",
                  "hover:scale-110 active:scale-95",
                  isCurrentlySpeaking
                    ? "bg-red-500/20 hover:bg-red-500/30 text-red-600 border-red-300/50 shadow-lg shadow-red-500/20"
                    : "bg-slate-100/80 hover:bg-slate-200/90 text-slate-600 border-slate-300/50 hover:text-slate-800 shadow-lg hover:shadow-xl"
                )}
                variant="ghost"
              >
                <div className="relative">
                  {isCurrentlySpeaking ? (
                    <>
                      <VolumeX className="h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110" />
                      <div className="absolute -inset-1 rounded-full bg-red-400/30 animate-pulse"></div>
                    </>
                  ) : (
                    <Volume2 className="h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110" />
                  )}
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>

      {isUser && (
        <div className="relative flex-shrink-0 group">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
            "bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 shadow-lg shadow-slate-500/25",
            "before:absolute before:inset-0 before:rounded-2xl before:p-0.5 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300"
          )}>
            <div className="relative z-10">
              <User className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-slate-600/20 via-slate-700/20 to-slate-800/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
        </div>
      )}
    </div>
  );
}