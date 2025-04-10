import { SVGAttributes } from "react";

const DatabaseIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    fill="none"
    viewBox="0 0 24 25"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#161517"
      strokeWidth="1.5"
      transform="translate(6 4)">
      <ellipse
        cx="6"
        cy="2.13"
        rx="6"
        ry="2.13"
      />
      <path
        d="M0 6.5c1.28 1.05 3.28 1.58 6 1.58s4.72-.53 6-1.59M0 10.5c1.54 1.13 3.53 1.7 6 1.7 2.46 0 4.47-.57 6-1.7"
      />
      <path
        strokeLinejoin="round"
        d="M0 2.1v11.82c1.25 1.52 3.25 2.28 6 2.28 2.76 0 4.76-.76 6-2.28V2.1"
      />
    </g>
  </svg>
);

export default DatabaseIcon;
