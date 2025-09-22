# Native App Integration Guide

This guide explains how to integrate WebView with native iOS and Android apps using the provided hooks.

## Overview

The native app integration system allows you to:
- Detect when the app is running in iOS/Android WebView
- Close the WebView and open native app screens
- Send data to native apps
- Handle route-based native actions
- Provide fallbacks for web-only environments

## Setup

### 1. iOS WebView Setup

In your iOS app, add message handlers to the WKWebView:

```swift
// In your iOS ViewController
webView.configuration.userContentController.add(self, name: "closeWebView")
webView.configuration.userContentController.add(self, name: "openNativeApp")
webView.configuration.userContentController.add(self, name: "navigateToNative")

// Handle messages
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    switch message.name {
    case "closeWebView":
        // Close the WebView
        dismiss(animated: true)
        
    case "openNativeApp":
        if let data = message.body as? [String: Any],
           let screen = data["screen"] as? String {
            // Navigate to native screen
            navigateToScreen(screen, data: data)
        }
        
    case "navigateToNative":
        if let data = message.body as? [String: Any],
           let route = data["route"] as? String {
            // Navigate to native route
            navigateToRoute(route, params: data["params"])
        }
        
    default:
        break
    }
}
```

### 2. Android WebView Setup

In your Android app, add JavaScript interfaces:

```java
// In your Android Activity
webView.addJavascriptInterface(new WebAppInterface(this), "Android");

public class WebAppInterface {
    Context mContext;
    
    WebAppInterface(Context c) {
        mContext = c;
    }
    
    @JavascriptInterface
    public void closeWebView() {
        // Close the WebView
        finish();
    }
    
    @JavascriptInterface
    public void openNativeApp(String data) {
        try {
            JSONObject jsonData = new JSONObject(data);
            String screen = jsonData.getString("screen");
            // Navigate to native screen
            navigateToScreen(screen, jsonData);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    
    @JavascriptInterface
    public void navigateToNative(String route, String params) {
        // Navigate to native route
        navigateToRoute(route, params);
    }
}
```

## Usage Examples

### 1. Basic Native Actions

```typescript
import { useBackAction, useNativeBackActions } from '@/shared/hooks';

function MyScreen() {
  // Close WebView when back is pressed
  useBackAction({ 
    nativeAction: 'close',
    fallbackRoute: '/' // Fallback for web
  });

  return <div>My Screen</div>;
}
```

### 2. Open Native Screen

```typescript
function ProfileScreen() {
  const { openProfile } = useNativeBackActions();

  // Open profile in native app
  useBackAction({ 
    nativeAction: 'open',
    nativeParams: { screen: 'profile', userId: '123' },
    fallbackRoute: '/profile'
  });

  return <div>Profile Screen</div>;
}
```

### 3. Navigate to Native Route

```typescript
function ChequeDetailScreen() {
  const { navigateToNative } = useNativeBackActions();

  // Navigate to native route with params
  useBackAction({ 
    nativeAction: 'navigate',
    nativeParams: { 
      route: '/cheque/detail', 
      params: { chequeId: '123', action: 'view' }
    },
    fallbackRoute: '/cheque/detail/123'
  });

  return <div>Cheque Detail Screen</div>;
}
```

### 4. Route-Based Detection

```typescript
function AppWithRouteDetection() {
  const nativeRoutes = [
    {
      route: '/cheque/success',
      action: 'close' as const,
      fallbackRoute: '/dashboard'
    },
    {
      route: '/payment/process',
      action: 'open' as const,
      params: { screen: 'payment', amount: 50000 },
      fallbackRoute: '/payment'
    }
  ];

  useWebViewNativeBridge({
    nativeRoutes,
    onRouteChange: (route) => {
      console.log('Route changed:', route);
    },
    onNativeAction: (action, params) => {
      console.log('Native action:', action, params);
    }
  });

  return <div>App with route detection</div>;
}
```

### 5. Dynamic Native Actions

