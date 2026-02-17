import { SVGAssetProps } from './system/types';

const Plug = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m13.5 13.5-2.25 2.25M10.5 10.5l-2.25 2.25M6 10.5l7.5 7.5M5.443 18.557 2.25 21.75M12.375 16.875l-2.718 2.719a2.25 2.25 0 0 1-3.182 0l-2.068-2.071a2.25 2.25 0 0 1 0-3.18l2.718-2.718M10.5 6l7.5 7.5M18.557 5.443 21.75 2.25M16.875 12.375l2.719-2.719a2.25 2.25 0 0 0 0-3.182l-2.071-2.068a2.25 2.25 0 0 0-3.18 0l-2.718 2.719"
    ></path>
  </svg>
);

export default Plug;
