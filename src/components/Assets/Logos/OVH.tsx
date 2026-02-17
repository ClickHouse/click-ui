/* eslint-disable react-refresh/only-export-components */

import { SVGAssetProps } from './system/types';
import { SVGAttributes } from 'react';

const OVHBase = ({ theme, ...props }: SVGAssetProps) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill={theme === 'dark' ? '#FFFFFF' : '#000E9C'}
        fillRule="evenodd"
        d="M57.854 16.272a30.784 30.784 0 0 1-2.868 34.145H38.528l5.065-8.957h-6.7l7.898-13.915h6.738l6.325-11.258v-.015ZM25.358 50.417H8.58A30.399 30.399 0 0 1 1.72 31.183a30.4 30.4 0 0 1 3.954-14.986l10.882 18.901L28.55 14.207h17.652L25.366 50.402l-.008.015Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M1.719 14.207h60v36.21h-60z"
        />
      </clipPath>
    </defs>
  </svg>
);

const OVHDark = (props: SVGAttributes<SVGElement>) => (
  <OVHBase
    theme="dark"
    {...props}
  />
);

const OVHLight = (props: SVGAttributes<SVGElement>) => (
  <OVHBase
    theme="light"
    {...props}
  />
);

const OVH = ({ theme, ...props }: SVGAssetProps) => {
  if (theme === 'dark') {
    return <OVHDark {...props} />;
  }

  return <OVHLight {...props} />;
};

export default OVH;
