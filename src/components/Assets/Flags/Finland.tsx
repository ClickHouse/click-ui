import type { SVGAssetProps } from '@/types';

const Finland = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#Finland__a)">
      <path
        fill="#fff"
        d="M0 0H30V20H0V0Z"
      />
      <path
        fill="#002F6C"
        d="M0 7.271H30V12.7293H0V7.271Z"
      />
      <path
        fill="#002F6C"
        d="M8.22637 0H14.3623V20H8.22168L8.22637 0Z"
      />
    </g>
    <defs>
      <clipPath id="Finland__a">
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
export default Finland;
