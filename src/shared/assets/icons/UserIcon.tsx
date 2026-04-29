import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from './types';

const UserIcon: React.FC<IconProps> = ({
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
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={12}
      cy={7}
      r={4}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UserIcon;
