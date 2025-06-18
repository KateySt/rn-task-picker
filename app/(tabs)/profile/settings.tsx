import { Image, Platform, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemedSwitch } from '@/components/ThemedSwitch';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useBatteryLevel } from 'expo-battery';
import * as Device from 'expo-device';
import * as Network from 'expo-network';
import { ThemedButton } from '@/components/ThemedButton';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

export default function ProfileSettings() {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useUserStore();
  const batteryLevel = useBatteryLevel();
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [selectedPrinter, setSelectedPrinter] = useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  useEffect(() => {
    const fetchIp = async () => {
      const ip = await Network.getIpAddressAsync();
      setIpAddress(ip);
    };
    void fetchIp();
  }, []);

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

      <ThemedView style={styles.titleContainer}>
        <ThemedText>IP Address: {ipAddress ?? 'Loading...'}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText>Current Battery Level: {batteryLevel}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText>
          {Device.manufacturer}: {Device.modelName}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <ThemedText>Dark Mode</ThemedText>
        <ThemedSwitch value={theme === 'dark'} onValueChange={toggleTheme} />
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedButton title="Print" onPress={print} />
        <ThemedView style={styles.spacer} />
        <ThemedButton title="Print to PDF file" onPress={printToFile} />
        {Platform.OS === 'ios' && (
          <>
            <ThemedView style={styles.spacer} />
            <ThemedButton title="Select printer" onPress={selectPrinter} />
            <ThemedView style={styles.spacer} />
            {selectedPrinter ? (
              <ThemedText
                style={styles.printer}
              >{`Selected printer: ${selectedPrinter.name}`}</ThemedText>
            ) : undefined}
          </>
        )}
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
    flexDirection: 'column',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },
});
