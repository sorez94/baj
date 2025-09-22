import { apiClient } from '@/services';

export interface RegisterByPhonePayload {
  phoneNumber: string;
}

export interface RegisterByPhoneResponse {
  // backend specific fields; keep generic
  [key: string]: any;
}

export interface TokenOperationResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  user_id?: string | number;
  [key: string]: any;
}

export const registerByPhoneNumber = async (payload: RegisterByPhonePayload) => {
  const res = await apiClient.post<RegisterByPhoneResponse>('/i/a/u/1_rbp', payload);
  return res.data;
};

export const tokenOperationWithOtp = async (username: string, otp: string, extra?: Record<string, string>) => {
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', otp);
  // Add common oauth-ish fields if backend requires
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => body.append(k, v));
  }
  const res = await apiClient.post<TokenOperationResponse>('/2_t', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return res.data;
}; 