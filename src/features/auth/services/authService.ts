// Auth feature specific API service
import { LoginCredentials, LoginResponse, User } from '../types';

const API_BASE_URL = '/api/auth';

export class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  }

  async getProfile(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/profile`);

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  }

  async refreshToken(): Promise<{ token: string }> {
    const response = await fetch(`${API_BASE_URL}/refresh`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  }
}

export const authService = new AuthService();
export default authService; 