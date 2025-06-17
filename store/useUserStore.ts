import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  name: string;
  email: string;
  avatarUri: string | null;
};

type UserStore = {
  user: User;
  setUser: (user: Partial<User>) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        name: '',
        email: '',
        avatarUri: null,
      },
      setUser: (data) =>
        set((state) => ({
          user: { ...state.user, ...data },
        })),
      resetUser: () =>
        set({
          user: {
            name: '',
            email: '',
            avatarUri: null,
          },
        }),
    }),
    {
      name: 'user-store',
    },
  ),
);
