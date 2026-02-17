import { SVGAssetProps } from './system/types';

const Burger_Menu = (props: SVGAssetProps) => (
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
      d="M3.75 7.25h16.5M3.75 12.5h16.5m-16.5 5.25H12"
    />
  </svg>
);

export default Burger_Menu;
