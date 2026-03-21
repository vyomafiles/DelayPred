import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  error: null,

  initAuth: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      localStorage.setItem('authToken', session.access_token);
      set({ user: session.user, session, isAuthenticated: true, isInitialized: true });
    } else {
      set({ isInitialized: true });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        localStorage.setItem('authToken', session.access_token);
        set({ user: session.user, session, isAuthenticated: true });
      } else {
        localStorage.removeItem('authToken');
        set({ user: null, session: null, isAuthenticated: false });
      }
    });
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      localStorage.setItem('authToken', data.session.access_token);
      set({ user: data.user, session: data.session, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signup: async ({ name, email, password, location, transport }) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, location, transport },
        },
      });
      if (error) throw error;
      set({ user: data.user, session: data.session, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('authToken');
    set({ user: null, session: null, isAuthenticated: false, error: null });
  },

  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),
}));
