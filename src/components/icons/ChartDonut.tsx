import { SVGAttributes } from "react";

const ChartDonut = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd" stroke="#FFF" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8.26c3.54.3 3.76 3.13 3.76 3.9 0 .79-.74 3.57-3.76 3.57-3.02 0-3.75-2.74-3.75-3.73 0-.66.16-1.29.49-1.88l-4.5-2.65A9 9 0 1 0 12 3l.01 5.26Z"
      />
      <path d="M12 15.73V21m-8.83-6.63 5.21-1.39"/>
    </g>
  </svg>
);

export default ChartDonut;
