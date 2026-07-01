import type { SVGAssetProps } from '@/types';

const Polaris = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    {...props}
  >
    <defs>
      <linearGradient
        id="a"
        x1={0}
        x2={64}
        y1={0}
        y2={64}
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0%"
          stopColor="#00777f"
        />
        <stop
          offset="100%"
          stopColor="#003545"
        />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      d="M0 0H64V64H0z"
    />
    <path
      fill="none"
      stroke="#007d86"
      d="M.5.5H63.5V63.5H.5z"
    />
    <path
      fill="#fff"
      d="M 11.20 10.74 Q 33.14 28.57 44.34 19.89 Q 34.74 34.06 53.03 52.57 Q 34.06 34.74 19.89 44.34 Q 28.57 33.14 11.20 10.74 Z"
    />
  </svg>
);
export default Polaris;
