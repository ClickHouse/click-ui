import { SVGAssetProps } from './system/types';

const Fire = (props: SVGAssetProps) => (
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
      d="m6.198 7.56 3.483-4.063 3.755 4.38 2.43-2.834 1.936 2.26a8.01 8.01 0 0 1 1.928 5.212v.258a7.73 7.73 0 0 1-7.73 7.73v0a7.73 7.73 0 0 1-7.73-7.73v0A8.01 8.01 0 0 1 6.198 7.56Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Fire;
