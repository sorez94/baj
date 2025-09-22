import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Extend Window interface for native app communication
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

interface NativeRouteConfig {
  route: string;
  action: 'close' | 'open' | 'navigate';
  params?: Record<string, any>;
  fallbackRoute?: string; // Fallback if native app is not available
}

interface UseWebViewNativeBridgeOptions {
  nativeRoutes?: NativeRouteConfig[];
  onRouteChange?: (route: string) => void;
  onNativeAction?: (action: string, params?: any) => void;
}

/**
 * Hook for handling WebView to native app communication
 * Detects special routes and triggers native app actions
 */
export const useWebViewNativeBridge = (options: UseWebViewNativeBridgeOptions = {}) => {
  const { nativeRoutes = [], onRouteChange, onNativeAction } = options;
  const router = useRouter();
  const pathname = usePathname();

  // Detect if we're in a native WebView
  const isIOSWebView = /iPad|iPhone|iPod/.test(navigator.userAgent) && 
                       !window.MSStream && 
                       window.webkit?.messageHandlers;

  const isAndroidWebView = /Android/.test(navigator.userAgent) && 
                           window.Android;

  const isNativeWebView = isIOSWebView || isAndroidWebView;

  // Handle native app communication
  const sendToNative = useCallback((action: string, data: any) => {
    if (isIOSWebView && window.webkit?.messageHandlers?.[action]) {
      window.webkit.messageHandlers[action].postMessage(data);
    } else if (isAndroidWebView && window.Android?.[action]) {
      if (typeof window.Android[action] === 'function') {
        window.Android[action](data);
      }
    } else {
      console.warn(`Native action ${action} not available`);
    }
  }, [isIOSWebView, isAndroidWebView]);

  // Handle route changes and check for native routes
  useEffect(() => {
    onRouteChange?.(pathname);

    // Check if current route should trigger native action
    const matchingRoute = nativeRoutes.find(config => 
      pathname === config.route || pathname.startsWith(config.route)
    );

    if (matchingRoute && isNativeWebView) {
      const { action, params, fallbackRoute } = matchingRoute;

      onNativeAction?.(action, params);

      switch (action) {
        case 'close':
          sendToNative('closeWebView', {});
          break;
        
        case 'open':
          sendToNative('openNativeApp', params);
          break;
        
        case 'navigate':
          sendToNative('navigateToNative', { route: matchingRoute.route, params });
          break;
      }
    } else if (matchingRoute && matchingRoute.fallbackRoute) {
      // Fallback to web route if native app is not available
      router.push(matchingRoute.fallbackRoute);
    }
  }, [pathname, nativeRoutes, isNativeWebView, sendToNative, router, onRouteChange, onNativeAction]);

  // Utility functions
  const closeWebView = useCallback(() => {
    sendToNative('closeWebView', {});
  }, [sendToNative]);

  const openNativeApp = useCallback((data: any) => {
    sendToNative('openNativeApp', data);
  }, [sendToNative]);

  const navigateToNative = useCallback((route: string, params?: any) => {
    sendToNative('navigateToNative', { route, params });
  }, [sendToNative]);

  return {
    isNativeWebView,
    isIOSWebView,
    isAndroidWebView,
    closeWebView,
    openNativeApp,
    navigateToNative,
    sendToNative
  };
};

/**
 * Pre-configured hook for common native app patterns
 */
export const useNativeAppActions = () => {
  const { closeWebView, openNativeApp, navigateToNative } = useWebViewNativeBridge();

  const openProfile = (userId?: string) => {
    openNativeApp({ screen: 'profile', userId });
  };

  const openSettings = () => {
    openNativeApp({ screen: 'settings' });
  };

  const openPayment = (amount?: number, currency = 'IRR') => {
    openNativeApp({ screen: 'payment', amount, currency });
  };

  const openChequeDetail = (chequeId: string) => {
    navigateToNative('/cheque/detail', { chequeId });
  };

  const openBankApp = (bankCode: string) => {
    openNativeApp({ screen: 'bank', bankCode });
  };

  return {
    closeWebView,
    openProfile,
    openSettings,
    openPayment,
    openChequeDetail,
    openBankApp,
    openNativeApp,
    navigateToNative
  };
};
