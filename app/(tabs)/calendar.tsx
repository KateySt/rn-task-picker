import React, { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useHabitStore } from '@/store/useHabitStore';
import { accentColorDark } from '@/constants/Colors';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
  const [markedDates, setMarkedDates] = useState({});
  const getActiveEventsForDay = useHabitStore(
    (state) => state.getActiveEventsForDay,
  );

  function dateToString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getTodayString() {
    return dateToString(new Date());
  }

  useEffect(() => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);

    const daysWithTasks: Record<string, any> = {};

    for (
      let day = new Date(startOfMonth);
      day <= endOfMonth;
      day.setDate(day.getDate() + 1)
    ) {
      const habits = getActiveEventsForDay(new Date(day));
      if (habits.length > 0) {
        const dayStr = dateToString(new Date(day));
        daysWithTasks[dayStr] = {
          marked: true,
          dotColor: 'blue',
        };
      }
    }
    daysWithTasks[selectedDate] = {
      ...(daysWithTasks[selectedDate] || {}),
      selected: true,
      selectedColor: 'blue',
    };
    setMarkedDates(daysWithTasks);
  }, [selectedDate, getActiveEventsForDay]);

  const habitsForSelectedDay = getActiveEventsForDay(new Date(selectedDate));

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1, padding: 16 }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Calendar</ThemedText>
        </ThemedView>

        <RNCalendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: accentColorDark,
            todayTextColor: 'red',
          }}
        />

        <View style={{ marginTop: 16, flex: 1 }}>
          <ThemedText type="defaultSemiBold">
            Tasks for {selectedDate}:
          </ThemedText>
          {habitsForSelectedDay.length === 0 && (
            <ThemedText>No tasks for this day</ThemedText>
          )}

          <FlatList
            data={habitsForSelectedDay}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ThemedView style={styles.taskItem}>
                <ThemedText>{item.title}</ThemedText>
                <ThemedText>{item.body}</ThemedText>
              </ThemedView>
            )}
          />
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  taskItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default Calendar;
