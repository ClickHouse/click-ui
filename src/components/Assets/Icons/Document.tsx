import { SVGAssetProps } from './system/types';

const Document = (props: SVGAssetProps) => (
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
      d="M18.003 21.004H5.998a2 2 0 0 1-2-2V4.996a2 2 0 0 1 2-2h12.005a2 2 0 0 1 2 2v14.006a2 2 0 0 1-2 2.001Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.999 7.999h7.003M8.999 16.002h7.003M8.999 12h7.003"
    />
  </svg>
);

export default Document;
