import { SVGAttributes } from "react";

const Waves = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="none"
      stroke="#FFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M4 6.47c2.88-1.96 5.63-1.96 8.25 0 2.62 1.95 5.37 1.95 8.25 0M4 11.75c2.88-1.95 5.63-1.95 8.25 0 2.62 1.96 5.37 1.96 8.25 0M4 17.04c2.88-1.96 5.63-1.96 8.25 0 2.62 1.95 5.37 1.95 8.25 0"
    />
  </svg>
);

export default Waves;
