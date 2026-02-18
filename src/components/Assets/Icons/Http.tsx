import { SVGAssetProps } from './system/types';

const Http = (props: SVGAssetProps) => (
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
      d="M3 13.8v-3.6M5.88 10.2v3.6M5.88 12H3M10.92 10.2H8.04M9.48 10.2v3.6M18.12 10.2v3.6M15.96 10.2h-2.88M14.52 10.2v3.6M18.12 10.2h1.755c.621 0 1.125.504 1.125 1.125v0c0 .621-.504 1.125-1.125 1.125H18.12M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"
    />
  </svg>
);

export default Http;
