import React from 'react';
import { SVGAssetProps } from './system/types';

const SouthAfrica = (props: SVGAssetProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_3880_12429)">
      <path
        d="M0 0H30V9.99994H15L0 0Z"
        fill="#E03C31"
      />
      <path
        d="M0 19.9994H30V9.99951H15L0 19.9994Z"
        fill="#001489"
      />
      <mask
        id="mask0_3880_12429"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="30"
        height="20"
      >
        <path
          d="M0 0H30V19.9999H0V0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_3880_12429)">
        <path
          d="M30 9.99994H15M15 9.99994L0 0V19.9999L15 9.99994Z"
          stroke="white"
          strokeWidth="6.66665"
        />
        <mask
          id="mask1_3880_12429"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="15"
          height="20"
        >
          <path
            d="M0 0L15 9.99994L0 19.9999V0Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_3880_12429)">
          <path
            d="M0 0L15 9.99994L0 19.9999"
            fill="black"
          />
          <path
            d="M0 0L15 9.99994L0 19.9999"
            stroke="#FFB81C"
            strokeWidth="6.66665"
          />
        </g>
        <path
          d="M0 0L15 9.99994M15 9.99994H30M15 9.99994L0 19.9999"
          stroke="#007749"
          strokeWidth="3.99999"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_3880_12429">
        <rect
          width="30"
          height="19.9999"
          rx="1"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);
export default SouthAfrica;
