import { SVGAttributes } from "react";

const ChartScatter = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd" stroke="#FFF" strokeWidth="1.5" transform="translate(3 5)">
      <path stroke-linecap="round" stroke-linejoin="round" d="M0 0v14.98h18.05"/>
      <circle cx="4.1" cy="10.84" r="1" fill="#FFF" fillRule="nonzero"/>
      <circle cx="9.38" cy="9.35" r="1" fill="#FFF" fillRule="nonzero"/>
      <circle cx="13.12" cy="6.34" r="1" fill="#FFF" fillRule="nonzero"/>
      <circle cx="15.36" cy="2.61" r="1" fill="#FFF" fillRule="nonzero"/>
      <circle cx="7.13" cy="4.1" r="1" fill="#FFF" fillRule="nonzero"/>
      <circle cx="14.62" cy="10.84" r="1" fill="#FFF" fillRule="nonzero"/>
    </g>
  </svg>
);

export default ChartScatter;
