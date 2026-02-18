import { SVGAssetProps } from './system/types';

const Upload = (props: SVGAssetProps) => (
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
      d="M12 19.813v-7M9.833 14.813 12 12.645l2.167 2.168"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 19.813h2.56c1.928 0 3.5-1.572 3.5-3.5s-1.572-3.5-3.5-3.5h-.435v-1c0-3.31-2.69-6-6-6-2.977 0-5.445 2.178-5.913 5.022-2.377.121-4.272 2.07-4.272 4.477a4.5 4.5 0 0 0 4.5 4.5H8"
    />
  </svg>
);

export default Upload;
