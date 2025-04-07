import { SVGAttributes } from "react";

const DotsVerticalDouble = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle
      cx="8.5"
      cy="6.5"
      r="1.5"
      fill="#161517"
      stroke="#161517"
      strokeWidth="1.5"
    />
    <circle
      cx="8.5"
      cy="12"
      r="1.5"
      fill="#161517"
      stroke="#161517"
      strokeWidth="1.5"
    />
    <circle
      cx="8.5"
      cy="17.5"
      r="1.5"
      fill="#161517"
      stroke="#161517"
      strokeWidth="1.5"
    />
    <circle
      cx="15.5"
      cy="6.5"
      r="1.5"
      fill="#161517"
      stroke="#161517"
      strokeWidth="1.5"
    />
    <circle
      cx="15.5"
      cy="12"
      r="1.5"
      fill="#161517"
      stroke="#161517"
      strokeWidth="1.5"
    />
    <circle
      cx="15.5"
      cy="17.5"
      r="1.5"
      fill="#161517"
      stroke="#161517"
      strokeWidth="1.5"
    />
  </svg>
);

export default DotsVerticalDouble;
