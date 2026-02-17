import React from 'react';
import { SVGAssetProps } from './system/types';
const UnitedKingdom = (props: SVGAssetProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#ukFlagClipPath1)">
      <g clipPath="url(#ukFlagClipPath2)">
        <path
          fill="#00247D"
          d="M30 0H0v20h30V0Z"
        />
        <path
          stroke="#fff"
          strokeWidth={3.466}
          d="m0 0 30 20m0-20L0 20"
        />
        <path
          stroke="#CF142B"
          strokeWidth={2.309}
          d="m0 0 30 20m0-20L0 20"
        />
        <path
          stroke="#fff"
          strokeWidth={5.777}
          d="M15 0v20M0 10h30"
        />
        <path
          stroke="#CF142B"
          strokeWidth={3.466}
          d="M15 0v20M0 10h30"
        />
      </g>
    </g>
    <defs>
      <clipPath id="ukFlagClipPath1">
        <rect
          width={30}
          height={20}
          fill="#fff"
          rx={1}
        />
      </clipPath>
      <clipPath id="ukFlagClipPath2">
        <path
          fill="#fff"
          d="M0 0h30v20H0z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default UnitedKingdom;
