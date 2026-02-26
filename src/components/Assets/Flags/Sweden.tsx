import * as React from 'react';
import { SVGAssetProps } from './system/types';

const Sweden = (props: SVGAssetProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#swedenFlagClipPath)">
      <path
        d="M0 0H30V20H0V0Z"
        fill="#006AA7"
      />
      <path
        d="M0 8H9.375V0H13.125V8H30V12H13.125V20H9.375V12H0V8Z"
        fill="#FECC00"
      />
    </g>
    <defs>
      <clipPath id="clip0_5333_368">
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
export default Sweden;
