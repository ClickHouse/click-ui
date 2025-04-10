import { SVGAttributes } from "react";

const CheckIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#161517"
      stroke="#161517"
      strokeWidth="1.5"
      d="M19.82 6.82a.25.25 0 0 1 .36.36l-11 11c-.1.1-.26.1-.36 0l-5-5a.25.25 0 0 1 .36-.36L9 17.65 19.82 6.82Z"
    />
  </svg>
);
export default CheckIcon;
