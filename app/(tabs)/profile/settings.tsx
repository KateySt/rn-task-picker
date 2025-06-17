import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemedSwitch } from '@/components/ThemedSwitch';
import React from 'react';
import { useUserStore } from '@/store/useUserStore';

export default function ProfileSettings() {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useUserStore();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={
            user.avatarUri
              ? { uri: user.avatarUri }
              : require('@/assets/images/partial-react-logo.png')
          }
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile Settings</ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <ThemedText>Dark Mode</ThemedText>
        <ThemedSwitch value={theme === 'dark'} onValueChange={toggleTheme} />
      </ThemedView>
    </ParallaxScrollView>
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
    flexDirection: 'row',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
