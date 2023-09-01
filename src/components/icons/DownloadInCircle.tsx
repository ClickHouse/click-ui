import { SVGAttributes } from "react";

const DownloadInCircle= (props: SVGAttributes<SVGElement>) => (
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
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15 10L12 13L9 10"
    />
    <path
      stroke="#161517"
      strokeWidth={1.5}
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3V13"
    />
    <path
      stroke="#161517"
      strokeWidth={1.5}
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M8 16H16"
    />
    <path
      stroke="#161517"
      strokeWidth={1.5}
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M18.3643 5.63623C21.8793 9.15123 21.8793 14.8492 18.3643 18.3642C14.8493 21.8792 9.15125 21.8792 5.63625 18.3642C2.12125 14.8492 2.12125 9.15123 5.63625 5.63623"
    />
  </svg>
);

export default DownloadInCircle;