```typescript
function DynamicScreen() {
  const { isNativeWebView, closeWebView, openNativeApp } = useWebViewNativeBridge();
  const [actionType, setActionType] = useState<'close' | 'open'>('close');

  // Dynamic action based on state
  useBackAction({ 
    nativeAction: actionType,
    nativeParams: actionType === 'open' ? { screen: 'settings' } : undefined,
    fallbackRoute: '/'
  });

  return (
    <div>
      <p>Native WebView: {isNativeWebView ? 'Yes' : 'No'}</p>
      <button onClick={() => setActionType(actionType === 'close' ? 'open' : 'close')}>
        Toggle Action
      </button>
    </div>
  );
}
```

## Available Hooks

### useBackAction

Main hook for setting back actions with native app support.

```typescript
useBackAction({
  nativeAction: 'close' | 'open' | 'navigate',
  nativeParams?: any,
  fallbackRoute?: string,
  // ... other options
});
```

### useNativeBackActions

Convenience hook with pre-configured native actions.

```typescript
const {
  closeWebView,
  openNativeApp,
  navigateToNative,
  openProfile,
  openSettings,
  openPayment,
  openBankApp
} = useNativeBackActions();
```

### useWebViewNativeBridge

Advanced hook for route-based detection and native communication.

```typescript
const {
  isNativeWebView,
  isIOSWebView,
  isAndroidWebView,
  closeWebView,
  openNativeApp,
  navigateToNative
} = useWebViewNativeBridge({
  nativeRoutes: [...],
  onRouteChange: (route) => {...},
  onNativeAction: (action, params) => {...}
});
```

## Common Patterns

### 1. Success Screens

```typescript
// After successful operations, close WebView
useBackAction({ 
  nativeAction: 'close',
  fallbackRoute: '/dashboard'
});
```

### 2. Payment Flows

```typescript
// Open native payment
useBackAction({ 
  nativeAction: 'open',
  nativeParams: { 
    screen: 'payment', 
    amount: 1000000, 
    currency: 'IRR' 
  },
  fallbackRoute: '/payment'
});
```

### 3. Profile Management

```typescript
// Open native profile
useBackAction({ 
  nativeAction: 'navigate',
  nativeParams: { 
    route: '/profile/edit', 
    params: { userId: '123' } 
  },
  fallbackRoute: '/profile'
});
```

### 4. Bank Integration

```typescript
// Open specific bank app
useBackAction({ 
  nativeAction: 'open',
  nativeParams: { 
    screen: 'bank', 
    bankCode: 'tejarat' 
  },
  fallbackRoute: '/bank'
});
```

## Testing

### Web Testing

When testing in a web browser, the hooks will automatically fall back to web routes:

```typescript
useBackAction({ 
  nativeAction: 'close',
  fallbackRoute: '/dashboard' // This will be used in web
});
```

### Native Testing

In native WebView, the hooks will attempt to communicate with the native app. Make sure your native app has the proper message handlers set up.

## Error Handling

The hooks include built-in error handling:

- If native app is not available, falls back to web routes
- Logs warnings when native actions are not supported
- Gracefully handles missing message handlers

## Best Practices

1. **Always provide fallback routes** for web compatibility
2. **Test in both WebView and web browser** environments
3. **Use route-based detection** for app-wide native integration
4. **Keep native params simple** and serializable
5. **Handle errors gracefully** in your native app code
6. **Use TypeScript** for better type safety

## Troubleshooting

### Common Issues

1. **Native actions not working**: Check that message handlers are properly set up in native app
2. **Fallback not working**: Ensure fallback routes are valid and accessible
3. **TypeScript errors**: Make sure Window interface is properly extended
4. **Route detection not working**: Verify route patterns match exactly

### Debug Tips

```typescript
const { isNativeWebView, isIOSWebView, isAndroidWebView } = useWebViewNativeBridge();

console.log('Environment:', {
  isNativeWebView,
  isIOSWebView,
  isAndroidWebView,
  userAgent: navigator.userAgent
});
```
