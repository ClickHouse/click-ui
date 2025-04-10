import { SVGAttributes } from "react";

const Payment = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#161517"
      strokeWidth="1.5"
      transform="translate(3 6)"
    >
      <rect
        width="18.5"
        height="11.9"
        rx=".8"
      />
      <rect
        width="18.5"
        height="1.2"
        y="3.9"
        fill="#161517"
      />
    </g>
  </svg>
);

export default Payment;
