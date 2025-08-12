import { apiClient } from './api';

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('access_token');
};

export const logout = (): void => {
  apiClient.logout();
  window.location.href = '/';
};