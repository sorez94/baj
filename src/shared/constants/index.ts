// General app configuration used across features
export const APP_CONFIG = {
  NAME: 'Bajet',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@bajet.ir',
  SUPPORT_PHONE: '021-12345678',
} as const;

// General app routes
export const APP_ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

// General validation rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  PHONE_LENGTH: 11,
  NATIONAL_ID_LENGTH: 10,
} as const;

// General error messages
export const GENERAL_ERROR_MESSAGES = {
  NETWORK_ERROR: 'خطا در ارتباط با سرور',
  UNAUTHORIZED: 'دسترسی غیرمجاز',
  FORBIDDEN: 'دسترسی ممنوع',
  NOT_FOUND: 'موردی یافت نشد',
  SERVER_ERROR: 'خطای سرور',
} as const; 