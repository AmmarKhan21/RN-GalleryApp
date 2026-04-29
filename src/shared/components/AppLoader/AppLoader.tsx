import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../../theme';
import AppText from '../AppText';

interface AppLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({
  message = 'Loading...',
  fullScreen = true,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size="large" color={Colors.primary} />
      {message ? (
        <AppText variant="bodySmall" style={styles.message}>
          {message}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  message: {
    marginTop: Spacing.sm,
  },
});

export default AppLoader;
