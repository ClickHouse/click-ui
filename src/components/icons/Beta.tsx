import { SVGAttributes } from "react";

const Beta = (props: SVGAttributes<SVGElement>) => (
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
      strokeLinecap="square"
      strokeWidth="1.5"
      d="M7.8 21.05V6.7c.52-4.1 6.92-3.9 6.92 0 0 3.23-2.96 3.23-4.17 3.23 1.07 0 2.91-.08 4 1.27.4.51.81 1.28.81 2.23.01 1.36-.39 2.14-1.08 2.77-.63.57-1.5.89-2.57.95-1.92-.1-3.405-1.323-3.794-3.72"
    />
  </svg>
);

export default Beta;
