import { create } from 'zustand';

interface UserState {
  user: { email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  login: (email, password) => {
    const success = email === 'test@gmail.com' && password === '123456'; // mock
    if (success) {
      set({ user: { email } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));
