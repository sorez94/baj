'use client';

import { useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setThemeMode, updateSystemTheme, selectTheme } from '@/store/uiSlice';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('bajet-theme') as 'light' | 'dark' | 'system';
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        dispatch(setThemeMode(savedTheme));
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        dispatch(setThemeMode('system'));
        dispatch(updateSystemTheme(prefersDark));
      }
    }
  }, [dispatch]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a theme
      if (theme.mode === 'system') {
        dispatch(updateSystemTheme(e.matches));
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch, theme.mode]);

  // Update document attribute when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = theme.isDark;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      
      // Save theme preference to localStorage
      localStorage.setItem('bajet-theme', theme.mode);
    }
  }, [theme.mode, theme.isDark]);

  return <>{children}</>;
}; 