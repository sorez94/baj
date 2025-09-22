'use client';

import React from 'react';
import { useWebViewNativeBridge } from '../useWebViewNativeBridge';

// Example: Route-based native app detection
export function RouteBasedNativeScreen() {
  const { isNativeWebView, closeWebView, openNativeApp } = useWebViewNativeBridge();

  // Define routes that should trigger native actions
  const nativeRoutes = [
    {
      route: '/cheque/success',
      action: 'close' as const,
      params: { message: 'Cheque processed successfully' },
      fallbackRoute: '/dashboard'
    },
    {
      route: '/payment/process',
      action: 'open' as const,
      params: { screen: 'payment', amount: 50000 },
      fallbackRoute: '/payment'
    },
    {
      route: '/profile/edit',
      action: 'navigate' as const,
      params: { route: '/profile/edit', userId: '123' },
      fallbackRoute: '/profile'
    }
  ];

  // Use the hook with route detection
  useWebViewNativeBridge({
    nativeRoutes,
    onRouteChange: (route) => {
      console.log('Route changed to:', route);
    },
    onNativeAction: (action, params) => {
      console.log('Native action triggered:', action, params);
    }
  });

  return (
    <div>
      <h1>Route-Based Native Detection</h1>
      <p>Native WebView: {isNativeWebView ? 'Yes' : 'No'}</p>
      <p>This component will automatically detect route changes and trigger native actions</p>
    </div>
  );
}

// Example: App-level route detection
export function AppLevelRouteDetection() {
  const { isNativeWebView } = useWebViewNativeBridge();

  // Define app-wide native routes
  const appNativeRoutes = [
    // Success routes - close WebView
    { route: '/cheque/success', action: 'close' as const, fallbackRoute: '/dashboard' },
    { route: '/payment/success', action: 'close' as const, fallbackRoute: '/dashboard' },
    { route: '/profile/updated', action: 'close' as const, fallbackRoute: '/profile' },
    
    // Payment routes - open native payment
    { route: '/payment/process', action: 'open' as const, params: { screen: 'payment' }, fallbackRoute: '/payment' },
    { route: '/payment/verify', action: 'open' as const, params: { screen: 'payment_verify' }, fallbackRoute: '/payment' },
    
    // Profile routes - navigate to native profile
    { route: '/profile/edit', action: 'navigate' as const, params: { route: '/profile/edit' }, fallbackRoute: '/profile' },
    { route: '/profile/settings', action: 'navigate' as const, params: { route: '/profile/settings' }, fallbackRoute: '/settings' },
    
    // Bank routes - open specific bank app
    { route: '/bank/tejarat', action: 'open' as const, params: { screen: 'bank', bankCode: 'tejarat' }, fallbackRoute: '/bank' },
    { route: '/bank/melli', action: 'open' as const, params: { screen: 'bank', bankCode: 'melli' }, fallbackRoute: '/bank' },
  ];

  useWebViewNativeBridge({
    nativeRoutes: appNativeRoutes,
    onRouteChange: (route) => {
      console.log('App route changed:', route);
    },
    onNativeAction: (action, params) => {
      console.log('App native action:', action, params);
    }
  });

  return (
    <div>
      <h1>App-Level Route Detection</h1>
      <p>Native WebView: {isNativeWebView ? 'Yes' : 'No'}</p>
      <p>This handles all app routes that should trigger native actions</p>
    </div>
  );
}
