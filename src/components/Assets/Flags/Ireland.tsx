import React from 'react';
import { SVGAssetProps } from './system/types';

const Ireland = (props: SVGAssetProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#irelandFlagClipPath1)">
      <g clipPath="url(#irelandFlagClipPath1)">
        <path
          fill="#169B62"
          d="M10 0H0v20h10V0Z"
        />
        <path
          fill="#fff"
          d="M20 0H10v20h10V0Z"
        />
        <path
          fill="#FF883E"
          d="M30 0H20v20h10V0Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="irelandFlagClipPath1">
        <rect
          width={30}
          height={20}
          fill="#fff"
          rx={1}
        />
      </clipPath>
      <clipPath id="irelandFlagClipPath2">
        <path
          fill="#fff"
          d="M0 0h30v20H0z"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Ireland;
