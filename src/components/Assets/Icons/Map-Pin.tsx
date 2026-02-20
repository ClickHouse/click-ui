import { SVGAssetProps } from './system/types';

const Map_Pin = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 12.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
    ></path>
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M19.5 9.75c0 6.75-7.5 12-7.5 12s-7.5-5.25-7.5-12a7.5 7.5 0 0 1 15 0"
    ></path>
  </svg>
);

export default Map_Pin;
