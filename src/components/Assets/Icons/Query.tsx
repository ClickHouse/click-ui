import { SVGAssetProps } from './system/types';

const Query = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_4716_4565)">
      <path
        d="M20 20H4C2.895 20 2 19.1 2 18V6C2 4.89 2.895 4 4 4H20C21.1 4 22 4.89 22 6V18C22 19.1 21.1 20 20 20Z"
        stroke="#161517"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 13H15"
        stroke="#161517"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 8L8 10L6 12"
        stroke="#161517"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4716_4565">
        <rect
          width="24"
          height="24"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Query;
