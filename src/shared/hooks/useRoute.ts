import { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setBackAction, clearBackAction } from '@/store/uiSlice';
import { useWebViewNativeBridge } from './useWebViewNativeBridge';

// Route types
export type RouteMethod = 'push' | 'replace' | 'back' | 'refresh';
export type NativeAction = 'close' | 'open' | 'navigate';

interface RouteOptions {
  method?: RouteMethod;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
}

interface NativeRouteOptions {
  action: NativeAction;
  params?: Record<string, any>;
  fallbackRoute?: string;
}

interface RouteConfig {
  path: string;
  options?: RouteOptions;
  native?: NativeRouteOptions;
  onBeforeNavigate?: () => boolean | Promise<boolean>; // Return false to cancel
  onAfterNavigate?: () => void;
}

interface UseRouteOptions {
  // Global route configurations
  nativeRoutes?: Array<{
    route: string;
    action: NativeAction;
    params?: Record<string, any>;
    fallbackRoute?: string;
  }>;
  
  // Default options
  defaultMethod?: RouteMethod;
  defaultReplace?: boolean;
  
  // Callbacks
  onRouteChange?: (path: string, method: RouteMethod) => void;
  onNativeAction?: (action: NativeAction, params?: any) => void;
  
  // Back button configuration
  backButton?: {
    enabled?: boolean;
    action?: NativeAction | 'web';
    params?: any;
    fallbackRoute?: string;
  };
}

/**
 * Comprehensive route management hook
 * Handles both WebView native integration and Next.js routing
 */
export const useRoute = (options: UseRouteOptions = {}) => {
  const {
    nativeRoutes = [],
    defaultMethod = 'push',
    defaultReplace = false,
    onRouteChange,
    onNativeAction,
    backButton
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  
  const { isNativeWebView, closeWebView, openNativeApp, navigateToNative } = useWebViewNativeBridge();
  
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(pathname);

  // Navigate to a route
  const navigate = useCallback(async (config: RouteConfig | string) => {
    const routeConfig: RouteConfig = typeof config === 'string' 
      ? { path: config } 
      : config;

    const {
      path,
      options = {},
      native,
      onBeforeNavigate,
      onAfterNavigate
    } = routeConfig;

    const {
      method = defaultMethod,
      replace = defaultReplace,
      scroll = true,
      shallow = false
    } = options;

    try {
      setIsNavigating(true);

      // Check if navigation should be cancelled
      if (onBeforeNavigate) {
        const shouldProceed = await onBeforeNavigate();
        if (!shouldProceed) {
          return;
        }
      }

      // Handle native WebView actions
      if (isNativeWebView && native) {
        const { action, params, fallbackRoute } = native;
        
        onNativeAction?.(action, params);

        switch (action) {
          case 'close':
            closeWebView();
            return;
          
          case 'open':
            openNativeApp(params || {});
            return;
          
          case 'navigate':
            navigateToNative(path, params);
            return;
        }
      }

      // Handle web navigation
      switch (method) {
        case 'push':
          router.push(path, { scroll });
          break;
        
        case 'replace':
          router.replace(path, { scroll });
          break;
        
        case 'back':
          router.back();
          break;
        
        case 'refresh':
          router.refresh();
          break;
      }

      // Update current route
      setCurrentRoute(path);
      onRouteChange?.(path, method);
      onAfterNavigate?.();

    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsNavigating(false);
    }
  }, [
    router, 
    isNativeWebView, 
    closeWebView, 
    openNativeApp, 
    navigateToNative, 
    defaultMethod, 
    defaultReplace,
    onRouteChange,
    onNativeAction
  ]);

  // Quick navigation methods
  const push = useCallback((path: string, options?: RouteOptions) => {
    return navigate({ path, options: { ...options, method: 'push' } });
  }, [navigate]);

  const replace = useCallback((path: string, options?: RouteOptions) => {
    return navigate({ path, options: { ...options, method: 'replace' } });
  }, [navigate]);

  const back = useCallback((options?: RouteOptions) => {
    return navigate({ path: '', options: { ...options, method: 'back' } });
  }, [navigate]);

  const refresh = useCallback((options?: RouteOptions) => {
    return navigate({ path: '', options: { ...options, method: 'refresh' } });
  }, [navigate]);

//   // Native app navigation
//   const navigateToNative = useCallback((path: string, params?: any, fallbackRoute?: string) => {
//     return navigate({
//       path,
//       native: {
//         action: 'navigate',
//         params,
//         fallbackRoute
//       }
//     });
//   }, [navigate]);

  // Dispatch Redux actions
  const dispatchAction = useCallback((actionType: string, payload?: any) => {
    dispatch({ type: actionType, payload });
  }, [dispatch]);


  const openNative = useCallback((screen: string, params?: any, fallbackRoute?: string) => {
    return navigate({
      path: '',
      native: {
        action: 'open',
        params: { screen, ...params },
        fallbackRoute
      }
    });
  }, [navigate]);

  const closeNative = useCallback((fallbackRoute?: string) => {
    return navigate({
      path: '',
      native: {
        action: 'close',
        fallbackRoute
      }
    });
  }, [navigate]);

  // Set up back button behavior
  useEffect(() => {
    if (backButton?.enabled) {
      const { action = 'web', params, fallbackRoute } = backButton;

      if (action === 'web') {
        // Regular web back
        dispatch(setBackAction({ 
          actionType: 'router/back', 
          payload: null 
        }));
      } else {
        // Native back action
        dispatch(setBackAction({ 
          actionType: `native/${action}`, 
          payload: { ...params, fallbackRoute }
        }));
      }
    }

    return () => {
      if (backButton?.enabled) {
        dispatch(clearBackAction());
      }
    };
  }, [backButton, dispatch]);

  // Handle route-based native actions
  useEffect(() => {
    const matchingRoute = nativeRoutes.find(config => 
      pathname === config.route || pathname.startsWith(config.route)
    );

    if (matchingRoute && isNativeWebView) {
      const { action, params, fallbackRoute } = matchingRoute;
      
      onNativeAction?.(action, params);

      switch (action) {
        case 'close':
          closeWebView();
          break;
        
        case 'open':
          openNativeApp(params || {});
          break;
        
        case 'navigate':
          navigateToNative(matchingRoute.route, params);
          break;
      }
    } else if (matchingRoute && matchingRoute.fallbackRoute) {
      // Fallback to web route
      router.push(matchingRoute.fallbackRoute);
    }
  }, [pathname, nativeRoutes, isNativeWebView, closeWebView, openNativeApp, navigateToNative, router, onNativeAction]);

  // Utility functions
  const isCurrentRoute = useCallback((path: string) => {
    return pathname === path;
  }, [pathname]);

  const getQueryParam = useCallback((key: string) => {
    return searchParams.get(key);
  }, [searchParams]);

  const getAllQueryParams = useCallback(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const updateQueryParams = useCallback((params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });

    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
  }, [pathname, searchParams, router]);

  return {
    // Navigation methods
    navigate,
    push,
    replace,
    back,
    refresh,
    
    // Native app methods
    navigateToNative,
    openNative,
    closeNative,
    
    // Redux dispatch
    dispatch: dispatchAction,
    
    // State
    currentRoute,
    pathname,
    isNavigating,
    isNativeWebView,
    
    // Utilities
    isCurrentRoute,
    getQueryParam,
    getAllQueryParams,
    updateQueryParams,
    
    // Router instance (for advanced usage)
    router
  };
};
