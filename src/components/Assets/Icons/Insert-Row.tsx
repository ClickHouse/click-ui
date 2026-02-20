import { SVGAssetProps } from './system/types';

const Insert_Row = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 4h12M3 4h1M3 8h1M3 12h1M8 8h12M8 12h2"
    />
    <path
      stroke="#161517"
      strokeWidth={1.5}
      d="M17 21a5 5 0 0 1-5-5c0-2.704 2.3-5.003 5.004-5A5 5 0 0 1 17 21"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 14v4M19 16h-4"
    />
  </svg>
);

export default Insert_Row;
