import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark"

interface ThemeState {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

export const useThemeStore = create(
    persist<ThemeState>(
        (set, get) => ({
            theme: "dark",
            setTheme: (theme) => {
                set({theme})
                document.documentElement.classList.toggle('dark', theme === 'dark');
            },
            toggleTheme: () => {
                const newTheme = get().theme === "light" ? "dark" : "light";
                get().setTheme(newTheme)
            }
        }), {
            name: "theme",
            onRehydrateStorage: (state) => () => {
                if (!state) return;

                if (!localStorage.getItem("theme")) {
                    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                    state.setTheme(prefersDark ? "dark" : "light")
                } else {
                    state.setTheme(state.theme)
                }
            }
        }
    )
)