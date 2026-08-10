import type { SVGAssetProps } from '@/types';

const Italy = (props: SVGAssetProps) => (
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
          fill="#009246"
          d="M30 0H0V20H30V0Z"
        />
        <path
          fill="#fff"
          d="M30 0H10V20H30V0Z"
        />
        <path
          fill="#CE2B37"
          d="M30 0H20V20H30V0Z"
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
export default Italy;
