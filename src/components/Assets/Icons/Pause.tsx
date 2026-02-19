import { SVGAssetProps } from './system/types';

const Pause = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect
      x="5.75"
      y="3.75"
      width="3.5"
      height="16.5"
      rx="1.25"
      stroke="white"
      strokeWidth="1.5"
    />
    <rect
      x="14.75"
      y="3.75"
      width="3.5"
      height="16.5"
      rx="1.25"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

export default Pause;
