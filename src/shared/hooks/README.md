# Back Action Hooks

This directory contains custom hooks for managing back button actions in the application.

## useBackAction

The main hook for setting back actions on screens. Automatically handles setting and clearing back actions.

### Basic Usage

```typescript
import { useBackAction } from '@/shared/hooks/useBackAction';

function MyScreen() {
  // Simple back to previous screen
  useBackAction({ 
    actionType: 'cheque/previousScreen',
    payload: null 
  });

  return <div>My Screen</div>;
}
```

### Advanced Usage

```typescript
import { useBackAction } from '@/shared/hooks/useBackAction';

function MyScreen() {
  // Back to specific screen with payload
  useBackAction({ 
    actionType: 'cheque/setScreen',
    payload: 'chequeStartScreen',
    clearOnUnmount: true // default: true
  });

  return <div>My Screen</div>;
}
```

### Parameters

- `actionType` (string, optional): Redux action type to dispatch
- `payload` (any, optional): Payload to send with the action
- `clearOnUnmount` (boolean, optional): Whether to clear the back action when component unmounts (default: true)
- `route` (string, optional): Route to navigate to (e.g., '/dashboard', '/profile')
- `replace` (boolean, optional): Use router.replace instead of router.push (default: false)

## useRouteBackActions

Convenience hook for common route navigation patterns.

### Usage

```typescript
import { useRouteBackActions } from '@/shared/hooks/useBackAction';

function MyScreen() {
  const { goToRoute, goToHome, goToPreviousRoute, goBack, clearBack } = useRouteBackActions();

  const handleSomeAction = () => {
    // Go to specific route
    goToRoute('/dashboard');
    goToRoute('/profile', true); // with replace
    
    // Go to home
    goToHome();
    
    // Go to previous route
    goToPreviousRoute();
    
    // Go back to previous screen (Redux action)
    goBack();
    
    // Clear back action
    clearBack();
  };

  return <div>My Screen</div>;
}
```

### Available Actions

- `goToRoute(route: string, replace?: boolean)`: Navigate to specific route
- `goToHome(replace?: boolean)`: Navigate to home page
- `goToPreviousRoute(replace?: boolean)`: Navigate to previous route
- `goBack()`: Go to previous screen (Redux action)
- `clearBack()`: Clear back action

## useCommonBackActions

Generic hook for common back actions.

### Usage

```typescript
import { useCommonBackActions } from '@/shared/hooks/useBackAction';

function MyScreen() {
  const { setPreviousScreen, setNextScreen, setSpecificScreen, clearBack } = useCommonBackActions();

  const handleAction = () => {
    setPreviousScreen();
    setNextScreen();
    setSpecificScreen('someScreen');
    clearBack();
  };

  return <div>My Screen</div>;
}
```

## Examples

### Example 1: Simple Back Navigation

```typescript
function ChequeUploadScreen() {
  // Just go back to previous screen
  useBackAction({ 
    actionType: 'cheque/previousScreen',
    payload: null 
  });

  return <div>Upload Screen</div>;
}
```

### Example 2: Back to Specific Screen

```typescript
function ChequeConfirmScreen() {
  // Go back to start screen when back is pressed
  useBackAction({ 
    actionType: 'cheque/setScreen',
    payload: 'chequeStartScreen'
  });

  return <div>Confirm Screen</div>;
}
```

### Example 3: Dynamic Back Actions

```typescript
function ChequeDynamicScreen() {
  const { goToStart, goToUpload, disableBack } = useChequeBackActions();
  const [shouldAllowBack, setShouldAllowBack] = useState(true);

  useEffect(() => {
    if (shouldAllowBack) {
      goToStart();
    } else {
      disableBack();
    }
  }, [shouldAllowBack, goToStart, disableBack]);

  return <div>Dynamic Screen</div>;
}
```

### Example 4: Route Navigation

```typescript
function DashboardScreen() {
  // Navigate to home page when back is pressed
  useBackAction({ 
    route: '/',
    replace: false // Use router.push
  });

  return <div>Dashboard Screen</div>;
}
```

### Example 5: Route with Replace

```typescript
function LoginScreen() {
  // Navigate to home and replace current history entry
  useBackAction({ 
    route: '/',
    replace: true // Use router.replace
  });

  return <div>Login Screen</div>;
}
```

### Example 6: Dynamic Route Navigation

```typescript
function DynamicScreen() {
  const { goToRoute, goToHome } = useRouteBackActions();
  const [userRole, setUserRole] = useState('admin');

  // Set back action based on user role
  useBackAction({ 
    route: userRole === 'admin' ? '/admin' : '/dashboard'
  });

  return <div>Dynamic Screen</div>;
}
```

### Example 7: Screen with Custom Back Logic

```typescript
function ChequeCustomScreen() {
  const { goBack, goToStart } = useRouteBackActions();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Custom back action based on state
  useBackAction({ 
    actionType: hasUnsavedChanges ? 'cheque/showConfirmDialog' : 'cheque/previousScreen',
    payload: hasUnsavedChanges ? { message: 'Are you sure?' } : null
  });

  return <div>Custom Screen</div>;
}
```

## Best Practices

1. **Always use the hook**: Don't manually dispatch `setBackAction` in components
2. **Clear on unmount**: Let the hook handle clearing (default behavior)
3. **Use specific hooks**: Use `useChequeBackActions` for cheque-specific navigation
4. **Keep it simple**: Use the basic `useBackAction` for most cases
5. **Test back navigation**: Always test that back button works as expected

## Migration from Manual Dispatch

### Before (❌ Manual)
```typescript
function MyScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBackAction({
      actionType: 'cheque/previousScreen',
      payload: null
    }));

    return () => {
      dispatch(clearBackAction());
    };
  }, [dispatch]);

  return <div>My Screen</div>;
}
```

### After (✅ Hook)
```typescript
function MyScreen() {
  useBackAction({ 
    actionType: 'cheque/previousScreen',
    payload: null 
  });

  return <div>My Screen</div>;
}
```
