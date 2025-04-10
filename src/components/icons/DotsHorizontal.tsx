import { SVGAttributes } from "react";

const DotsHorizontal = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g transform='translate(7 12)'>
      <circle
        r={1.5}
        fill="#FFF"
        stroke="#FFF"
        strokeWidth="1.5"
      />
    </g>
    <g transform='translate(12.5 12)'>
      <circle
        r={1.5}
        fill="#FFF"
        stroke="#FFF"
        strokeWidth="1.5"
      />
    </g>
    <g transform='translate(18 12)'>
      <circle
        r={1.5}
        fill="#FFF"
        stroke="#FFF"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

export default DotsHorizontal;
