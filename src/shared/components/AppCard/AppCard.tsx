import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadow } from '../../../theme';

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

const AppCard: React.FC<AppCardProps> = ({
  children,
  style,
  elevated = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    ...Shadow.sm,
  },
  elevated: {
    backgroundColor: Colors.surfaceElevated,
    ...Shadow.md,
  },
});

export default AppCard;
