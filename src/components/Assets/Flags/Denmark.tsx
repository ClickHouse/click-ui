import type { SVGAssetProps } from '@/types';

const Denmark = (props: SVGAssetProps) => (
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
        fill="#C8102E"
        d="M0 0H30.0047V20H0V0Z"
      />
      <path
        fill="#fff"
        d="M9.64258 0H12.8582V20H9.64258V0Z"
      />
      <path
        fill="#fff"
        d="M0 8.5708H30.0047V11.4291H0V8.5708Z"
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
export default Denmark;
