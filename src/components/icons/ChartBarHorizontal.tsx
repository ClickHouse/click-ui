import { SVGAttributes } from "react";

const ChartBarHorizontal = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd" stroke="#FFF" strokeLinecap="round" strokeWidth="1.5">
      <path d="M3.5 20.51V4"/>
      <path strokeLinejoin="round" d="M3.5 5.5h12v3.8m-12 .7H20v4.5H3.5m0 4.5h9v-3.73"/>
    </g>
  </svg>
);

export default ChartBarHorizontal;
