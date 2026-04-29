import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from './types';

const EyeIcon: React.FC<IconProps> = ({
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
    <Path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={12}
      cy={12}
      r={3}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default EyeIcon;
