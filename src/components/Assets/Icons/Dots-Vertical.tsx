import { SVGAssetProps } from './system/types';

const Dots_Vertical = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle
      cx={12.5}
      cy={6.5}
      r={1.5}
      fill="#161517"
    />
    <circle
      cx={12.5}
      cy={12}
      r={1.5}
      fill="#161517"
    />
    <circle
      cx={12.5}
      cy={17.5}
      r={1.5}
      fill="#161517"
    />
  </svg>
);

export default Dots_Vertical;
