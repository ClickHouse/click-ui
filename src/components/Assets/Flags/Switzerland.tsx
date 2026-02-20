import * as React from 'react';
import { SVGAssetProps } from './system/types';

const Switzerland = (props: SVGAssetProps): React.ReactElement => (
  <svg
    width="30"
    height="20"
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_8668_6183)">
      <path
        d="M30 0H0V20H30V0Z"
        fill="#D52B1E"
      />
      <path
        d="M21.6663 7.77783H8.33301V12.2223H21.6663V7.77783Z"
        fill="white"
      />
      <path
        d="M17.2218 3.3335H12.7773V16.6668H17.2218V3.3335Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_8668_6183">
        <rect
          width="30"
          height="20"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);
export default Switzerland;
