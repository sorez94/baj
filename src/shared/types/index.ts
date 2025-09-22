// General types used across multiple features
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Common form types
export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

export interface FormState {
  [key: string]: FormField;
} 