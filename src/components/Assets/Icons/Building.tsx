import { SVGAssetProps } from './system/types';

const Building = (props: SVGAssetProps) => (
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
      d="M3.997 3.997H14a1 1 0 0 1 1 1v15.006H3.997a1 1 0 0 1-1-1V4.997a1 1 0 0 1 1-1ZM15.001 7.999h5.002a1 1 0 0 1 1 1v10.004a1 1 0 0 1-1 1h-5.002V8Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.998 7.873a.125.125 0 1 0 0 .25.125.125 0 0 0 0-.25M11 7.873a.125.125 0 1 0 0 .25.125.125 0 0 0 0-.25M6.998 11.875a.125.125 0 1 0 0 .25.125.125 0 0 0 0-.25M11 11.875a.125.125 0 1 0 0 .25.125.125 0 0 0 0-.25M6.998 15.877a.125.125 0 1 0 0 .25.125.125 0 0 0 0-.25M11 15.877a.125.125 0 1 0 0 .25.125.125 0 0 0 0-.25M18.002 11.875a.125.125 0 1 0 0 .25.125.125 0 0 0 0-.25M18.002 15.877a.125.125 0 1 0 0 .25.125.125 0 0 0 0-.25"
    />
  </svg>
);

export default Building;
