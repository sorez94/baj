# Route Hook Guide

The `useRoute` hook provides a comprehensive solution for managing navigation in Next.js applications with WebView native app integration.

## Features

- ✅ **Next.js Integration**: Full support for Next.js routing
- ✅ **WebView Native Integration**: Automatic native app communication
- ✅ **Route-Based Actions**: Automatic native actions based on route changes
- ✅ **Query Parameters**: Easy query parameter management
- ✅ **Back Button Control**: Configurable back button behavior
- ✅ **Callbacks**: Before/after navigation callbacks
- ✅ **TypeScript Support**: Full type safety
- ✅ **Fallback Support**: Web fallbacks when native app is not available

## Basic Usage

### 1. Simple Navigation

```typescript
import { useRoute } from '@/shared/hooks';

function MyComponent() {
  const route = useRoute();

  const handleNavigation = () => {
    route.push('/dashboard');
  };

  return (
    <div>
      <button onClick={handleNavigation}>Go to Dashboard</button>
    </div>
  );
}
```

### 2. Native App Integration

```typescript
function MyComponent() {
  const route = useRoute();

  const handleNativeAction = () => {
    route.openNative('profile', { userId: '123' }, '/profile');
  };

  return (
    <div>
      <button onClick={handleNativeAction}>Open Native Profile</button>
    </div>
  );
}
```

## Advanced Configuration

### 1. Route-Based Native Actions

```typescript
function App() {
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
    ],
    onRouteChange: (path, method) => {
      console.log('Route changed:', path, method);
    },
    onNativeAction: (action, params) => {
      console.log('Native action:', action, params);
    }
  });

  return <div>App with route configuration</div>;
}
```

### 2. Back Button Configuration

```typescript
function MyScreen() {
  const route = useRoute({
    backButton: {
      enabled: true,
      action: 'close', // or 'web'
      fallbackRoute: '/dashboard'
    }
  });

  return <div>Screen with configured back button</div>;
}
```

## API Reference

### useRoute Options

```typescript
interface UseRouteOptions {
  nativeRoutes?: Array<{
    route: string;
    action: 'close' | 'open' | 'navigate';
    params?: Record<string, any>;
    fallbackRoute?: string;
  }>;
  defaultMethod?: 'push' | 'replace' | 'back' | 'refresh';
  defaultReplace?: boolean;
  onRouteChange?: (path: string, method: string) => void;
  onNativeAction?: (action: string, params?: any) => void;
  backButton?: {
    enabled?: boolean;
    action?: 'close' | 'open' | 'navigate' | 'web';
    params?: any;
    fallbackRoute?: string;
  };
}
```

### Navigation Methods

```typescript
// Basic navigation
route.push('/dashboard');
route.replace('/profile');
route.back();
route.refresh();

// Advanced navigation with options
route.navigate({
  path: '/dashboard',
  options: { method: 'push', scroll: true },
  onBeforeNavigate: () => true,
  onAfterNavigate: () => console.log('Navigated')
});

// Native app navigation
route.openNative('profile', { userId: '123' }, '/profile');
route.navigateToNative('/cheque/detail', { id: '123' }, '/cheque/123');
route.closeNative('/dashboard');
```

### Query Parameters

```typescript
// Get query parameters
const userId = route.getQueryParam('userId');
const allParams = route.getAllQueryParams();

// Update query parameters
route.updateQueryParams({ userId: '123', tab: 'profile' });
route.updateQueryParams({ userId: null }); // Remove parameter
```

### State and Utilities

```typescript
// Current state
const currentRoute = route.currentRoute;
const pathname = route.pathname;
const isNavigating = route.isNavigating;
const isNativeWebView = route.isNativeWebView;

// Utilities
const isCurrent = route.isCurrentRoute('/dashboard');
const router = route.router; // Next.js router instance
```

## Common Patterns

### 1. Success Screens

```typescript
function SuccessScreen() {
  const route = useRoute({
    backButton: {
      enabled: true,
      action: 'close',
      fallbackRoute: '/dashboard'
    }
  });

  return <div>Success! WebView will close.</div>;
}
```

### 2. Payment Flows

```typescript
function PaymentScreen() {
  const route = useRoute();

  const handlePayment = () => {
    route.openNative('payment', { 
      amount: 1000000, 
      currency: 'IRR' 
    }, '/payment');
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
```

