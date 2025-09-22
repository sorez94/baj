// Auth feature specific custom hook
import { useAppDispatch, useAppSelector } from '@/store';
import { loginUser, logoutUser, fetchUserProfile, clearError } from '../store/authSlice';
import { LoginCredentials } from '../types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const login = async (credentials: LoginCredentials) => {
    return dispatch(loginUser(credentials));
  };

  const logout = async () => {
    return dispatch(logoutUser());
  };

  const getProfile = async () => {
    return dispatch(fetchUserProfile());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login,
    logout,
    getProfile,
    clearAuthError,
  };
}; 