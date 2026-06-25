import * as React from 'react';
import type { SVGAssetProps } from '@/types';

const France = (props: SVGAssetProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#franceFlagClipPath)">
      <path
        fill="#002395"
        d="M10 0H0v20h10V0Z"
      />
      <path
        fill="#fff"
        d="M20 0H10v20h10V0Z"
      />
      <path
        fill="#ED2939"
        d="M30 0H20v20h10V0Z"
      />
    </g>
    <defs>
      <clipPath id="franceFlagClipPath">
        <rect
          width={30}
          height={20}
          fill="#fff"
          rx={1}
        />
      </clipPath>
    </defs>
  </svg>
);
export default France;
