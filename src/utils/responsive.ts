import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base design width is 375px (iPhone 14)
const BASE_WIDTH = 375;

export const wp = (percent: number): number =>
  (SCREEN_WIDTH * percent) / 100;

export const hp = (percent: number): number =>
  (SCREEN_HEIGHT * percent) / 100;

export const scale = (size: number): number =>
  (SCREEN_WIDTH / BASE_WIDTH) * size;

/** Less aggressive than linear scale — recommended for font sizes and padding. */
export const moderateScale = (size: number, factor = 0.45): number =>
  size + (scale(size) - size) * factor;

export const isTablet = (): boolean => SCREEN_WIDTH >= 768;

export const isIpad = (): boolean =>
  Platform.OS === 'ios' && SCREEN_WIDTH >= 768;

export const getNumColumns = (): number => (isTablet() ? 3 : 2);

export const normalize = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel(size));

export { SCREEN_WIDTH, SCREEN_HEIGHT };
