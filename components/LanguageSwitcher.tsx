import React, { useEffect, useState } from 'react';
import { Alert, I18nManager, StyleSheet } from 'react-native';
import I18n, { changeLanguage, strings } from '../locales/i18n';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const supportedLanguages = [
  { label: 'English', value: 'en' },
  { label: 'Italiano', value: 'it' },
];

export default function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = useState(
    I18n.language?.substring(0, 2) || 'en',
  );

  useEffect(() => {
    setSelectedLang(I18n.language?.substring(0, 2) || 'en');
  }, []);

  const handleChange = async (lang: string) => {
    if (lang === selectedLang) return;

    setSelectedLang(lang);
    await changeLanguage(lang);

    const isRTL = lang === 'ar' || lang === 'he';
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      Alert.alert(
        strings('languageChanged'),
        strings('restartAppToApplyChanges'),
        [{ text: strings('ok') }],
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>{strings('language')}</ThemedText>
      <Picker selectedValue={selectedLang} onValueChange={handleChange}>
        {supportedLanguages.map(({ label, value }) => (
          <Picker.Item key={`lang-${value}`} label={label} value={value} />
        ))}
      </Picker>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
