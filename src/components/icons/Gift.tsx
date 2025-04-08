import { SVGAttributes } from "react";

const Gift = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#161517"
      strokeWidth="1.5"
      transform="translate(3 2)"
    >
      <path
        d="M10.68 4.29c1.1 0 2.08-1.1 2.08-2.2S11.79 0 10.68 0a2 2 0 0 0-2 2v2.29h2Zm-3.9 0C5.75 4.29 5 3.45 5 2.42 5 1.4 5.75.46 6.78.46s1.87.85 1.87 1.88v1.95H6.78Z"
      />
      <path
        d="M1.3 4.27h14.78c.71 0 1.3.58 1.3 1.3v1.4c0 .82-.68 1.5-1.5 1.5H1.5A1.5 1.5 0 0 1 0 6.97v-1.4c0-.72.58-1.3 1.3-1.3Z"
      />
      <line
        x1="8.68"
        x2="8.68"
        y1="4.17"
        y2="19.17"
        strokeLinecap="square"
      />
      <path
        d="M1.53 8.48v9.04c0 .97.78 1.75 1.75 1.75h10.84c.97 0 1.75-.78 1.75-1.75V8.48"
      />
    </g>
  </svg>
);

export default Gift;
