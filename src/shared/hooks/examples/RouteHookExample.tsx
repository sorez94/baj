'use client';

import React, { useState } from 'react';
import { useRoute } from '../useRoute';

// Example 1: Basic route navigation
export function BasicRouteExample() {
  const route = useRoute();

  const handleNavigation = () => {
    route.push('/dashboard');
  };

  const handleReplace = () => {
    route.replace('/profile');
  };

  const handleBack = () => {
    route.back();
  };

  return (
    <div>
      <h1>Basic Route Example</h1>
      <p>Current route: {route.pathname}</p>
      <p>Is navigating: {route.isNavigating ? 'Yes' : 'No'}</p>
      <p>Is native WebView: {route.isNativeWebView ? 'Yes' : 'No'}</p>
      
      <button onClick={handleNavigation}>Go to Dashboard</button>
      <button onClick={handleReplace}>Replace with Profile</button>
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
}

// Example 2: Native app integration
export function NativeAppExample() {
  const route = useRoute();

  const handleNativeProfile = () => {
    route.openNative('profile', { userId: '123' }, '/profile');
  };

  const handleNativePayment = () => {
    route.openNative('payment', { amount: 1000000, currency: 'IRR' }, '/payment');
  };

  const handleCloseWebView = () => {
    route.closeNative('/dashboard');
  };

  return (
    <div>
      <h1>Native App Example</h1>
      <button onClick={handleNativeProfile}>Open Native Profile</button>
      <button onClick={handleNativePayment}>Open Native Payment</button>
      <button onClick={handleCloseWebView}>Close WebView</button>
    </div>
  );
}

// Example 3: Route with callbacks
export function RouteWithCallbacksExample() {
  const route = useRoute({
    onRouteChange: (path, method) => {
      console.log('Route changed:', path, method);
    },
    onNativeAction: (action, params) => {
      console.log('Native action:', action, params);
    }
  });

  const handleNavigation = () => {
    route.navigate({
      path: '/dashboard',
      options: { method: 'push' },
      onBeforeNavigate: () => {
        console.log('Before navigation');
        return true; // Return false to cancel
      },
      onAfterNavigate: () => {
        console.log('After navigation');
      }
    });
  };

  return (
    <div>
      <h1>Route with Callbacks</h1>
      <button onClick={handleNavigation}>Navigate with Callbacks</button>
    </div>
  );
}

// Example 4: Query parameters
export function QueryParamsExample() {
  const route = useRoute();
  const [userId, setUserId] = useState('');

  const handleSetUserId = () => {
    route.updateQueryParams({ userId });
  };

  const handleClearParams = () => {
    route.updateQueryParams({ userId: null });
  };

  return (
    <div>
      <h1>Query Parameters Example</h1>
      <p>Current userId: {route.getQueryParam('userId') || 'None'}</p>
      <p>All params: {JSON.stringify(route.getAllQueryParams())}</p>
      
      <input 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
        placeholder="Enter user ID"
      />
      <button onClick={handleSetUserId}>Set User ID</button>
      <button onClick={handleClearParams}>Clear Params</button>
    </div>
  );
}

// Example 5: Back button configuration
export function BackButtonExample() {
  const route = useRoute({
    backButton: {
      enabled: true,
      action: 'close', // or 'web'
      fallbackRoute: '/dashboard'
    }
  });

  return (
    <div>
      <h1>Back Button Example</h1>
      <p>Back button is configured to close WebView</p>
    </div>
  );
}

// Example 6: Route-based native actions
export function RouteBasedNativeExample() {
  const route = useRoute({
    nativeRoutes: [
      {
        route: '/cheque/success',
        action: 'close',
        fallbackRoute: '/dashboard'
      },
      {
        route: '/payment/process',
        action: 'open',
        params: { screen: 'payment' },
        fallbackRoute: '/payment'
      }
    ]
  });

  const goToSuccess = () => {
    route.push('/cheque/success');
  };

  const goToPayment = () => {
    route.push('/payment/process');
  };

  return (
    <div>
      <h1>Route-Based Native Example</h1>
      <button onClick={goToSuccess}>Go to Success (will close WebView)</button>
      <button onClick={goToPayment}>Go to Payment (will open native payment)</button>
    </div>
  );
}

