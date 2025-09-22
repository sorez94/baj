// Auth feature specific utilities
import { AUTH_STORAGE_KEYS } from '../constants';

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_STORAGE_KEYS.AUTH_TOKEN);
  }
  return null;
}

export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEYS.AUTH_TOKEN, token);
  }
}

export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEYS.AUTH_TOKEN);
  }
}

export function getUserData(): any {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(AUTH_STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
}

export function setUserData(userData: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  }
}

export function removeUserData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER_DATA);
  }
}

export function clearAuthData(): void {
  removeAuthToken();
  removeUserData();
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
} 