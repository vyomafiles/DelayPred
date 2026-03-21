// useAuth hook
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, isAuthenticated, login, logout, signup } = useAuthStore();

  return {
    user,
    isAuthenticated,
    login,
    logout,
    signup,
  };
}
