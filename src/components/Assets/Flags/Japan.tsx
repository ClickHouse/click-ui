import React from 'react';
import { SVGAssetProps } from './system/types';

const Japan = (props: SVGAssetProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="20"
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_8004_401)">
      <path
        d="M30 0H0V20H30V0Z"
        fill="white"
      />
      <path
        d="M15 16C18.3137 16 21 13.3137 21 10C21 6.68629 18.3137 4 15 4C11.6863 4 9 6.68629 9 10C9 13.3137 11.6863 16 15 16Z"
        fill="#BC002D"
      />
    </g>
    <defs>
      <clipPath id="clip0_8004_401">
        <rect
          width="30"
          height="20"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);
export default Japan;
