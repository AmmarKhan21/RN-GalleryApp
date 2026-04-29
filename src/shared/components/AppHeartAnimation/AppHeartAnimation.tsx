import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { HeartFilledIcon } from '../../assets/icons';
import { Colors } from '../../../theme';

interface AppHeartAnimationProps {
  // increment this value to trigger a new burst; 0 = idle
  animationKey: number;
  size?: number;
}

const AppHeartAnimation: React.FC<AppHeartAnimationProps> = ({
  animationKey,
  size = 80,
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (animationKey === 0) {
      return;
    }

    scale.value = 0;
    opacity.value = 0;

    scale.value = withSequence(
      withSpring(1.35, { damping: 6, stiffness: 300 }),
      withSpring(1.1, { damping: 12, stiffness: 200 }),
      withTiming(1.1, { duration: 380 }),
      withTiming(0, { duration: 220 }),
    );

    opacity.value = withSequence(
      withTiming(1, { duration: 60 }),
      withTiming(1, { duration: 620 }),
      withTiming(0, { duration: 220 }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationKey]);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, { pointerEvents: 'none' } as object]}>
      <Animated.View style={heartStyle}>
        <HeartFilledIcon size={size} color={Colors.likeActive} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
});

export default AppHeartAnimation;
