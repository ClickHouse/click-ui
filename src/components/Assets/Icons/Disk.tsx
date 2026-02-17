import { SVGAssetProps } from './system/types';

const Disk = (props: SVGAssetProps) => (
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
      d="M16.164 3H5.007a2 2 0 0 0-2 2.015l.104 14a2 2 0 0 0 2 1.985h13.88a2 2 0 0 0 2-2V7.828a2 2 0 0 0-.585-1.414l-2.828-2.828A1.999 1.999 0 0 0 16.164 3Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.993 3v3.909a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3M7 21v-7.714C7 12.576 7.576 12 8.286 12h7.429c.709 0 1.285.576 1.285 1.286V21"
    />
  </svg>
);

export default Disk;
