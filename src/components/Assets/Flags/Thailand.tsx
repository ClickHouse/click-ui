import type { SVGAssetProps } from '@/types';

const Thailand = (props: SVGAssetProps) => (
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
        fill="#F4F5F8"
        d="M0 0H30V20H0V0Z"
      />
      <path
        fill="#2D2A4A"
        d="M0 6.771H30V13.4377H0V6.771Z"
      />
      <path
        fill="#A51931"
        d="M0 0H30V3.4375H0V0ZM0 16.6667H30V20H0V16.6667Z"
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
export default Thailand;
