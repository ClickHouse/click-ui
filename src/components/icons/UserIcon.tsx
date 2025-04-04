import { SVGAttributes } from "react";

export const UserIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd" stroke="#FFF" strokeWidth="1.5" transform="translate(4 3)">
      <circle cx="8.01" cy="4.47" r="4.47"/>
      <path d="M3 11.98h10a3 3 0 0 1 3 3v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2a3 3 0 0 1 3-3Z"/>
    </g>
  </svg>
);
