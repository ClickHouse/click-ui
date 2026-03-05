import React from 'react';
import { SVGAssetProps } from './system/types';

const UnitedArabEmirates = (props: SVGAssetProps): React.ReactElement => (
  <svg
    width="30"
    height="20"
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_10582_2024)">
      <path
        d="M30 0H0V20H30V0Z"
        fill="#00732F"
      />
      <path
        d="M30 6.6665H0V19.9998H30V6.6665Z"
        fill="white"
      />
      <path
        d="M30 13.3335H0V20.0002H30V13.3335Z"
        fill="black"
      />
      <path
        d="M7.5 0H0V20H7.5V0Z"
        fill="#FF0000"
      />
    </g>
    <defs>
      <clipPath id="clip0_10582_2024">
        <rect
          width="30"
          height="20"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export default UnitedArabEmirates;
