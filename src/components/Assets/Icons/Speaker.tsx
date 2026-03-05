import { SVGAssetProps } from './system/types';

const Speaker = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.999 15.002 6.998 15a4.003 4.003 0 0 1-4.002-4.004v-.998A4.002 4.002 0 0 1 7 5.997h7l3.874-2.647c1.329-.908 3.13.044 3.13 1.652v10.997c0 1.609-1.802 2.56-3.13 1.652L14 15.002Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 5.998v9.004M5.997 15.002l1.53 3.86a1.8 1.8 0 0 0 1.67 1.142v0c1.272 0 2.142-1.295 1.673-2.489l-.99-2.514"
    />
  </svg>
);

export default Speaker;
