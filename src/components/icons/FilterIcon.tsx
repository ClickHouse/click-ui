import React from "react";
import { IconProps } from "./types";

function FilterIcon(props: IconProps) {
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
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M14.5 13.5l5.207-5.207A1 1 0 0020 7.586V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2.586c0 .265.105.52.293.707L9.5 13.5M9.5 13.5v6.249c0 .813.764 1.41 1.553 1.213l2.5-.625a1.25 1.25 0 00.947-1.213V13.5'
      ></path>
    </svg>
  );
}

export default FilterIcon;
