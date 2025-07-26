import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateResolvedTheme = () => {
      const resolved = theme === 'system' 
        ? (mediaQuery.matches ? 'dark' : 'light')
        : theme;
      
      setResolvedTheme(resolved);
      
      // Apply theme to document
      document.documentElement.classList.toggle('dark', resolved === 'dark');
      
      // Store preference
      localStorage.setItem('theme', theme);
    };

    updateResolvedTheme();
    
    if (theme === 'system') {
      mediaQuery.addEventListener('change', updateResolvedTheme);
      return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
    }
  }, [theme]);

  return { theme, setTheme, resolvedTheme };
};