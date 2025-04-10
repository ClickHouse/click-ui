import { SVGAttributes } from "react";

const Dot = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="3.75"
      cy="3.75"
      r="3.75"
      fill="#FFF"
      stroke="#FFF"
      strokeWidth="1.5"
      transform="translate(8 8)"
    />
  </svg>
);

export default Dot;
