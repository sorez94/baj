'use client';

import React from 'react';
import { useRoute } from '../useRoute';

// Example 1: Basic dispatch usage
export function BasicDispatchExample() {
  const route = useRoute();

  const handleDispatchAction = () => {
    // Dispatch a Redux action
    route.dispatch('cheque/setScreen', 'chequeUploadScreen');
  };

  const handleNavigateAndDispatch = () => {
    // Navigate and dispatch in sequence
    route.push('/cheque/upload');
    route.dispatch('cheque/setChequeScreen', 'upload');
  };

  return (
    <div>
      <h1>Basic Dispatch Example</h1>
      <p>Current route: {route.pathname}</p>
      
      <button onClick={handleDispatchAction}>Dispatch Action</button>
      <button onClick={handleNavigateAndDispatch}>Navigate & Dispatch</button>
    </div>
  );
}

// Example 2: Dispatch with payload
export function DispatchWithPayloadExample() {
  const route = useRoute();

  const handleSetUser = () => {
    route.dispatch('user/setUser', { 
      id: '123', 
      name: 'John Doe', 
      email: 'john@example.com' 
    });
  };

  const handleUpdateChequeData = () => {
    route.dispatch('cheque/updateChequeData', {
      amount: 1000000,
      currency: 'IRR',
      beneficiary: 'Test Company'
    });
  };

  const handleClearData = () => {
    route.dispatch('cheque/clearAllData');
  };

  return (
    <div>
      <h1>Dispatch with Payload Example</h1>
      
      <button onClick={handleSetUser}>Set User</button>
      <button onClick={handleUpdateChequeData}>Update Cheque Data</button>
      <button onClick={handleClearData}>Clear Data</button>
    </div>
  );
}

// Example 3: Complex navigation with dispatch
export function ComplexNavigationExample() {
  const route = useRoute();

  const handleChequeFlow = () => {
    // Start cheque process
    route.dispatch('cheque/initChequeRequest', {
      sub_system_id: 'test',
      facility_amount: 1000000,
      guarantee_amount: 500000,
      installment_duration: '12',
      installment_amount: 83333,
      due_date: '1404/12/30'
    });

    // Navigate to next screen
    route.push('/cheque/accounts');
  };

  const handleUploadFlow = () => {
    // Set upload state
    route.dispatch('cheque/setChequeScreen', 'upload');
    
    // Navigate to upload
    route.push('/cheque/upload');
    
    // Dispatch upload start
    route.dispatch('cheque/startUpload', { type: 'front' });
  };

  const handleSuccessFlow = () => {
    // Mark as successful
    route.dispatch('cheque/setUploadSuccess', true);
    
    // Navigate to success (will close WebView)
    route.push('/cheque/success');
  };

  return (
    <div>
      <h1>Complex Navigation Example</h1>
      
      <button onClick={handleChequeFlow}>Start Cheque Flow</button>
      <button onClick={handleUploadFlow}>Start Upload Flow</button>
      <button onClick={handleSuccessFlow}>Complete Success Flow</button>
    </div>
  );
}

// Example 4: Dispatch with native app integration
export function NativeDispatchExample() {
  const route = useRoute();

  const handleNativeProfile = () => {
    // Dispatch local state update
    route.dispatch('ui/setLoading', true);
    
    // Open native profile
    route.openNative('profile', { userId: '123' }, '/profile');
    
    // Dispatch completion
    route.dispatch('ui/setLoading', false);
  };

  const handleNativePayment = () => {
    // Prepare payment data
    const paymentData = {
      amount: 1000000,
      currency: 'IRR',
      description: 'Cheque processing fee'
    };

    // Dispatch payment start
    route.dispatch('payment/startPayment', paymentData);
    
    // Open native payment
    route.openNative('payment', paymentData, '/payment');
  };

  const handleCloseWebView = () => {
    // Clear all data before closing
    route.dispatch('cheque/clearAllData');
    route.dispatch('ui/clearAllStates');
    
    // Close WebView
    route.closeNative('/');
  };

  return (
    <div>
      <h1>Native Dispatch Example</h1>
      <p>Is native WebView: {route.isNativeWebView ? 'Yes' : 'No'}</p>
      
      <button onClick={handleNativeProfile}>Open Native Profile</button>
      <button onClick={handleNativePayment}>Open Native Payment</button>
      <button onClick={handleCloseWebView}>Close WebView</button>
    </div>
  );
}

// Example 5: Error handling with dispatch
export function ErrorHandlingExample() {
  const route = useRoute();

  const handleErrorFlow = () => {
    try {
      // Dispatch loading state
      route.dispatch('ui/setLoading', true);
      
      // Simulate some operation
      setTimeout(() => {
        // Dispatch error
        route.dispatch('cheque/setError', {
          message: 'Upload failed',
          code: 'UPLOAD_ERROR'
        });
        
        // Clear loading
        route.dispatch('ui/setLoading', false);
        
        // Navigate to error page
        route.push('/cheque/error');
      }, 1000);
      
    } catch (error) {
      // Dispatch error state
      route.dispatch('ui/setError', 'An unexpected error occurred');
    }
  };

  const handleRetryFlow = () => {
    // Clear error state
    route.dispatch('cheque/clearError');
    route.dispatch('ui/clearError');
    
    // Retry operation
    route.dispatch('cheque/retryUpload');
    
    // Navigate back to upload
    route.push('/cheque/upload');
  };

  return (
    <div>
      <h1>Error Handling Example</h1>
      
      <button onClick={handleErrorFlow}>Simulate Error</button>
      <button onClick={handleRetryFlow}>Retry Operation</button>
    </div>
  );
}
