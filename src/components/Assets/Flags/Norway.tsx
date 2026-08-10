import type { SVGAssetProps } from '@/types';

const Norway = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#ED2939"
        d="M0 0H30V20H0V0Z"
      />
      <path
        fill="#fff"
        d="M8.4375 0H14.0625V20H8.4375V0Z"
      />
      <path
        fill="#fff"
        d="M0 7.5H30V12.5H0V7.5Z"
      />
      <path
        fill="#002664"
        d="M9.84375 0H12.6562V20H9.84375V0Z"
      />
      <path
        fill="#002664"
        d="M0 8.75H30V11.25H0V8.75Z"
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
export default Norway;
