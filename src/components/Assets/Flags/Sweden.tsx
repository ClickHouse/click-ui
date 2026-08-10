import type { SVGAssetProps } from '@/types';

const Sweden = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#Sweden__a)">
      <path
        fill="#005293"
        d="M0 0H30V20H0V0Z"
      />
      <path
        fill="#FECB00"
        d="M0 8H9.375V0H13.125V8H30V12H13.125V20H9.375V12H0V8Z"
      />
    </g>
    <defs>
      <clipPath id="Sweden__a">
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
export default Sweden;
