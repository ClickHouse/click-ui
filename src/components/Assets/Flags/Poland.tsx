import type { SVGAssetProps } from '@/types';

const Poland = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g
      fillRule="evenodd"
      clipPath="url(#a)"
      clipRule="evenodd"
    >
      <path
        fill="#fff"
        d="M30 20H0V0H30V20Z"
      />
      <path
        fill="#DC143C"
        d="M30 20H0V10H30V20Z"
      />
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
    </defs>
  </svg>
);
export default Poland;
