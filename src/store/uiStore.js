// UI store with Zustand
import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: false,
  modalOpen: false,
  notifications: [],

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  openModal: () => set({ modalOpen: true }),

  closeModal: () => set({ modalOpen: false }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
