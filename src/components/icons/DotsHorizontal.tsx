import { SVGAttributes } from 'react';

const DotsHorizontal = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle
      cx={7}
      cy={12}
      r={1.5}
      fill="#161517"
      transform="rotate(-90 7 12)"
    />
    <circle
      cx={12.5}
      cy={12}
      r={1.5}
      fill="#161517"
      transform="rotate(-90 12.5 12)"
    />
    <circle
      cx={18}
      cy={12}
      r={1.5}
      fill="#161517"
      transform="rotate(-90 18 12)"
    />
  </svg>
);

export default DotsHorizontal;
