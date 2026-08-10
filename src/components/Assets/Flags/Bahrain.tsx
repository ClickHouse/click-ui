import type { SVGAssetProps } from '@/types';

const Bahrain = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#Bahrain__a)">
      <path
        fill="#fff"
        d="M0 0H30V20H0"
      />
      <path
        fill="#CE1126"
        d="M30 0H4.5L9.68906 2L4.5 4L9.68906 6L4.5 8L9.68906 10L4.5 12L9.68906 14L4.5 16L9.68906 18L4.5 20H30"
      />
    </g>
    <defs>
      <clipPath id="Bahrain__a">
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
export default Bahrain;
