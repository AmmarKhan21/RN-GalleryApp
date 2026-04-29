import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { IconProps } from './types';

const GalleryIcon: React.FC<IconProps> = ({
  size = 36,
  color = '#6C63FF',
  strokeWidth = 1.8,
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Rect
      x={3}
      y={3}
      width={18}
      height={18}
      rx={2}
      ry={2}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={8.5}
      cy={8.5}
      r={1.5}
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M21 15l-5-5L5 21"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default GalleryIcon;
