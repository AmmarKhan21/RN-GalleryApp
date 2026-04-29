import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';
import { AppButtonVariant } from '../../../types';
import AppText from '../AppText';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.white : Colors.primary}
        />
      ) : (
        <View style={styles.row}>
          <AppText
            style={[
              styles.text,
              styles[`${variant}Text` as keyof typeof styles],
              textStyle,
            ]}
          >
            {title}
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: moderateScale(52),
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.surfaceBorder,
  },
  danger: {
    backgroundColor: Colors.error,
  },
  disabled: {
    opacity: 0.45,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  text: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.primary,
  },
  ghostText: {
    color: Colors.textSecondary,
  },
  dangerText: {
    color: Colors.white,
  },
});

export default AppButton;
