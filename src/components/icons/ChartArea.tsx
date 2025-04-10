import { SVGAttributes } from "react";

const ChartArea = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd" stroke="#FFF" strokeLinecap="round" strokeWidth="1.5">
      <path strokeLinejoin="round" d="M3.02 5v14.98h18.06"/>
      <path strokeLinejoin="round" d="m21.07 9.47-6.03 5.27-6-4.51L3 15.52"/>
      <path d="M3.02 8.01 9.04 7l6 1.5 6-3"/>
    </g>
  </svg>
);

export default ChartArea;
