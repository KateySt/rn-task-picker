import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import {
  PushMessage,
  registerForPushNotificationsAsync,
  sendPushNotification,
} from '@/utils/notificationUtils';

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? null))
      .catch((err) => console.error('Push token error:', err));

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification clicked:', response);
      });

    return () => {
      responseListener.remove();
    };
  }, []);

  const sendNotification = async ({
    title,
    body,
    data = {},
    sound = 'default',
  }: PushMessage) => {
    if (!expoPushToken) return;

    const message = {
      to: expoPushToken,
      sound,
      title,
      body,
      data,
    };

    await sendPushNotification(expoPushToken, message);
  };

  return { sendNotification };
}
