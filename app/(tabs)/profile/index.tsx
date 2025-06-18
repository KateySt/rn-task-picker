import { FlatList, Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function ProfileScreen() {
  const { user } = useUserStore();
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

  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
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
});
