import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';
import { EyeIcon, EyeOffIcon } from '../../assets/icons';
import AppText from '../AppText';

interface AppInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
  /** SVG or any node rendered on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Custom right-side element. When secureTextEntry=true and this is omitted, the eye toggle renders automatically. */
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

const ICON_SIZE = moderateScale(18);
const ICON_AREA_WIDTH = ICON_SIZE + Spacing.sm;

const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  touched,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  value,
  onFocus,
  onBlur,
  secureTextEntry,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // password field: visibility is internal — eye toggle auto-renders when secureTextEntry=true
  const isPasswordField = secureTextEntry === true;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  const eyeScaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
    setIsFocused(true);
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(labelAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }
    onBlur?.(e);
  };

  const handleEyeToggle = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
    Animated.sequence([
      Animated.timing(eyeScaleAnim, {
        toValue: 0.65,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(eyeScaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [eyeScaleAnim]);

  const iconColor = isFocused
    ? Colors.primary
    : touched && !!error
    ? Colors.error
    : Colors.textMuted;

  const borderColor =
    touched && !!error
      ? Colors.error
      : isFocused
      ? Colors.primary
      : Colors.surfaceBorder;

  const labelTop = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [moderateScale(16), moderateScale(6)],
  });
  const labelFontSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [FontSize.base, FontSize.xs],
  });
  const labelColor = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      Colors.textMuted,
      isFocused ? Colors.primary : Colors.textSecondary,
    ],
  });

  const resolvedSecureTextEntry = isPasswordField ? !isPasswordVisible : false;

  const renderRightContent = () => {
    if (isPasswordField && !rightIcon) {
      return (
        <Animated.View style={{ transform: [{ scale: eyeScaleAnim }] }}>
          <TouchableOpacity
            onPress={handleEyeToggle}
            style={styles.iconButton}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {isPasswordVisible ? (
              <EyeOffIcon size={ICON_SIZE} color={iconColor} />
            ) : (
              <EyeIcon size={ICON_SIZE} color={iconColor} />
            )}
          </TouchableOpacity>
        </Animated.View>
      );
    }
    if (rightIcon) {
      return (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={styles.iconButton}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {rightIcon}
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={[styles.container, { borderColor }]}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}

        <View style={styles.inputArea}>
          <Animated.Text
            style={[
              styles.label,
              { top: labelTop, fontSize: labelFontSize, color: labelColor },
            ]}
          >
            {label}
          </Animated.Text>
          <TextInput
            style={styles.input}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={Colors.textMuted}
            selectionColor={Colors.primary}
            secureTextEntry={resolvedSecureTextEntry}
            {...rest}
          />
        </View>

        {renderRightContent()}
      </View>

      {touched && !!error && (
        <AppText variant="caption" color={Colors.error} style={styles.errorText}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.base,
  },
  container: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: moderateScale(62),
  },
  leftIconContainer: {
    width: ICON_AREA_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.xs,
  },
  inputArea: {
    flex: 1,
    paddingTop: moderateScale(22),
    paddingBottom: moderateScale(8),
    justifyContent: 'flex-end',
  },
  label: {
    position: 'absolute',
    left: 0,
    fontWeight: FontWeight.medium,
  },
  input: {
    color: Colors.textPrimary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    padding: 0,
    margin: 0,
  },
  iconButton: {
    paddingLeft: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
});

export default AppInput;
