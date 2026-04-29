import React, { useRef, useCallback } from 'react';
import {
  Animated,
  Image,
  ImageStyle,
  View,
  StyleSheet,
  StyleProp,
} from 'react-native';
import { Colors } from '../../../theme';

interface AppImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

const AppImage: React.FC<AppImageProps> = ({
  uri,
  style,
  resizeMode = 'cover',
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const handleLoad = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <View style={[styles.container, style as object]}>
      <Animated.Image
        source={{ uri }}
        style={[StyleSheet.absoluteFill, styles.image, { opacity }]}
        resizeMode={resizeMode}
        onLoad={handleLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default AppImage;
