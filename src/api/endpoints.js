// API endpoint definitions
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Predictions
  PREDICTIONS: {
    CREATE: '/predictions',
    GET: '/predictions/:id',
    LIST: '/predictions',
    DELETE: '/predictions/:id',
  },

  // Routes
  ROUTES: {
    SEARCH: '/routes/search',
    GET_DETAILS: '/routes/:id',
    LIST_POPULAR: '/routes/popular',
  },

  // User
  USER: {
    GET_PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    GET_HISTORY: '/user/history',
  },
};
