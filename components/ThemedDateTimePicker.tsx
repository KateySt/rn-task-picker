import React from 'react';
import { View, StyleSheet } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedDateTimePickerProps = {
  value: Date;
  mode?: 'date' | 'time' | 'datetime';
  display?: 'default' | 'spinner' | 'calendar' | 'clock';
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
};

export function ThemedDateTimePicker({
  value,
  mode = 'date',
  display = 'default',
  onChange,
}: ThemedDateTimePickerProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <DateTimePicker
        value={value}
        mode={mode}
        display={display}
        onChange={onChange}
        textColor={textColor}
        style={styles.picker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
  },
});
