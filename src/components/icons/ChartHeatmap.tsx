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
    <g
      fill="none"
      fillRule="evenodd"
      transform="translate(3 4)"
    >
      <path
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M0 .027v14.985h18.053"
      />
      <circle
        cx="7.5"
        cy="7.5"
        r="2.5"
        fill="#FFF"
        fillRule="nonzero"
      />
      <circle
        cx="13"
        cy="11"
        r="2"
        fill="#FFF"
        fillRule="nonzero"/>
      <circle
        cx="4"
        cy="3"
        r="1"
        fill="#FFF"
        fillRule="nonzero"/>
      <circle
        cx="11"
        cy="4"
        r="4"
        fill="#FFF"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default ChartHeatmap;
