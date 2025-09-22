'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Minimal theme that won't cause hydration issues
const theme = createTheme({
  direction: 'rtl',
  // Minimal component overrides to prevent conflicts
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

interface SimpleThemeProviderProps {
  children: React.ReactNode;
}

export default function SimpleThemeProvider({ children }: SimpleThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until client-side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
} 