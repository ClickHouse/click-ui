import { SVGAssetProps } from './system/types';

const Thumbs_Down = (props: SVGAssetProps) => (
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
      d="M7.5 14.25H3a.75.75 0 0 1-.75-.75V5.25A.75.75 0 0 1 3 4.5h4.5m0 9.75V4.5m0 9.75 3.75 7.5a3 3 0 0 0 3-3V16.5h6a1.5 1.5 0 0 0 1.488-1.687l-1.125-9A1.5 1.5 0 0 0 19.125 4.5H7.5"
    ></path>
  </svg>
);

export default Thumbs_Down;
