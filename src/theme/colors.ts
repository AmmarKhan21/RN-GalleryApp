export const Colors = {
  primary: '#00C896',
  primaryDark: '#009970',
  primaryLight: '#5CDDB8',
  accent: '#FF6584',
  accentDark: '#CC4F69',

  background: '#080D0C',
  surface: '#0F1614',
  surfaceElevated: '#162019',
  surfaceBorder: '#1F2E28',

  textPrimary: '#E8F5F0',
  textSecondary: '#7A9990',
  textMuted: '#3D5C54',
  textInverse: '#080D0C',

  success: '#4CAF7D',
  warning: '#FFB547',
  error: '#FF5370',
  errorLight: '#FF537020',
  info: '#29B6F6',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  likeActive: '#FF6584',
  likeInactive: '#3D5C54',

  cardBackground: '#162019',
  cardBorder: '#1F2E28',
  cardShadow: '#00000080',

  overlayDark: 'rgba(8,13,12,0.88)',
  overlayMedium: 'rgba(8,13,12,0.52)',
} as const;

export type ColorsType = typeof Colors;
