import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store';
import { setBackAction, clearBackAction } from '@/store/uiSlice';

interface UseBackActionOptions {
  actionType?: string;
  payload?: any;
  clearOnUnmount?: boolean;
  // Route navigation options
  route?: string;
  replace?: boolean; // Use router.replace instead of router.push
  // Native app options
  nativeAction?: 'close' | 'open' | 'navigate';
  nativeParams?: any;
  fallbackRoute?: string; // Fallback route for web when native app is not available
}

/**
 * Custom hook to easily set back actions for screens
 * Automatically sets the back action and optionally clears it on unmount
 * 
 * @param options - Configuration for the back action
 * @param options.actionType - Redux action type to dispatch (e.g., 'cheque/previousScreen')
 * @param options.payload - Optional payload to send with the action
 * @param options.clearOnUnmount - Whether to clear the back action when component unmounts (default: true)
 * 
 * @example
 * // Basic usage
 * useBackAction({ actionType: 'cheque/previousScreen' });
 * 
 * // With payload
 * useBackAction({ 
 *   actionType: 'cheque/setScreen', 
 *   payload: 'chequeStartScreen' 
 * });
 * 
 * // Don't clear on unmount
 * useBackAction({ 
 *   actionType: 'cheque/previousScreen',
 *   clearOnUnmount: false 
 * });
 */
export const useBackAction = (options: UseBackActionOptions) => {
  const { 
    actionType, 
    payload = null, 
    clearOnUnmount = true, 
    route, 
    replace = false,
    nativeAction,
    nativeParams,
    fallbackRoute
  } = options;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (nativeAction) {
      // Handle native app actions
      const nativeActionType = `native/${nativeAction}`;
      const nativePayload = {
        ...nativeParams,
        fallbackRoute
      };
      dispatch(setBackAction({ actionType: nativeActionType, payload: nativePayload }));
    } else if (route) {
      // Handle route navigation
      const routeAction = replace ? 'router/replace' : 'router/push';
      dispatch(setBackAction({ actionType: routeAction, payload: route }));
    } else if (actionType) {
      // Handle Redux action
      dispatch(setBackAction({ actionType, payload }));
    }

    // Clear on unmount if requested
    if (clearOnUnmount) {
      return () => {
        dispatch(clearBackAction());
      };
    }
  }, [dispatch, actionType, payload, clearOnUnmount, route, replace, nativeAction, nativeParams, fallbackRoute]);
};

/**
 * Convenience hooks for common route navigation patterns
 */
export const useRouteBackActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const goToRoute = (route: string, replace = false) => {
    const actionType = replace ? 'router/replace' : 'router/push';
    dispatch(setBackAction({ actionType, payload: route }));
  };

  const goToHome = (replace = false) => {
    goToRoute('/', replace);
  };

  const goToPreviousRoute = (replace = false) => {
    goToRoute('..', replace);
  };

  const goBack = () => {
    dispatch(setBackAction({ 
      actionType: 'cheque/previousScreen', 
      payload: null 
    }));
  };

  const clearBack = () => {
    dispatch(clearBackAction());
  };

  return {
    goToRoute,
    goToHome,
    goToPreviousRoute,
    goBack,
    clearBack
  };
};

/**
 * Convenience hooks for native app actions
 */
export const useNativeBackActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const closeWebView = (fallbackRoute = '/') => {
    dispatch(setBackAction({ 
      actionType: 'native/close', 
      payload: { fallbackRoute }
    }));
  };

  const openNativeApp = (data: any, fallbackRoute = '/') => {
    dispatch(setBackAction({ 
      actionType: 'native/open', 
      payload: { ...data, fallbackRoute }
    }));
  };

  const navigateToNative = (route: string, params?: any, fallbackRoute?: string) => {
    dispatch(setBackAction({ 
      actionType: 'native/navigate', 
      payload: { route, params, fallbackRoute: fallbackRoute || route }
    }));
  };

  const openProfile = (userId?: string, fallbackRoute = '/profile') => {
    openNativeApp({ screen: 'profile', userId }, fallbackRoute);
  };

  const openSettings = (fallbackRoute = '/settings') => {
    openNativeApp({ screen: 'settings' }, fallbackRoute);
  };

  const openPayment = (amount?: number, currency = 'IRR', fallbackRoute = '/payment') => {
    openNativeApp({ screen: 'payment', amount, currency }, fallbackRoute);
  };

  const openBankApp = (bankCode: string, fallbackRoute = '/bank') => {
    openNativeApp({ screen: 'bank', bankCode }, fallbackRoute);
  };

  return {
    closeWebView,
    openNativeApp,
    navigateToNative,
    openProfile,
    openSettings,
    openPayment,
    openBankApp
  };
};
