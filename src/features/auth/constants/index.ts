// Auth feature specific constants
export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const;

export const AUTH_STORAGE_KEYS = {
  AUTH_TOKEN: 'bajet_auth_token',
  USER_DATA: 'bajet_user_data',
  REFRESH_TOKEN: 'bajet_refresh_token',
} as const;

export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'ایمیل یا رمز عبور اشتباه است',
  ACCOUNT_LOCKED: 'حساب کاربری شما قفل شده است',
  EMAIL_NOT_VERIFIED: 'ایمیل شما تایید نشده است',
  TOO_MANY_ATTEMPTS: 'تعداد تلاش‌های شما بیش از حد مجاز است',
} as const;

export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'ورود موفقیت‌آمیز بود',
  LOGOUT_SUCCESS: 'خروج موفقیت‌آمیز بود',
  PASSWORD_CHANGED: 'رمز عبور با موفقیت تغییر یافت',
} as const; 