import { Appearance } from 'react-native';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: Appearance.getColorScheme() ?? 'light',

      toggleTheme: () =>
        set({ theme: get().theme === 'light' ? 'dark' : 'light' }),

      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'theme-store',
    },
  ),
);
