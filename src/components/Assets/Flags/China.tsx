import type { SVGAssetProps } from '@/types';

const China = (props: SVGAssetProps) => (
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
        fill="#EE1C25"
        d="M0 0H30V20H0V0Z"
      />
      <path
        fill="#FF0"
        d="M3.59998 7.4 5.62496 2 7.64993 7.4 2.25 4.1H8.99992L3.59998 7.4ZM12.3827 2.10328 10.2987 2.51379 11.6888 1.07393 11.5525 3.01179 10.396 1.2962 12.3827 2.10328ZM14.4862 4.47263 12.3862 4.13256 14.2957 3.28463 13.3245 5.02381 13.0071 3.04381 14.4862 4.47263ZM14.18 7.79688 12.4187 6.72507 14.5512 6.64314 12.8665 7.879 13.4852 5.95609 14.18 7.79688ZM11.531 9.96845 10.372 8.37511 12.3747 9.03167 10.2837 9.59324 11.6899 8.03194 11.531 9.96845Z"
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
export default China;
