import type { SVGAssetProps } from '@/types';

const Switzerland = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#a)">
      <g clipPath="url(#b)">
        <path
          fill="red"
          d="M30 0H0V20H30V0Z"
        />
        <path
          fill="#fff"
          d="M21.6663 7.77783H8.33301V12.2223H21.6663V7.77783Z"
        />
        <path
          fill="#fff"
          d="M17.2218 3.3335H12.7773V16.6668H17.2218V3.3335Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <rect
          width={30}
          height={20}
          fill="#fff"
          rx={1}
        />
      </clipPath>
      <clipPath id="b">
        <path
          fill="#fff"
          d="M0 0H30V20H0z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default Switzerland;
