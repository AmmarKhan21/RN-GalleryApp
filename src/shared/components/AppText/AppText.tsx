import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight } from '../../../theme';
import { AppTextVariant } from '../../../types';

interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  align = 'left',
  style,
  children,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        { color: color ?? styles[variant].color, textAlign: align },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: Colors.textPrimary,
  },
  hero: {
    fontSize: FontSize.hero,
    fontWeight: FontWeight.extraBold,
    color: Colors.textPrimary,
    letterSpacing: -1,
  },
  display: {
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  h2: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
  },
  h3: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
  },
  body: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    color: Colors.textPrimary,
    lineHeight: FontSize.base * 1.5,
  },
  bodySmall: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.5,
  },
  caption: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    color: Colors.textMuted,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default AppText;
