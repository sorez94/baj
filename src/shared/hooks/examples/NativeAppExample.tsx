'use client';

import React from 'react';
import { useBackAction, useNativeBackActions, useWebViewNativeBridge } from '../index';

// Example 1: Simple native app action
export function SimpleNativeScreen() {
  // Close WebView and open native app when back is pressed
  useBackAction({ 
    nativeAction: 'close',
    fallbackRoute: '/' // Fallback for web
  });

  return (
    <div>
      <h1>Simple Native Screen</h1>
      <p>Back button will close WebView and open native app</p>
    </div>
  );
}

// Example 2: Open specific native screen
export function ProfileScreen() {
  const { openProfile } = useNativeBackActions();

  // Open profile in native app when back is pressed
  useBackAction({ 
    nativeAction: 'open',
    nativeParams: { screen: 'profile', userId: '123' },
    fallbackRoute: '/profile'
  });

  return (
    <div>
      <h1>Profile Screen</h1>
      <p>Back button will open profile in native app</p>
    </div>
  );
}

// Example 3: Navigate to native route with params
export function ChequeDetailScreen() {
  const { navigateToNative } = useNativeBackActions();

  // Navigate to native route when back is pressed
  useBackAction({ 
    nativeAction: 'navigate',
    nativeParams: { 
      route: '/cheque/detail', 
      params: { chequeId: '123', action: 'view' }
    },
    fallbackRoute: '/cheque/detail/123'
  });

  return (
    <div>
      <h1>Cheque Detail Screen</h1>
      <p>Back button will navigate to native cheque detail</p>
    </div>
  );
}

// Example 4: Dynamic native actions
export function DynamicNativeScreen() {
  const { isNativeWebView, closeWebView, openNativeApp } = useWebViewNativeBridge();
  const [actionType, setActionType] = React.useState<'close' | 'open' | 'navigate'>('close');

  // Dynamic native action based on state
  useBackAction({ 
    nativeAction: actionType,
    nativeParams: actionType === 'open' ? { screen: 'settings' } : undefined,
    fallbackRoute: '/'
  });

  return (
    <div>
      <h1>Dynamic Native Screen</h1>
      <p>Native WebView: {isNativeWebView ? 'Yes' : 'No'}</p>
      <p>Action Type: {actionType}</p>
      <button onClick={() => setActionType(actionType === 'close' ? 'open' : 'close')}>
        Toggle Action
      </button>
    </div>
  );
}

// Example 5: Payment screen with native app
export function PaymentScreen() {
  const { openPayment } = useNativeBackActions();

  // Open payment in native app
  useBackAction({ 
    nativeAction: 'open',
    nativeParams: { 
      screen: 'payment', 
      amount: 1000000, 
      currency: 'IRR',
      description: 'Cheque processing fee'
    },
    fallbackRoute: '/payment'
  });

  return (
    <div>
      <h1>Payment Screen</h1>
      <p>Back button will open payment in native app</p>
    </div>
  );
}

// Example 6: Bank app integration
export function BankIntegrationScreen() {
  const { openBankApp } = useNativeBackActions();

  // Open specific bank app
  useBackAction({ 
    nativeAction: 'open',
    nativeParams: { 
      screen: 'bank', 
      bankCode: 'tejarat',
      action: 'cheque_processing'
    },
    fallbackRoute: '/bank/tejarat'
  });

  return (
    <div>
      <h1>Bank Integration Screen</h1>
      <p>Back button will open Tejarat Bank app</p>
    </div>
  );
}
