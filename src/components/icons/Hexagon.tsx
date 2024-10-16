import { SVGAttributes } from "react";

const Hexagon = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="32"
    height="34"
    viewBox="0 0 32 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.2507 2.09676C15.6881 1.85613 16.2183 1.85613 16.6557 2.09676L29.0739 8.92822C29.5395 9.18439 29.8288 9.67373 29.8288 10.2052V23.6285C29.8288 24.16 29.5395 24.6494 29.0739 24.9055L16.6557 31.737C16.2183 31.9776 15.6881 31.9776 15.2507 31.737L2.83251 24.9055C2.36685 24.6494 2.07754 24.16 2.07754 23.6285V10.2052C2.07754 9.67373 2.36685 9.18439 2.83251 8.92822L15.2507 2.09676Z"
      fill="url(#paint0_linear_2635_36913)"
      stroke="white"
      stroke-width="2.91491"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2635_36913"
        x1="3.36761"
        y1="0.0468826"
        x2="11.3228"
        y2="7.59116"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" />
        <stop
          offset="1"
          stop-color="#292929"
        />
      </linearGradient>
    </defs>
  </svg>
);

export default Hexagon;
