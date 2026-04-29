import { moderateScale } from '../utils/responsive';

export const FontFamily = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
} as const;

export const FontSize = {
  xs: moderateScale(10),
  sm: moderateScale(12),
  base: moderateScale(14),
  md: moderateScale(16),
  lg: moderateScale(18),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  xxxl: moderateScale(28),
  display: moderateScale(32),
  hero: moderateScale(40),
} as const;

export const LineHeight = {
  tight: 1.2,
  base: 1.5,
  relaxed: 1.75,
} as const;
