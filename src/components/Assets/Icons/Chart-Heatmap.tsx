import { SVGAssetProps } from './system/types';

const Chart_Heatmap = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.5 19.75C21.5 19.9489 21.421 20.1397 21.2803 20.2803C21.1397 20.421 20.9489 20.5 20.75 20.5H2.75C2.55109 20.5 2.36032 20.421 2.21967 20.2803C2.07902 20.1397 2 19.9489 2 19.75V4.75C2 4.55109 2.07902 4.36032 2.21967 4.21967C2.36032 4.07902 2.55109 4 2.75 4C2.94891 4 3.13968 4.07902 3.28033 4.21967C3.42098 4.36032 3.5 4.55109 3.5 4.75V19H20.75C20.9489 19 21.1397 19.079 21.2803 19.2197C21.421 19.3603 21.5 19.5511 21.5 19.75Z"
      fill="white"
    />
    <circle
      cx="10.5"
      cy="11.5"
      r="2.5"
      fill="white"
    />
    <circle
      cx="16"
      cy="15"
      r="2"
      fill="white"
    />
    <circle
      cx="7"
      cy="7"
      r="1"
      fill="white"
    />
    <circle
      cx="14"
      cy="8"
      r="4"
      fill="white"
    />
  </svg>
);

export default Chart_Heatmap;
