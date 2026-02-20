import { SVGAssetProps } from './system/types';

const Activity = (props: SVGAssetProps) => (
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
      d="M6 12h1.85l2.168 5 3.964-10 2.168 5H18"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.5 21.5h-11a4 4 0 0 1-4-4v-11a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Activity;
