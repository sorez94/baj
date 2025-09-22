import { useCallback } from 'react';

// Extend Window interface for iOS WebView properties
declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        [key: string]: {
          postMessage: (message: any) => void;
        };
      };
    };
    Android?: {
      [key: string]: ((data?: any) => void) | undefined;
    };
    MSStream?: any;
  }
}

interface WebViewBackOptions {
  onBack?: () => void;
  clearHistory?: boolean;
}

export const useWebViewBack = (options: WebViewBackOptions = {}) => {
  const { onBack, clearHistory = true } = options;

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }

    // Check if we're in iOS WebView
    const isIOSWebView = /iPad|iPhone|iPod/.test(navigator.userAgent) && 
                         !window.MSStream && 
                         window.webkit?.messageHandlers;

    if (isIOSWebView) {
      try {
        // Method 1: Try to close the WebView directly via message handler
        if (window.webkit?.messageHandlers?.closeWebView) {
          window.webkit.messageHandlers.closeWebView.postMessage({});
          return;
        }
        
        // Method 2: Try window.close()
        window.close();
      } catch (e) {
        // Method 3: Fallback to history back
        if (window.history.length > 1) {
          window.history.back();
        } else {
          // Method 4: Navigate to about:blank to clear the page
          window.location.href = 'about:blank';
        }
      }
    } else {
      // For regular browsers
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.close();
      }
    }
  }, [onBack]);

  const clearBrowserHistory = useCallback(() => {
    if (clearHistory && window.history.replaceState) {
      // Replace current history entry to prevent going back
      window.history.replaceState(null, '', window.location.href);
    }
  }, [clearHistory]);

  return {
    handleBack,
    clearBrowserHistory,
    isIOSWebView: /iPad|iPhone|iPod/.test(navigator.userAgent) && 
                  !window.MSStream && 
                  window.webkit?.messageHandlers
  };
};
