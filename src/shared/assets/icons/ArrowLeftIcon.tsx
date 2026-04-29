import React from 'react';
import Svg, { Path, Line } from 'react-native-svg';
import { IconProps } from './types';

const ArrowLeftIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#F0F0FF',
  strokeWidth = 2,
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Line
      x1={19}
      y1={12}
      x2={5}
      y2={12}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M12 19l-7-7 7-7"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowLeftIcon;
