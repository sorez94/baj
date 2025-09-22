import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { tokenService } from '@/services/auth';
import { extractErrorInfo } from '@/services/api/errorHandler';


// Extend InternalAxiosRequestConfig to include metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: Date;
  };
}

// Environment-based configuration
const API_CONFIG = {
  development: {
    baseURL: process.env.NEXT_PUBLIC_DEV_API_URL || 'http://192.168.165.35:3000',
    timeout: 12000000,
  },
  production: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.bajet.ir',
    timeout: 12000000,
  },
  test: {
    baseURL: process.env.NEXT_PUBLIC_TEST_API_URL || 'http://localhost:3001',
    timeout: 12000000,
  },
};

const getCurrentEnv = (): keyof typeof API_CONFIG => {
  if (typeof window === 'undefined') return 'development';
  if (process.env.NODE_ENV === 'production') return 'production';
  if (process.env.NODE_ENV === 'test') return 'test';
  return 'development';
};

const config = API_CONFIG[getCurrentEnv()];

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Set default TraceNumber like iOS
try {
  const defaultTrace = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now());
  (apiClient.defaults.headers.common as any)['TraceNumber'] = defaultTrace;
} catch {}

const getDeviceId = (): string => {
  if (typeof window === 'undefined') return 'web-ssr';
  const key = 'device_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = (typeof crypto !== 'undefined' && 'randomUUID' in crypto) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    localStorage.setItem(key, id);
  }
  return id;
};

const getTraceNumber = (): string => Date.now().toString().slice(-10);
const getClientVersion = (): string => 'pwa';
const getClientType = (): string => 'BROWSER';
const getAppVersion = (): string => process.env.NEXT_PUBLIC_APP_VERSION || '2.1.0';
const getGatewayType = (): string => 'BAJET';
const getChannel = (): string => 'IOS';

// Request interceptor: mirror iOS headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    // Authorization
    const token = tokenService.getAccessToken();
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }


    if(process.env.NODE_ENV === 'development') {
      config.headers.Authorization = process.env.NEXT_PUBLIC_API_TOKEN;
    }

    // iOS-equivalent headers
    (config.headers as any)['deviceId'] = getDeviceId();
    (config.headers as any)['traceNumber'] = getTraceNumber();
    (config.headers as any)['client-version'] = getClientVersion();
    (config.headers as any)['client-type'] = getClientType();
    (config.headers as any)['app-version'] = getAppVersion();
    (config.headers as any)['gateway-type'] = getGatewayType();
    (config.headers as any)['Channel'] = getChannel();

    // Timing metadata
    (config as ExtendedAxiosRequestConfig).metadata = { startTime: new Date() };

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Log the full error for debugging

    if (process.env.NODE_ENV === 'development') {
      console.log(error);
      console.error('Axios Error Details:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: error.config,
        isAxiosError: error.isAxiosError
      });
    }
    
    // Return the error with enhanced information

    const theFinalerror : any = {
      ...error,
      // Ensure we preserve the response data

      responseData: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText
    }
    return Promise.reject(extractErrorInfo(theFinalerror));
  }
);

export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, ExtendedAxiosRequestConfig };
export { config as apiConfig };