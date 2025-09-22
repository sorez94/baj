'use client';

import React from 'react';
import { useRoute } from '../useRoute';

// Example: How to integrate useRoute into your existing ChequeUploadScreen
export function ChequeUploadScreenWithRouteHook() {
  const route = useRoute({
    // Configure back button behavior
    backButton: {
      enabled: true,
      action: 'web', // Use web back for this screen
      fallbackRoute: '/cheque'
    },
    
    // Configure native routes that should trigger actions
    nativeRoutes: [
      {
        route: '/cheque/upload/success',
        action: 'close', // Close WebView on success
        fallbackRoute: '/dashboard'
      },
      {
        route: '/cheque/upload/error',
        action: 'open', // Open native error screen
        params: { screen: 'error', message: 'Upload failed' },
        fallbackRoute: '/cheque/upload'
      }
    ],
    
    // Callbacks for debugging and side effects
    onRouteChange: (path, method) => {
      console.log('Cheque upload route changed:', path, method);
    },
    onNativeAction: (action, params) => {
      console.log('Cheque upload native action:', action, params);
    }
  });

  const handleUploadSuccess = () => {
    // This will automatically close WebView in native app
    // or navigate to dashboard in web
    route.push('/cheque/upload/success');
  };

  const handleUploadError = () => {
    // This will open native error screen or go to upload page
    route.push('/cheque/upload/error');
  };

  const handleOpenPayment = () => {
    // Open native payment app
    route.openNative('payment', { 
      amount: 50000, 
      currency: 'IRR',
      description: 'Cheque processing fee'
    }, '/payment');
  };

  const handleRetryUpload = () => {
    // Refresh current page
    route.refresh();
  };

  return (
    <div>
      <h1>Cheque Upload Screen</h1>
      <p>Current route: {route.pathname}</p>
      <p>Is native WebView: {route.isNativeWebView ? 'Yes' : 'No'}</p>
      <p>Is navigating: {route.isNavigating ? 'Yes' : 'No'}</p>
      
      <div>
        <button onClick={handleUploadSuccess}>
          Upload Success (Close WebView)
        </button>
        <button onClick={handleUploadError}>
          Upload Error (Open Native Error)
        </button>
        <button onClick={handleOpenPayment}>
          Open Payment in Native App
        </button>
        <button onClick={handleRetryUpload}>
          Retry Upload
        </button>
      </div>
    </div>
  );
}

// Example: How to integrate useRoute into ChequeStartScreen
export function ChequeStartScreenWithRouteHook() {
  const route = useRoute({
    backButton: {
      enabled: true,
      action: 'web',
      fallbackRoute: '/'
    }
  });

  const handleStartCheque = () => {
    route.push('/cheque/accounts');
  };

  const handleOpenProfile = () => {
    route.openNative('profile', { userId: '123' }, '/profile');
  };

  const handleGoToSettings = () => {
    route.openNative('settings', {}, '/settings');
  };

  return (
    <div>
      <h1>Cheque Start Screen</h1>
      <p>Current route: {route.pathname}</p>
      
      <div>
        <button onClick={handleStartCheque}>Start Cheque Process</button>
        <button onClick={handleOpenProfile}>Open Profile in Native App</button>
        <button onClick={handleGoToSettings}>Open Settings in Native App</button>
      </div>
    </div>
  );
}

// Example: App-level configuration for all cheque routes
export function ChequeAppWithRouteConfiguration() {
  const route = useRoute({
    // Define all native routes for the entire cheque flow
    nativeRoutes: [
      // Success routes - close WebView
      { route: '/cheque/success', action: 'close', fallbackRoute: '/dashboard' },
      { route: '/cheque/upload/success', action: 'close', fallbackRoute: '/dashboard' },
      { route: '/payment/success', action: 'close', fallbackRoute: '/dashboard' },
      
      // Error routes - open native error screens
      { route: '/cheque/error', action: 'open', params: { screen: 'error' }, fallbackRoute: '/cheque' },
      { route: '/cheque/upload/error', action: 'open', params: { screen: 'error' }, fallbackRoute: '/cheque/upload' },
      { route: '/payment/error', action: 'open', params: { screen: 'error' }, fallbackRoute: '/payment' },
      
      // Payment routes - open native payment
      { route: '/payment/process', action: 'open', params: { screen: 'payment' }, fallbackRoute: '/payment' },
      
      // Profile routes - navigate to native profile
      { route: '/profile/edit', action: 'navigate', params: { route: '/profile/edit' }, fallbackRoute: '/profile' },
      
      // Bank routes - open specific bank apps
      { route: '/bank/tejarat', action: 'open', params: { screen: 'bank', bankCode: 'tejarat' }, fallbackRoute: '/bank' },
      { route: '/bank/melli', action: 'open', params: { screen: 'bank', bankCode: 'melli' }, fallbackRoute: '/bank' },
    ],
    
    // Global callbacks
    onRouteChange: (path, method) => {
      console.log('Cheque app route changed:', path, method);
      // You can add analytics, logging, etc. here
    },
    onNativeAction: (action, params) => {
      console.log('Cheque app native action:', action, params);
      // You can add analytics, logging, etc. here
    }
  });

  return (
    <div>
      <h1>Cheque App with Route Configuration</h1>
      <p>Current route: {route.pathname}</p>
      <p>Is native WebView: {route.isNativeWebView ? 'Yes' : 'No'}</p>
      <p>This handles all cheque routes that should trigger native actions</p>
    </div>
  );
}
