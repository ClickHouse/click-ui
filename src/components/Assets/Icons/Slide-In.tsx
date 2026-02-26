import { SVGAssetProps } from './system/types';

const Slide_In = (props: SVGAssetProps) => (
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
      d="M5.297 11.985h11.867M12.424 7.491l4.78 4.51-4.78 4.508"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M19 17V7"
    />
  </svg>
);

export default Slide_In;
