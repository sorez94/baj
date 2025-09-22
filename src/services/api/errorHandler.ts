import { AxiosError } from 'axios';

// Standard error response structure
export interface ApiErrorResponse {
  message: string;
  axiosMessage?: string;
  status?: number;
  code?: string;
  response?: any; // full server response data body
  originalError?: any; // original error object for debugging 
  timestamp?: string;
  url?: string;
  method?: string;
  retryable?: boolean;
  error_details?: any;
} 

// Comprehensive error extraction utility for use with rejectWithValue
export const extractErrorInfo = (error: any, context?: { url?: string; method?: string }): ApiErrorResponse => {
  const errorInfo: ApiErrorResponse = {
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
    ...context,
  };

  // Handle Axios errors
  if (error instanceof AxiosError) {
    errorInfo.message = error.response?.data?.error_message || 
                       error.response?.data?.errorMessage ||
                       error.response?.data?.actionMessage ||
                       error.response?.data?.message
    errorInfo.axiosMessage = error.message
    errorInfo.status = error.response?.status;
    errorInfo.code = error.response?.data?.error_code || 
                     error.response?.data?.code || 
                     error.response?.data?.errorCode || 
                     error.code;
    errorInfo.retryable = error.response?.data?.retryable || false;
    errorInfo.error_details = error.response?.data?.error_details || null;
    errorInfo.response = error.response?.data;
    errorInfo.url = error.config?.url;
    errorInfo.method = error.config?.method?.toUpperCase();
  }
  // Handle generic errors
  else if (error instanceof Error) {
    errorInfo.message = error.message;
    errorInfo.code = (error as any).code;
    errorInfo.originalError = error;
  }
  // Handle plain objects or unknown types
  else if (typeof error === 'object' && error !== null) {
    errorInfo.message = error.response?.data?.error_message || 
                       error.response?.data?.errorMessage ||
                       error.response?.data?.actionMessage ||
                       error.response?.data?.message
    errorInfo.axiosMessage = error.message
      errorInfo.status = error.response?.status;
      errorInfo.code = error.response?.data?.error_code || 
      error.response?.data?.code || 
      error.response?.data?.errorCode || 
      error.code;
      errorInfo.retryable = error.response?.data?.retryable || false;
      errorInfo.error_details = error.response?.data?.error_details || null;
      errorInfo.response = error.response?.data;
      errorInfo.url = error.config?.url;
      errorInfo.method = error.config?.method?.toUpperCase();
  }
  // Handle string errors
  else if (typeof error === 'string') {
    errorInfo.message = error;
    errorInfo.originalError = error;
  }

  // Ensure we have a meaningful message
  if (!errorInfo.message || errorInfo.message === 'An unexpected error occurred') {
    if (errorInfo.status) {
      errorInfo.message = `درخواست با وضعیت ${errorInfo.status} انجام نشد`;
    } else if (errorInfo.code) {
      errorInfo.message = `درخواست با کد ${errorInfo.code} انجام نشد`;
    }
  }

  return errorInfo;
};

// Legacy functions (keeping for backward compatibility)
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// HTTP status messages
export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

// Network error messages
export const NETWORK_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed',
  TIMEOUT_ERROR: 'Request timed out',
  CANCELLED_ERROR: 'Request was cancelled',
  UNKNOWN_ERROR: 'An unknown error occurred',
};

// Parse API error from Axios error
export const parseApiError = (error: any): ApiError => {
  if (error?.response?.data) {
    const { message, code, status, details } = error.response.data;
    return {
      message: message || HTTP_STATUS_MESSAGES[error.response.status] || 'Request failed',
      status: status || error.response.status,
      code: code || error.code,
      details: details || error.response.data,
    };
  }

  if (error?.code === 'ECONNABORTED') {
    return {
      message: NETWORK_ERROR_MESSAGES.TIMEOUT_ERROR,
      code: error.code,
    };
  }

  if (error?.code === 'ERR_NETWORK') {
    return {
      message: NETWORK_ERROR_MESSAGES.NETWORK_ERROR,
      code: error.code,
    };
  }

  return {
    message: error?.message || NETWORK_ERROR_MESSAGES.UNKNOWN_ERROR,
    code: error?.code,
  };
};

// Check if error is authentication related
export const isAuthError = (error: any): boolean => {
  const status = error?.response?.status || error?.status;
  return status === 401 || status === 403;
};

// Get user-friendly error message
export const getUserFriendlyMessage = (error: any): string => {
  const parsedError = parseApiError(error);
  
  // Custom business logic error messages
  if (parsedError.code) {
    switch (parsedError.code) {
      case 'INVALID_PHONE_NUMBER':
        return 'شماره تلفن وارد شده صحیح نیست';
      case 'INVALID_OTP':
        return 'کد تایید وارد شده صحیح نیست';
      case 'OTP_EXPIRED':
        return 'کد تایید منقضی شده است';
      case 'INSUFFICIENT_BALANCE':
        return 'موجودی کافی نیست';
      case 'ACCOUNT_LOCKED':
        return 'حساب کاربری قفل شده است';
      default:
        break;
    }
  }

  // HTTP status based messages
  if (parsedError.status) {
    switch (parsedError.status) {
      case 400:
        return 'درخواست نامعتبر است';
      case 401:
        return 'لطفاً مجدداً وارد شوید';
      case 403:
        return 'شما مجوز انجام این عملیات را ندارید';
      case 404:
        return 'منبع مورد نظر یافت نشد';
      case 409:
        return 'درخواست با اطلاعات موجود در تضاد است';
      case 422:
        return 'اطلاعات وارد شده صحیح نیست';
      case 429:
        return 'تعداد درخواست‌ها بیش از حد مجاز است';
      case 500:
        return 'خطای داخلی سرور';
      case 502:
      case 503:
      case 504:
        return 'سرویس موقتاً در دسترس نیست';
      default:
        break;
    }
  }

  return parsedError.message;
}; 