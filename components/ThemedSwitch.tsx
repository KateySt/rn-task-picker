import { Switch, type SwitchProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedSwitchProps = SwitchProps & {
  lightThumbColor?: string;
  darkThumbColor?: string;
  lightTrackColorFalse?: string;
  darkTrackColorFalse?: string;
  lightTrackColorTrue?: string;
  darkTrackColorTrue?: string;
};

export function ThemedSwitch({
  lightThumbColor,
  darkThumbColor,
  lightTrackColorFalse,
  darkTrackColorFalse,
  lightTrackColorTrue,
  darkTrackColorTrue,
  ...rest
}: ThemedSwitchProps) {
  const themeThumbColor = useThemeColor(
    { light: lightThumbColor, dark: darkThumbColor },
    'tint',
  );

  const trackColorFalse = useThemeColor({}, 'switchTrackFalse');
  const trackColorTrue = useThemeColor({}, 'switchTrackTrue');

  return (
    <Switch
      thumbColor={themeThumbColor}
      trackColor={{
        false: trackColorFalse,
        true: trackColorTrue,
      }}
      {...rest}
    />
  );
}
