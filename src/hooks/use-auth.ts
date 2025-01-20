import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type UserType = "student" | "faculty";

interface User {
  username: string;
  userType: UserType;
}

interface AuthState {
  user: User | null;
  error: string | null;
  login: (username: string, password: string, userType: UserType) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      error: null,

      login: (username: string, password: string, userType: UserType) => {
        try {
          set({ user: { username, userType }, error: null });
        } catch (error) {
          set({ user: null, error: "Failed to login, message: " + error });
        }
      },

      logout: () => {
        set({ user: null, error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
