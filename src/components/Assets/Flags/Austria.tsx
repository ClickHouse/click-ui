import type { SVGAssetProps } from '@/types';

const Austria = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#Austria__a)">
      <path
        fill="#fff"
        d="M0 6.6665H30V13.3332H0V6.6665Z"
      />
      <path
        fill="#C8102E"
        d="M0 0H30V6.66667H0V0ZM0 13.3333H30V20H0V13.3333Z"
      />
    </g>
    <defs>
      <clipPath id="Austria__a">
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
export default Austria;
