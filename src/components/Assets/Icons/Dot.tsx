import { SVGAssetProps } from './system/types';

const Dot = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="4.5"
      fill="white"
    />
  </svg>
);

export default Dot;
