import { SVGAttributes } from "react";

const Integrations = (props: SVGAttributes<SVGElement>) => (
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
      d="M10 9.056C9.094 7.818 7.652 7 6 7v0a5 5 0 0 0-5 5v0a5 5 0 0 0 5 5v0a5.299 5.299 0 0 0 4.543-2.572L12 12l1.457-2.428A5.299 5.299 0 0 1 18 7v0a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5v0c-1.652 0-3.094-.818-4-2.056"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9.93 6.028.521 2.954-2.954.52"
    />
  </svg>
);

export default Integrations;
