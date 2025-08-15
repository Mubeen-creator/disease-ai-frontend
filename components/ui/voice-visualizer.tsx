'use client';

import { cn } from '@/lib/utils';

interface VoiceVisualizerProps {
  isActive: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function VoiceVisualizer({ isActive, className, size = 'md' }: VoiceVisualizerProps) {
  const sizeClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-6'
  };

  const bars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      {bars.map((bar) => (
        <div
          key={bar}
          className={cn(
            'w-1 bg-current rounded-full transition-all duration-200',
            sizeClasses[size],
            isActive ? 'voice-wave' : 'opacity-30'
          )}
          style={{
            animationDelay: `${bar * 0.1}s`,
            height: isActive ? undefined : '4px'
          }}
        />
      ))}
    </div>
  );
}

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="w-2 h-2 bg-current rounded-full typing-dot"></div>
      <div className="w-2 h-2 bg-current rounded-full typing-dot"></div>
      <div className="w-2 h-2 bg-current rounded-full typing-dot"></div>
    </div>
  );
}