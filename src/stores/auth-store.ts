import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: Record<string, string | boolean> | null;
  setToken: (token: string | null) => void;
  setUser: (user: Record<string, string | boolean> | null) => void;
}

export const useAuthStore = create(
  devtools<AuthState>((set) => ({
    token: null,
    user: null,

    setToken: (token) => set({ token }),
    setUser: (user) => set((state) => ({
      user: user === null ? null : { ...state.user, ...user }
    })),
  }), {name: "AuthStore"})
);
