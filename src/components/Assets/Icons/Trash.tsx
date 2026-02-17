import { SVGAssetProps } from './system/types';

const Trash = (props: SVGAssetProps) => (
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
      d="M18 6v12.75c0 1.243-1.027 2.25-2.269 2.25h-7.5A2.233 2.233 0 0 1 6 18.75V6M19.5 6h-15M10 3h4M14 10v7M10 17v-7"
    />
  </svg>
);

export default Trash;
