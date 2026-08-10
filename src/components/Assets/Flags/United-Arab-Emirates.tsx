import type { SVGAssetProps } from '@/types';

const United_Arab_Emirates = (props: SVGAssetProps) => (
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
        fill="#00732F"
        d="M0 0H30V6.66667H0V0Z"
      />
      <path
        fill="#fff"
        d="M0 6.6665H30V13.3332H0V6.6665Z"
      />
      <path
        fill="#000001"
        d="M0 13.3335H30V20.0002H0V13.3335Z"
      />
      <path
        fill="red"
        d="M0 0H10.3125V20H0V0Z"
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
export default United_Arab_Emirates;
