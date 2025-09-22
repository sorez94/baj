// Token storage keys
const TOKEN_KEYS = {
  ACCESS_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_EXPIRY: 'token_expiry',
  USER_ID: 'user_id',
} as const;

// Token interface
export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userId: string;
}

// Token Service Class
export class TokenService {
  private static instance: TokenService;
  
  private constructor() {}
  
  // Singleton pattern
  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  // Store tokens
  public storeTokens(tokenData: TokenData): void {
    if (typeof window === 'undefined') return; // SSR check
    
    const { accessToken, refreshToken, expiresIn, userId } = tokenData;
    const expiryTime = Date.now() + expiresIn * 1000;
    
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString());
    localStorage.setItem(TOKEN_KEYS.USER_ID, userId);
  }

  // Get access token
  public getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  }

  // Get refresh token
  public getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  }

  // Get user ID
  public getUserId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEYS.USER_ID);
  }

  // Check if token is expired
  public isTokenExpired(): boolean {
    if (typeof window === 'undefined') return true;
    
    const expiryTime = localStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);
    if (!expiryTime) return true;
    
    return Date.now() > parseInt(expiryTime);
  }

  // Check if token will expire soon (within 5 minutes)
  public isTokenExpiringSoon(minutes: number = 5): boolean {
    if (typeof window === 'undefined') return true;
    
    const expiryTime = localStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);
    if (!expiryTime) return true;
    
    const timeUntilExpiry = parseInt(expiryTime) - Date.now();
    const minutesUntilExpiry = timeUntilExpiry / (1000 * 60);
    
    return minutesUntilExpiry <= minutes;
  }

  // Update access token
  public updateAccessToken(accessToken: string, expiresIn: number): void {
    if (typeof window === 'undefined') return;
    
    const expiryTime = Date.now() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString());
  }

  // Clear all tokens
  public clearTokens(): void {
    if (typeof window === 'undefined') return;
    
    Object.values(TOKEN_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return token !== null && !this.isTokenExpired();
  }

  // Get token info for debugging
  public getTokenInfo(): {
    hasAccessToken: boolean;
    hasRefreshToken: boolean;
    isExpired: boolean;
    expiresIn: number | null;
    userId: string | null;
  } {
    if (typeof window === 'undefined') {
      return {
        hasAccessToken: false,
        hasRefreshToken: false,
        isExpired: true,
        expiresIn: null,
        userId: null,
      };
    }
    
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const userId = this.getUserId();
    const expiryTime = localStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);
    
    let expiresIn: number | null = null;
    if (expiryTime) {
      expiresIn = Math.max(0, parseInt(expiryTime) - Date.now());
    }
    
    return {
      hasAccessToken: accessToken !== null,
      hasRefreshToken: refreshToken !== null,
      isExpired: this.isTokenExpired(),
      expiresIn,
      userId,
    };
  }
}

// Export singleton instance
export const tokenService = TokenService.getInstance(); 