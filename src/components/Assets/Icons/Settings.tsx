import { SVGAssetProps } from './system/types';

const Settings = (props: SVGAssetProps) => (
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
      d="M18 5h3M3 5h11M10 12h11M3 12h3M18 19h3M3 19h11M17.414 3.586a2 2 0 1 1-2.828 2.828 2 2 0 0 1 2.828-2.828M9.414 10.586a2 2 0 1 1-2.828 2.828 2 2 0 0 1 2.828-2.828M17.414 17.586a2 2 0 1 1-2.828 2.828 2 2 0 0 1 2.828-2.828"
    />
  </svg>
);

export default Settings;
