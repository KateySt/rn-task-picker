import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Habit = {
  id: string;
  title: string;
  body: string;
  startDate: Date;
  endDate?: Date;
  isSingleDay: boolean;
};

type HabitStore = {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  removeHabit: (id: string) => void;
  getActiveEventsForDay: (date: Date) => Habit[];
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],

      addHabit: (habit) =>
        set((state) => ({
          habits: [...state.habits, habit],
        })),

      removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
        })),

      getActiveEventsForDay: (date: Date) => {
        const selectedDate = date.setHours(0, 0, 0, 0);
        return get().habits.filter((habit) => {
          const start = new Date(habit.startDate).setHours(0, 0, 0, 0);
          const end = habit.isSingleDay
            ? start
            : new Date(habit.endDate ?? habit.startDate).setHours(0, 0, 0, 0);
          return selectedDate >= start && selectedDate <= end;
        });
      },
    }),
    {
      name: 'habit-storage',
    },
  ),
);
