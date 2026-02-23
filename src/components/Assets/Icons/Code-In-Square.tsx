import { SVGAssetProps } from './system/types';

const Code_In_Square = (props: SVGAssetProps) => (
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
      d="m12.952 8.661-1.905 6.67M8.903 12.948l-1.905-1.905 1.905-1.905M15.098 14.854l1.904-1.905-1.904-1.905"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.998 2.992h8.003a5.002 5.002 0 0 1 5.003 5.002v8.004A5.002 5.002 0 0 1 16 21H7.998a5.002 5.002 0 0 1-5.002-5.002V7.994a5.002 5.002 0 0 1 5.002-5.002Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Code_In_Square;
