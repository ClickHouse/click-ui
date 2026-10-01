import type { SVGAssetProps } from '@/types';

const Ireland = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#Ireland__a)">
      <g clipPath="url(#Ireland__b)">
        <path
          fill="#009A49"
          d="M10 0H0V20H10V0Z"
        />
        <path
          fill="#fff"
          d="M20 0H10V20H20V0Z"
        />
        <path
          fill="#FF7900"
          d="M30 0H20V20H30V0Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="Ireland__a">
        <rect
          width={30}
          height={20}
          fill="#fff"
          rx={1}
        />
      </clipPath>
      <clipPath id="Ireland__b">
        <path
          fill="#fff"
          d="M0 0H30V20H0z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default Ireland;
