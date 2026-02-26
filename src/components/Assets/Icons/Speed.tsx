import { SVGAssetProps } from './system/types';

const Speed = (props: SVGAssetProps) => (
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
      d="M12.007 10.313A1.69 1.69 0 0 1 13.688 12v.008a1.689 1.689 0 1 1-1.681-1.695M10.807 13.194l-1.25 1.25M16.202 7.798 13.201 10.8"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.367 5.634A9.004 9.004 0 1 1 12 2.997v3"
    />
  </svg>
);

export default Speed;
