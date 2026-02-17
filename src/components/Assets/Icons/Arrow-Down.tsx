import { SVGAssetProps } from './system/types';

const Arrow_Down = (props: SVGAssetProps) => (
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
      strokeWidth={1.5}
      d="M12.02 4.48v14.99M18.012 13.483 12 19.52l-6.012-6.037"
    />
  </svg>
);

export default Arrow_Down;
