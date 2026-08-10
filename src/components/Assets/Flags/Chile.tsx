import type { SVGAssetProps } from '@/types';

const Chile = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={20}
    fill="none"
    viewBox="0 0 30 20"
    {...props}
  >
    <g clipPath="url(#Chile__a)">
      <mask
        id="Chile__b"
        width={31}
        height={20}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <path
          fill="#fff"
          d="M0 0H30.0015V20H0V0Z"
        />
      </mask>
      <g
        fillRule="evenodd"
        clipRule="evenodd"
        mask="url(#Chile__b)"
      >
        <path
          fill="#fff"
          d="M11.25 0H33.75V10H11.25V0Z"
        />
        <path
          fill="#0039A6"
          d="M0 0H11.25V10H0V0Z"
        />
        <path
          fill="#fff"
          d="M7.37402 7.48828L5.63379 6.32812L3.89795 7.5L4.54395 5.59375L2.8125 4.41797L4.95264 4.39844L5.61621 2.5L6.29736 4.39453L8.4375 4.39844L6.71484 5.58594L7.37402 7.48828Z"
        />
        <path
          fill="#D52B1E"
          d="M0 10H33.75V20H0V10Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="Chile__a">
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
export default Chile;
