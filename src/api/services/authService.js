// Authentication service
import client from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const authService = {
  login: (email, password) =>
    client.post(API_ENDPOINTS.AUTH.LOGIN, { email, password }),

  signup: (userData) =>
    client.post(API_ENDPOINTS.AUTH.SIGNUP, userData),

  logout: () =>
    client.post(API_ENDPOINTS.AUTH.LOGOUT),

  forgotPassword: (email) =>
    client.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),

  resetPassword: (token, newPassword) =>
    client.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword }),
};
