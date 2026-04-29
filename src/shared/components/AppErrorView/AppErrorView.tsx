import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../../theme';
import AppText from '../AppText';
import AppButton from '../AppButton';

interface AppErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

const AppErrorView: React.FC<AppErrorViewProps> = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppText style={styles.icon}>⚠️</AppText>
      </View>
      <AppText variant="h3" align="center" style={styles.title}>
        Oops!
      </AppText>
      <AppText variant="bodySmall" align="center" style={styles.message}>
        {message}
      </AppText>
      {onRetry && (
        <AppButton
          title="Try Again"
          onPress={onRetry}
          variant="primary"
          fullWidth={false}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    backgroundColor: Colors.background,
    gap: Spacing.md,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    color: Colors.textPrimary,
  },
  message: {
    maxWidth: 260,
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing.base,
    paddingHorizontal: Spacing.xxl,
  },
});

export default AppErrorView;
