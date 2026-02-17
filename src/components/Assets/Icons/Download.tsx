import { SVGAssetProps } from './system/types';

const Download = (props: SVGAssetProps) => (
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
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 6H4.538C3.689 6 3 6.689 3 7.538V19.23C3 20.08 3.689 20.768 4.538 20.768H19.461C20.311 20.768 20.999 20.079 20.999 19.23V7.538C21 6.689 20.311 6 19.462 6H17"
    />
    <path
      stroke="#161517"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10L12 13L9 10"
    />
    <path
      stroke="#161517"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3V13"
    />
    <path
      stroke="#161517"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 16H16"
    />
  </svg>
);

export default Download;
