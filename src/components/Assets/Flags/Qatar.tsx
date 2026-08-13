import type { SVGAssetProps } from '@/types';

const Qatar = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#Qatar__a)">
      <path
        fill="#8D1B3D"
        d="M0 0H30V20H0V0Z"
      />
      <path
        fill="#fff"
        d="M0 0V20H7.425L12.0094 18.8875L7.425 17.7792L12.0047 16.6667L7.425 15.5542L12.0047 14.4458L7.425 13.3333L12.0094 12.2208L7.425 11.1125L12.0047 10L7.425 8.8875L12.0047 7.77917L7.425 6.66667L12.0094 5.55417L7.425 4.44583L12.0047 3.33333L7.425 2.22083L12.0094 1.1125L7.42031 0H0Z"
      />
    </g>
    <defs>
      <clipPath id="Qatar__a">
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
export default Qatar;
