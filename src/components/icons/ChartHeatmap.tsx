import { SVGAttributes } from "react";

const ChartHeatmap = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd" stroke="#FFF" strokeWidth="1.5" transform="translate(3 4)">
      <path strokeLinecap="round" strokeLinejoin="round" d="M0 .03v14.98h18.05"/>
      <circle cx="7.75" cy="6.75" r="1.75" fill="#FFF" fill-rule="nonzero"/>
      <circle cx="13.25" cy="10.25" r="1.25" fill="#FFF" fill-rule="nonzero"/>
      <circle cx="4.25" cy="2.25" r="1" fill="#FFF" fill-rule="nonzero"/>
      <circle cx="11.25" cy="3.25" r="3.25" fill="#FFF" fill-rule="nonzero"/>
    </g>
  </svg>
);

export default ChartHeatmap;
