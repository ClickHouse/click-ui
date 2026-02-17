import React from 'react';
import { SVGAssetProps } from './system/types';

const Indonesia = (props: SVGAssetProps): React.ReactElement => (
  <svg
    width="30"
    height="20"
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_15665_475)">
      <path
        d="M0 0H30V20H0V0Z"
        fill="white"
      />
      <path
        d="M0 0H30V10H0V0Z"
        fill="#FF0000"
      />
    </g>
    <defs>
      <clipPath id="clip0_15665_475">
        <rect
          width="30"
          height="20"
          rx="1"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Indonesia;
