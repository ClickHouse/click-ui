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
    />
    <circle
      cx="8.5"
      cy="13.5"
      r="1.5"
      fill="#161517"
    />
    <circle
      cx="8.5"
      cy="20.5"
      r="1.5"
      fill="#161517"
    />
    <circle
      cx="15.5"
      cy="6.5"
      r="1.5"
      fill="#161517"
    />
    <circle
      cx="15.5"
      cy="13.5"
      r="1.5"
      fill="#161517"
    />
    <circle
      cx="15.5"
      cy="20.5"
      r="1.5"
      fill="#161517"
    />
  </svg>
);

export default DotsVerticalDouble;
