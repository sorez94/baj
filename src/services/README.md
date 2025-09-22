# Bajet PWA - Services Architecture

## Overview
This directory contains the complete service layer for the Bajet PWA application, providing a robust foundation for API communication, error handling, and authentication management.

## Architecture

### Directory Structure
```
src/services/
├── api/                    # Core API infrastructure
│   ├── config.ts          # Axios configuration & interceptors
│   ├── errorHandler.ts    # Error handling utilities
│   └── baseService.ts     # Base service class
├── auth/                   # Authentication services
│   ├── tokenService.ts    # Token management
│   └── index.ts           # Auth exports
├── index.ts               # Main services exports
└── README.md              # This file
```

## Core Components

### 1. API Configuration (`api/config.ts`)
- **Environment-based configuration** for development, production, and test
- **Axios instance** with custom interceptors
- **Token injection** in request headers
- **Request timing** for performance monitoring
- **SSR compatibility** with proper client-side checks

### 2. Error Handling (`api/errorHandler.ts`)
- **Comprehensive error parsing** from Axios responses
- **Persian error messages** for user-friendly display
- **Error type detection** (auth, server, client, network)
- **Standardized error format** with timestamps and codes
- **Response validation** and data extraction

### 3. Base Service (`api/baseService.ts`)
- **Abstract base class** for all feature services
- **HTTP method wrappers** (GET, POST, PUT, PATCH, DELETE)
- **File upload/download** with progress tracking
- **Automatic error handling** and logging
- **Retry mechanism** for failed requests
- **Configurable timeouts** and headers

### 4. Token Management (`auth/tokenService.ts`)
- **Secure token storage** in localStorage
- **Token expiration** checking and management
- **Refresh token** support
- **SSR-safe** operations
- **Singleton pattern** for consistent access

## Usage Examples

### Creating a Feature Service
```typescript
import { BaseService, BaseServiceConfig } from '@/services/api/baseService';

const CONFIG: BaseServiceConfig = {
  basePath: '/api/feature',
  timeout: 10000,
};

export class FeatureService extends BaseService {
  constructor() {
    super(CONFIG);
  }

  async getData(id: string) {
    return this.get(`/${id}`);
  }

  async createData(data: any) {
    return this.post('', data);
  }
}
```

### Using Error Handling
```typescript
import { parseApiError, isAuthError } from '@/services';

try {
  const result = await service.getData();
  return result;
} catch (error) {
  if (isAuthError(error)) {
    // Handle authentication error
    redirectToLogin();
  } else {
    const apiError = parseApiError(error);
    showErrorMessage(apiError.message);
  }
}
```

### Token Management
```typescript
import { tokenService } from '@/services';

// Store tokens after login
tokenService.storeTokens({
  accessToken: 'jwt_token',
  refreshToken: 'refresh_token',
  expiresIn: 3600,
  userId: 'user_123'
});

// Check authentication status
if (tokenService.isAuthenticated()) {
  // User is logged in
}

// Clear tokens on logout
tokenService.clearTokens();
```

## Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# .env.production
NEXT_PUBLIC_API_URL=https://api.bajet.ir/api
```

### Service Configuration
```typescript
const SERVICE_CONFIG: BaseServiceConfig = {
  basePath: '/api/endpoint',
  timeout: 15000, // 15 seconds
};
```

## Error Handling Strategy

### 1. Automatic Error Handling
- **Request/Response interceptors** catch all errors
- **Automatic token clearing** on auth errors
- **Console logging** for debugging
- **User-friendly messages** in Persian

### 2. Error Types
- **Authentication Errors (401/403)**: Clear tokens, redirect to login
- **Server Errors (5xx)**: Retry mechanism, user notification
- **Client Errors (4xx)**: Validation feedback, user guidance
- **Network Errors**: Connection status, retry options

### 3. Retry Logic
- **Automatic retries** for server errors and timeouts
- **Exponential backoff** for retry delays
- **Configurable retry counts** per service
- **Smart retry decisions** based on error type

## Best Practices

### 1. Service Design
- **Extend BaseService** for all feature services
- **Use consistent naming** for API endpoints
- **Implement proper error handling** in overrides
- **Add service-specific validation** where needed

### 2. Error Handling
- **Always use try-catch** around service calls
- **Check error types** before handling
- **Provide user feedback** for all errors
- **Log errors** for debugging

### 3. Token Management
- **Use tokenService** for all token operations
- **Check expiration** before API calls
- **Handle refresh** automatically
- **Clear tokens** on logout/errors

### 4. Performance
- **Set appropriate timeouts** for different operations
- **Use progress tracking** for file uploads
- **Implement caching** where appropriate
- **Monitor request timing** for optimization

## Integration with Redux

### 1. Service Calls in Actions
```typescript
// In Redux thunk
export const fetchCheques = createAsyncThunk(
  'cheque/fetchCheques',
  async (filters: ChequeFilters) => {
    try {
      const response = await chequeService.getCheques(filters);
      return response;
    } catch (error) {
      throw error; // Let Redux handle the error
    }
  }
);
```

### 2. Error Handling in Reducers
```typescript
// In Redux slice
extraReducers: (builder) => {
  builder
    .addCase(fetchCheques.pending, (state) => {
      state.api.fetchCheques.isLoading = true;
      state.api.fetchCheques.error = null;
    })
    .addCase(fetchCheques.fulfilled, (state, action) => {
      state.api.fetchCheques.isLoading = false;
      state.cheques = action.payload.cheques;
    })
    .addCase(fetchCheques.rejected, (state, action) => {
      state.api.fetchCheques.isLoading = false;
      state.api.fetchCheques.error = action.error.message;
    });
},
```

## Testing

### 1. Service Testing
- **Mock axios** for unit tests
- **Test error scenarios** with different status codes
- **Verify retry logic** works correctly
- **Test token management** functions

### 2. Integration Testing
- **Test with real API** in development
- **Verify error handling** with actual responses
- **Test authentication flow** end-to-end
- **Validate file upload/download** functionality

## Security Considerations

### 1. Token Security
- **Secure storage** in localStorage (consider httpOnly cookies for production)
- **Automatic expiration** checking
- **Secure transmission** over HTTPS
- **Token rotation** support

### 2. API Security
- **CORS configuration** for cross-origin requests
- **Request validation** on both client and server
- **Rate limiting** support
- **Input sanitization** for all user data

## Future Enhancements

### 1. Planned Features
- **Request/Response caching** with Redis
- **Real-time updates** with WebSocket support
- **Offline support** with service worker
- **Advanced retry strategies** with circuit breaker

### 2. Monitoring
- **Performance metrics** collection
- **Error tracking** with Sentry integration
- **API usage analytics** and reporting
- **Health checks** for all services

---

*This service architecture provides a solid foundation for building scalable, maintainable, and user-friendly API integrations in the Bajet PWA application.* 