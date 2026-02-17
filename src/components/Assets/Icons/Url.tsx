import { SVGAssetProps } from './system/types';

const Url = (props: SVGAssetProps) => (
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
      d="m17.445 12.778 2.333-2.333a4.401 4.401 0 0 0 0-6.223v0a4.401 4.401 0 0 0-6.223 0l-2.333 2.333M8.89 15.11l6.22-6.22M6.555 11.222l-2.333 2.333a4.401 4.401 0 0 0 0 6.223v0a4.401 4.401 0 0 0 6.223 0l2.333-2.333"
    />
  </svg>
);

export default Url;
