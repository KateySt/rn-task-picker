import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Colors } from '@/constants/Colors';
import { useThemeStore } from '@/store/useThemeStore';
import ProfileScreen from '@/app/(tabs)/profile/index';
import ProfileSettings from '@/app/(tabs)/profile/settings';
import CameraScreen from '@/app/(tabs)/profile/camera';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: Colors[theme].tint,
        drawerStyle: {
          backgroundColor: Colors[theme].background,
        },
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <IconSymbol name="profile.view" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile settings"
        component={ProfileSettings}
        options={{
          drawerIcon: ({ color }) => (
            <IconSymbol name="profile.settings" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          drawerIcon: ({ color }) => (
            <IconSymbol
              name="chevron.left.forwardslash.chevron.right"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
