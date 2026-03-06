import React from 'react';
import { SVGAssetProps } from './system/types';

const Singapore = (props: SVGAssetProps): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#singaporeFlagClipPath1)">
      <g clipPath="url(#singaporeFlagClipPath2)">
        <path
          fill="#fff"
          d="M0 0h30v20H0V0Z"
        />
        <path
          fill="#ED2939"
          d="M0 0h30v10H0V0Z"
        />
        <path
          fill="#fff"
          d="M6.336 8.68a3.68 3.68 0 1 0 0-7.36 3.68 3.68 0 0 0 0 7.36Z"
        />
        <path
          fill="#ED2939"
          d="M8.003 8.68a3.68 3.68 0 1 0 0-7.36 3.68 3.68 0 0 0 0 7.36Z"
        />
        <path
          fill="#fff"
          d="m8.35 1.93-.563 1.734L9.26 2.593H7.438l1.475 1.071-.563-1.733ZM11.269 4.051H9.446l1.475 1.072-.563-1.734-.564 1.734L11.27 4.05ZM6.546 7.483 8.02 6.412H6.198l1.474 1.071L7.11 5.75l-.563 1.733ZM10.154 7.483 9.591 5.75l-.563 1.733 1.474-1.071H8.68l1.474 1.071ZM5.431 4.052l1.475 1.071-.564-1.734-.563 1.734 1.475-1.071H5.43Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="singaporeFlagClipPath1">
        <rect
          width={30}
          height={20}
          fill="#fff"
          rx={1}
        />
      </clipPath>
      <clipPath id="singaporeFlagClipPath2">
        <path
          fill="#fff"
          d="M0 0h30v20H0z"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Singapore;
