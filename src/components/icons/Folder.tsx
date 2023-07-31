import { SVGAttributes } from "react";

const Folder = (props: SVGAttributes<SVGElement>) => (
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
      strokeWidth={1.5}
      d="M20 19H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3.629a1 1 0 0 1 .869.506l.846 1.488a1 1 0 0 0 .87.506H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1ZM11 7.5H3"
    />
  </svg>
);

export default Folder;
