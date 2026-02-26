import { SVGAssetProps } from './system/types';

const Display = (props: SVGAssetProps) => (
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
      d="M20.003 16.002H3.997a1 1 0 0 1-1-1V4.996a1 1 0 0 1 1-1h16.006a1 1 0 0 1 1 1v10.004a1 1 0 0 1-1 1Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 16.002v5.002M12 7.998V12M7.998 8.999v3M16.001 9.999v2M8.999 21.004h6.002M12 3.904v-.908"
    />
  </svg>
);

export default Display;
