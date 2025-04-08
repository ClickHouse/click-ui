import { SVGAttributes } from "react";

const Upgrade = (props: SVGAttributes<SVGElement>) => (
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
      stroke="#FFF"
      strokeWidth="1.5"
      transform="translate(4 3)"
    >
      <path
        d="m8.46.47 7.73 8.39h-4.63v4.38H4.55V8.86H0L7.6.47a.58.58 0 0 1 .86 0Z"
      />
      <line
        x1="4.53"
        x2="11.53"
        y1="15.2"
        y2="15.2"
        strokeLinecap="square"
      />
      <line
        x1="4.53"
        x2="11.53"
        y1="17.15"
        y2="17.15"
        strokeLinecap="square"
      />
    </g>
  </svg>
);

export default Upgrade;
