'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Custom hook for theme-aware styling
export function useThemeColors() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getScrollbarStyles = React.useCallback(() => {
    if (!mounted) return {};
    
    return {
      scrollbarWidth: 'thin',
      scrollbarColor: 'hsl(var(--border)) hsl(var(--muted))',
    };
  }, [mounted]);

  return {
    mounted,
    getScrollbarStyles,
  };
}