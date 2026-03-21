import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/** Redirects to /sign-in if not authenticated */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitialized } = useAuthStore();
  if (!isInitialized) return null;
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  return children;
}

/** Redirects to /dashboard if already authenticated */
export function GuestRoute({ children }) {
  const { isAuthenticated, isInitialized } = useAuthStore();
  if (!isInitialized) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}
