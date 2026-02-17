import { SVGAssetProps } from './system/types';

const Email = (props: SVGAssetProps) => (
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
      d="m6.998 10 3.083 2.376a3.001 3.001 0 0 0 3.602.047L17.003 10"
    />
    <rect
      width={18.008}
      height={17.007}
      x={2.996}
      y={3.497}
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      rx={5}
    />
  </svg>
);

export default Email;
