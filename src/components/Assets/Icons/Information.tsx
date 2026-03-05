import { SVGAssetProps } from './system/types';

const Information = (props: SVGAssetProps) => (
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
      d="M10.854 11.877h1.15v4.252M10.845 16.128h2.31"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.946 7.872a.25.25 0 1 1-.25-.25"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.695 8.623a.25.25 0 0 1 .25.25"
    />
  </svg>
);

export default Information;
