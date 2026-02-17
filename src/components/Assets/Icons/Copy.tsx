import { SVGAssetProps } from './system/types';

const Copy = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect
      width={14.006}
      height={14.006}
      x={6.998}
      y={6.998}
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      rx={2}
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.998 17.002H4.997a2 2 0 0 1-2-2V4.997a2 2 0 0 1 2-2H15a2 2 0 0 1 2 2v2.001"
    />
  </svg>
);

export default Copy;
