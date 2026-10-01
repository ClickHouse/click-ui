import type { SVGAssetProps } from '@/types';

const Indonesia = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#Indonesia__a)">
      <path
        fill="#fff"
        d="M0 0H30V20H0V0Z"
      />
      <path
        fill="#E70011"
        d="M0 0H30V10H0V0Z"
      />
    </g>
    <defs>
      <clipPath id="Indonesia__a">
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
export default Indonesia;
