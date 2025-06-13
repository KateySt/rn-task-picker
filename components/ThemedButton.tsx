import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
};

export function ThemedButton({
  title,
  textStyle,
  buttonStyle,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({}, 'tint');

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, buttonStyle]}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={[styles.text, { color: '#ECEDEE' }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
