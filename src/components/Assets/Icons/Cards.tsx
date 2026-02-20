import { SVGAssetProps } from './system/types';

const Cards = (props: SVGAssetProps) => (
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.882 21.004H6.117a2.401 2.401 0 0 1-2.389-2.162l-.72-7.203A2.4 2.4 0 0 1 5.397 9h13.205a2.401 2.401 0 0 1 2.39 2.64l-.72 7.203a2.4 2.4 0 0 1-2.39 2.162v0Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.998 5.998h12.005M7.998 2.996h8.003M9.499 12.75h5.002"
    />
  </svg>
);

export default Cards;
