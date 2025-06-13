import { Link, Slot, usePathname } from 'expo-router';
import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileLayout() {
  const pathname = usePathname();

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1, flexDirection: 'row' }}>
        <ThemedView
          style={{
            paddingHorizontal: 8,
            paddingVertical: 8,
            alignItems: 'center',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <Link href="/profile">
            <IconSymbol
              size={28}
              name="profile.view"
              color={pathname === '/profile' ? 'purple' : 'black'}
            />
          </Link>

          <Link href="/profile/settings">
            <IconSymbol
              size={28}
              name="profile.settings"
              color={pathname === '/profile/settings' ? 'purple' : 'black'}
            />
          </Link>
        </ThemedView>

        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
