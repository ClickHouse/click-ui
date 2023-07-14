import { SVGAttributes } from "react";

const ChevronUp = (props: SVGAttributes<SVGElement>) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M16 14L12 10L8 14'
      stroke='#161517'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default ChevronUp;
