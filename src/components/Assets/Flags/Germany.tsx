import * as React from 'react';
import type { SVGAssetProps } from '@/types';

const Germany = (props: SVGAssetProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#germanyFlagClipPath)">
      <path
        fill="#FFCE00"
        d="M30 0H0v20h30V0Z"
      />
      <path
        fill="#D00"
        d="M30 0H0v13.333h30V0Z"
      />
      <path
        fill="#000"
        d="M30 0H0v6.667h30V0Z"
      />
    </g>
    <defs>
      <clipPath id="germanyFlagClipPath">
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
export default Germany;
