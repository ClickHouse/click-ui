import { SVGAttributes } from "react";

const SortIcon = (props: SVGAttributes<SVGElement>) => {
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
        d='M16 9L12 5L8 9'
        stroke='#161517'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 15L12 19L16 15'
        stroke='#161517'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default SortIcon;
