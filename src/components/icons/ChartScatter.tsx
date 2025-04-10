import { SVGAttributes } from "react";

const ChartScatter = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 5v14.98h18.05"
      />
      <path
        fill="#FFF"
        fillRule="nonzero"
        d="M12.13 15.25a1.13 1.13 0 1 0 0-2.25 1.13 1.13 0 0 0 0 2.25ZM9.88 10a1.12 1.12 0 1 0 0-2.25 1.12 1.12 0 0 0 0 2.25Zm-3 6.75a1.13 1.13 0 1 0 0-2.25 1.13 1.13 0 0 0 0 2.25Zm9-4.5a1.13 1.13 0 1 0 0-2.25 1.13 1.13 0 0 0 0 2.25Zm2.25-3.75a1.12 1.12 0 1 0 0-2.25 1.12 1.12 0 0 0 0 2.25Zm-1.88 7.13a1.13 1.13 0 1 0 2.25 0 1.13 1.13 0 0 0-2.25 0Z"
      />
    </g>
  </svg>
);

export default ChartScatter;