### 3. Profile Management

```typescript
function ProfileScreen() {
  const route = useRoute();

  const handleEditProfile = () => {
    route.navigateToNative('/profile/edit', { userId: '123' }, '/profile/edit');
  };

  return (
    <div>
      <button onClick={handleEditProfile}>Edit Profile</button>
    </div>
  );
}
```

### 4. Conditional Navigation

```typescript
function ConditionalScreen() {
  const route = useRoute();
  const [hasChanges, setHasChanges] = useState(false);

  const handleNavigation = () => {
    route.navigate({
      path: '/dashboard',
      onBeforeNavigate: () => {
        if (hasChanges) {
          return confirm('You have unsaved changes. Continue?');
        }
        return true;
      }
    });
  };

  return (
    <div>
      <button onClick={handleNavigation}>Go to Dashboard</button>
    </div>
  );
}
```

## useCommonRoutes Hook

Pre-configured hook with common route patterns:

```typescript
import { useCommonRoutes } from '@/shared/hooks';

function MyComponent() {
  const {
    // Web routes
    goToHome,
    goToDashboard,
    goToProfile,
    goToChequeStart,
    goToChequeUpload,
    
    // Native routes
    openNativeProfile,
    openNativePayment,
    closeWebView,
    
    // Route instance
    route
  } = useCommonRoutes();

  return (
    <div>
      <button onClick={goToHome}>Home</button>
      <button onClick={goToChequeStart}>Start Cheque</button>
      <button onClick={() => openNativeProfile('123')}>Open Profile</button>
      <button onClick={closeWebView}>Close WebView</button>
    </div>
  );
}
```

## Integration with Existing Screens

### Before (Manual)

```typescript
function ChequeUploadScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBackAction({
      actionType: 'cheque/previousScreen',
      payload: null
    }));
  }, [dispatch]);

  const handleSuccess = () => {
    router.push('/cheque/success');
  };

  return <div>Upload Screen</div>;
}
```

### After (Route Hook)

```typescript
function ChequeUploadScreen() {
  const route = useRoute({
    backButton: {
      enabled: true,
      action: 'web',
      fallbackRoute: '/cheque'
    },
    nativeRoutes: [
      {
        route: '/cheque/success',
        action: 'close',
        fallbackRoute: '/dashboard'
      }
    ]
  });

  const handleSuccess = () => {
    route.push('/cheque/success'); // Will close WebView automatically
  };

  return <div>Upload Screen</div>;
}
```

## Best Practices

1. **Use route-based configuration** for app-wide native actions
2. **Always provide fallback routes** for web compatibility
3. **Use callbacks** for complex navigation logic
4. **Test in both WebView and web** environments
5. **Use TypeScript** for better type safety
6. **Keep native params simple** and serializable

## Migration Guide

### Step 1: Replace useRouter

```typescript
// Before
const router = useRouter();
router.push('/dashboard');

// After
const route = useRoute();
route.push('/dashboard');
```

### Step 2: Replace back button logic

```typescript
// Before
useEffect(() => {
  dispatch(setBackAction({
    actionType: 'cheque/previousScreen',
    payload: null
  }));
}, [dispatch]);

// After
const route = useRoute({
  backButton: {
    enabled: true,
    action: 'web',
    fallbackRoute: '/cheque'
  }
});
```

### Step 3: Add native app integration

```typescript
// Before
const handleNativeAction = () => {
  // Manual native app communication
};

// After
const route = useRoute();
const handleNativeAction = () => {
  route.openNative('profile', { userId: '123' }, '/profile');
};
```

## Troubleshooting

### Common Issues

1. **Navigation not working**: Check that routes exist in your Next.js app
2. **Native actions not working**: Verify native app message handlers are set up
3. **Fallback not working**: Ensure fallback routes are valid
4. **TypeScript errors**: Make sure to import types correctly

### Debug Tips

```typescript
const route = useRoute({
  onRouteChange: (path, method) => {
    console.log('Route changed:', path, method);
  },
  onNativeAction: (action, params) => {
    console.log('Native action:', action, params);
  }
});

console.log('Route state:', {
  currentRoute: route.currentRoute,
  pathname: route.pathname,
  isNavigating: route.isNavigating,
  isNativeWebView: route.isNativeWebView
});
```
