import {
  Alert,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Vibration,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import PagerView from 'react-native-pager-view';
import * as SMS from 'expo-sms';

const Separator = () => {
  return (
    <ThemedView style={Platform.OS === 'android' ? styles.separator : null} />
  );
};

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

const PATTERN_DESC =
  Platform.OS === 'android'
    ? 'wait 1s, vibrate 2s, wait 3s'
    : 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';

export default function ProfileScreen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  useEffect(() => {
    void loadContacts();
  });

  const sendSms = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(['+1234567890'], 'test sms.');
      Alert.alert('Result', result);
    } else {
      Alert.alert('Error', 'SMS cannot be sent');
    }
  };

  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText style={[styles.header, styles.paragraph]}>
          Vibration API
        </ThemedText>
        <ThemedView>
          <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
        </ThemedView>
        <Separator />
        {Platform.OS === 'android'
          ? [
              <ThemedView>
                <Button
                  title="Vibrate for 10 seconds"
                  onPress={() => Vibration.vibrate(10 * ONE_SECOND_IN_MS)}
                />
              </ThemedView>,
              <Separator />,
            ]
          : null}
        <ThemedText style={styles.paragraph}>
          Pattern: {PATTERN_DESC}
        </ThemedText>
        <Button
          title="Vibrate with pattern"
          onPress={() => Vibration.vibrate(PATTERN)}
        />
        <Separator />
        <Button
          title="Vibrate with pattern until cancelled"
          onPress={() => Vibration.vibrate(PATTERN, true)}
        />
        <Separator />
        <Button
          title="Stop vibration pattern"
          onPress={() => Vibration.cancel()}
          color="#FF0000"
        />
      </ThemedView>

      <Button title="SMS" onPress={sendSms} />

      <PagerView style={{ height: 300 }} initialPage={0}>
        <ThemedView style={styles.page} key="1">
          <ThemedText>First page</ThemedText>
          <ThemedText>Swipe ➡️</ThemedText>
        </ThemedView>
        <ThemedView style={styles.page} key="2">
          <ThemedText>Second page</ThemedText>
        </ThemedView>
        <ThemedView style={styles.page} key="3">
          <ThemedText>Third page</ThemedText>
        </ThemedView>
      </PagerView>

      {contacts?.length > 0 && (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id ?? Date.now().toString()}
          renderItem={({ item }) => (
            <ThemedView style={{ padding: 10 }}>
              <ThemedText>{item.name}</ThemedText>
              {item.phoneNumbers?.map((p, i) => (
                <ThemedText key={i}>{p.number}</ThemedText>
              ))}
            </ThemedView>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    textAlign: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
