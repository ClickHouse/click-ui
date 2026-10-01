import type { SVGAssetProps } from '@/types';

const Belgium = (props: SVGAssetProps) => (
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
      clipPath="url(#Belgium__a)"
      clipRule="evenodd"
    >
      <path
        fill="#000001"
        d="M0 0H9.99844V20H0V0Z"
      />
      <path
        fill="#FFD90C"
        d="M9.99805 0H20.0012V20H9.99805V0Z"
      />
      <path
        fill="#F31830"
        d="M20.002 0H30.0004V20H20.002V0Z"
      />
    </g>
    <defs>
      <clipPath id="Belgium__a">
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
export default Belgium;
