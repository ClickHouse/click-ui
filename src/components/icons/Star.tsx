import { SVGAttributes } from "react";

const Star = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.75 1.87 1.895 3.87 4.24.625-3.068 3.011.724 4.254-3.791-2.01-3.792 2.01.724-4.254-3.068-3.01 4.24-.625L7.75 1.87Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Star;
