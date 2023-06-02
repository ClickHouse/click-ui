import React from "react";
import { IconProps } from "./types";

function SortAltIcon(props: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M3.4 15.4L7 19l3.6-3.6M7 5v14M20.6 8.6L17 5l-3.6 3.6M17 19V5'
      ></path>
    </svg>
  );
}

export default SortAltIcon;
