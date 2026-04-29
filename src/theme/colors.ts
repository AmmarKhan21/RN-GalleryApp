export const Colors = {
  primary: '#6C63FF',
  primaryDark: '#4B44CC',
  primaryLight: '#9B95FF',
  accent: '#FF6584',
  accentDark: '#CC4F69',

  background: '#0D0D1A',
  surface: '#161627',
  surfaceElevated: '#1E1E35',
  surfaceBorder: '#2A2A48',

  textPrimary: '#F0F0FF',
  textSecondary: '#9B9BBF',
  textMuted: '#5A5A80',
  textInverse: '#0D0D1A',

  success: '#4CAF7D',
  warning: '#FFB547',
  error: '#FF5370',
  errorLight: '#FF537020',
  info: '#29B6F6',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  likeActive: '#FF6584',
  likeInactive: '#5A5A80',

  cardBackground: '#1E1E35',
  cardBorder: '#2A2A48',
  cardShadow: '#00000080',

  overlayDark: 'rgba(13,13,26,0.85)',
  overlayMedium: 'rgba(13,13,26,0.5)',
} as const;

export type ColorsType = typeof Colors;
