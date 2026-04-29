import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { IconProps } from './types';

const MailIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#9B9BBF',
  strokeWidth = 2,
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Rect
      x={2}
      y={4}
      width={20}
      height={16}
      rx={2}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 7L12 14 2 7"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MailIcon;
