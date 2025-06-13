import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useHabitStore } from '@/store/useHabitStore';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import NotificationForm from '@/components/NotificationForm';
import { accentColorDark, accentColorLight } from '@/constants/Colors';

export default function HomeScreen() {
  const addHabit = useHabitStore((state) => state.addHabit);
  const { sendNotification } = usePushNotifications();

  const handleSend = async ({
    title,
    body,
    startDate,
    endDate,
    isSingleDay,
  }: {
    title: string;
    body: string;
    startDate: Date;
    endDate?: Date;
    isSingleDay: boolean;
  }) => {
    const dateInfo = isSingleDay
      ? { date: startDate.toISOString() }
      : {
          start: startDate.toISOString(),
          end: endDate?.toISOString(),
        };

    addHabit({
      id: Date.now().toString(),
      title,
      body,
      startDate,
      endDate,
      isSingleDay,
    });

    await sendNotification({
      title,
      body,
      data: { type: 'event', ...dateInfo },
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: accentColorLight, dark: accentColorDark }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <NotificationForm onSend={handleSend} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
