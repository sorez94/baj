'use client';

import { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import { rtlCache } from '@/shared/mui/rtlCache';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReduxProvider from '@/store/Provider';
import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
const muiTheme = createTheme({
  direction: 'rtl',
});

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider >
      <CacheProvider value={rtlCache}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ReduxProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </MuiThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
} 