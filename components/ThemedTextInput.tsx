import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'defaultSemiBold' | 'title' | 'subtitle' | 'link';
};

const ThemedTextInput = ({
  style,
  lightColor,
  darkColor,
  type = 'default',
  value,
  onChangeText,
  ...rest
}: ThemedTextInputProps) => {
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text',
  );
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'background');

  const speakText = () => {
    if (value) {
      Speech.speak(value);
    }
  };

  return (
    <View style={[styles.wrapper, { borderColor, backgroundColor }]}>
      <TextInput
        style={[
          { color: textColor, flex: 1 },
          type === 'default' && styles.default,
          type === 'title' && styles.title,
          type === 'defaultSemiBold' && styles.defaultSemiBold,
          type === 'subtitle' && styles.subtitle,
          type === 'link' && styles.link,
          style,
        ]}
        placeholderTextColor={textColor + '99'}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      <TouchableOpacity onPress={speakText}>
        <Ionicons
          name="volume-high"
          size={22}
          color={textColor}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  default: { fontSize: 16, lineHeight: 24 },
  defaultSemiBold: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  title: { fontSize: 32, fontWeight: 'bold', lineHeight: 32 },
  subtitle: { fontSize: 20, fontWeight: 'bold' },
  link: { lineHeight: 30, fontSize: 16, color: '#0a7ea4' },
});
