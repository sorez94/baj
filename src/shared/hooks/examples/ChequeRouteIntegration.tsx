'use client';

import React from 'react';
import { useRoute, useCommonRoutes } from '../useRoute';

// Example: Cheque Start Screen with route management
export function ChequeStartScreenWithRoutes() {
  const route = useRoute({
    backButton: {
      enabled: true,
      action: 'web', // Use web back for this screen
      fallbackRoute: '/'
    }
  });

  const handleStartCheque = () => {
    route.push('/cheque/accounts');
  };

  const handleGoToProfile = () => {
    route.openNative('profile', { userId: '123' }, '/profile');
  };

  return (
    <div>
      <h1>Cheque Start Screen</h1>
      <p>Current route: {route.pathname}</p>
      <p>Is native WebView: {route.isNativeWebView ? 'Yes' : 'No'}</p>
      
      <button onClick={handleStartCheque}>Start Cheque Process</button>
      <button onClick={handleGoToProfile}>Open Profile in Native App</button>
    </div>
  );
}

// Example: Cheque Upload Screen with native integration
export function ChequeUploadScreenWithRoutes() {
  const route = useRoute({
    backButton: {
      enabled: true,
      action: 'web',
      fallbackRoute: '/cheque'
    },
    nativeRoutes: [
      {
        route: '/cheque/upload/success',
        action: 'close',
        fallbackRoute: '/dashboard'
      }
    ]
  });

  const handleUploadSuccess = () => {
    // This will close WebView in native app, or go to dashboard in web
    route.push('/cheque/upload/success');
  };

  const handleOpenPayment = () => {
    route.openNative('payment', { 
      amount: 50000, 
      currency: 'IRR',
      description: 'Cheque processing fee'
    }, '/payment');
  };

  const handleRetryUpload = () => {
    route.replace('/cheque/upload');
  };

  return (
    <div>
      <h1>Cheque Upload Screen</h1>
      <p>Current route: {route.pathname}</p>
      
      <button onClick={handleUploadSuccess}>Upload Success (Close WebView)</button>
      <button onClick={handleOpenPayment}>Open Payment in Native App</button>
      <button onClick={handleRetryUpload}>Retry Upload</button>
    </div>
  );
}

// Example: Payment Screen with native integration
export function PaymentScreenWithRoutes() {
  const route = useRoute({
    backButton: {
      enabled: true,
      action: 'web',
      fallbackRoute: '/cheque/upload'
    },
    nativeRoutes: [
      {
        route: '/payment/success',
        action: 'close',
        fallbackRoute: '/dashboard'
      },
      {
        route: '/payment/failed',
        action: 'open',
        params: { screen: 'error', message: 'Payment failed' },
        fallbackRoute: '/payment/error'
      }
    ]
  });

  const handlePaymentSuccess = () => {
    // This will close WebView in native app
    route.push('/payment/success');
  };

  const handlePaymentFailed = () => {
    // This will open error screen in native app
    route.push('/payment/failed');
  };

  const handleBackToUpload = () => {
    route.back();
  };

  return (
    <div>
      <h1>Payment Screen</h1>
      <p>Current route: {route.pathname}</p>
      
      <button onClick={handlePaymentSuccess}>Payment Success (Close WebView)</button>
      <button onClick={handlePaymentFailed}>Payment Failed (Open Native Error)</button>
      <button onClick={handleBackToUpload}>Back to Upload</button>
    </div>
  );
}

// Example: App-level route configuration
export function AppWithRouteConfiguration() {
  const route = useRoute({
    nativeRoutes: [
      // Success routes - close WebView
      { route: '/cheque/success', action: 'close', fallbackRoute: '/dashboard' },
      { route: '/payment/success', action: 'close', fallbackRoute: '/dashboard' },
      { route: '/profile/updated', action: 'close', fallbackRoute: '/profile' },
      
      // Payment routes - open native payment
      { route: '/payment/process', action: 'open', params: { screen: 'payment' }, fallbackRoute: '/payment' },
      { route: '/payment/verify', action: 'open', params: { screen: 'payment_verify' }, fallbackRoute: '/payment' },
      
      // Profile routes - navigate to native profile
      { route: '/profile/edit', action: 'navigate', params: { route: '/profile/edit' }, fallbackRoute: '/profile' },
      { route: '/profile/settings', action: 'navigate', params: { route: '/profile/settings' }, fallbackRoute: '/settings' },
      
      // Bank routes - open specific bank app
      { route: '/bank/tejarat', action: 'open', params: { screen: 'bank', bankCode: 'tejarat' }, fallbackRoute: '/bank' },
      { route: '/bank/melli', action: 'open', params: { screen: 'bank', bankCode: 'melli' }, fallbackRoute: '/bank' },
    ],
    onRouteChange: (path, method) => {
      console.log('App route changed:', path, method);
    },
    onNativeAction: (action, params) => {
      console.log('App native action:', action, params);
    }
  });

  return (
    <div>
      <h1>App with Route Configuration</h1>
      <p>Current route: {route.pathname}</p>
      <p>Is native WebView: {route.isNativeWebView ? 'Yes' : 'No'}</p>
      <p>This handles all app routes that should trigger native actions</p>
    </div>
  );
}

// Example: Using common routes in components
export function ComponentWithCommonRoutes() {
  const {
    goToChequeStart,
    goToChequeUpload,
    goToChequeSuccess,
    openNativeProfile,
    openNativePayment,
    closeWebView
  } = useCommonRoutes();

  return (
    <div>
      <h1>Component with Common Routes</h1>
      
      <h2>Cheque Flow</h2>
      <button onClick={goToChequeStart}>Start Cheque</button>
      <button onClick={goToChequeUpload}>Upload Cheque</button>
      <button onClick={goToChequeSuccess}>Cheque Success (Close WebView)</button>
      
      <h2>Native Actions</h2>
      <button onClick={() => openNativeProfile('123')}>Open Profile</button>
      <button onClick={() => openNativePayment(1000000)}>Open Payment</button>
      <button onClick={closeWebView}>Close WebView</button>
    </div>
  );
}
