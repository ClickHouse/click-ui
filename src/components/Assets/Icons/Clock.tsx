import { SVGAssetProps } from './system/types';

const Clock = (props: SVGAssetProps) => (
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
      d="M12 21c4.95 0 9-4.05 9-9s-4.05-9-9-9M12 21c-2.93 0-5.538-1.426-7.184-3.612"
    />
    <path
      stroke="#161517"
      strokeDasharray={0}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.816 17.388A8.931 8.931 0 0 1 3 12c0-4.95 4.05-9 9-9"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.36 15.639 4.921-2.936V6.375"
    />
  </svg>
);

export default Clock;
