'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create theme with RTL support
const createAppTheme = (isRTL: boolean) => {
  return createTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
          },
        },
      },
      // Disable Material-UI's default styles to prevent conflicts
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: 'inherit',
          },
        },
      },
    },
  });
};

interface ThemeRegistryProps {
  children: React.ReactNode;
  isRTL?: boolean;
}

export default function ThemeRegistry({ children, isRTL = true }: ThemeRegistryProps) {
  const [mounted, setMounted] = useState(false);
  const [theme] = useState(() => createAppTheme(isRTL));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}