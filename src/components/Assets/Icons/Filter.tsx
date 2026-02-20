import { SVGAssetProps } from './system/types';

const Filter = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 13.5L19.707 8.293C19.895 8.105 20 7.851 20 7.586V5C20 4.448 19.552 4 19 4H5C4.448 4 4 4.448 4 5V7.586C4 7.851 4.105 8.106 4.293 8.293L9.5 13.5"
        stroke="#161517"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 13.5V19.749C9.5 20.562 10.264 21.159 11.053 20.962L13.553 20.337C14.109 20.198 14.5 19.698 14.5 19.124V13.5"
        stroke="#161517"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </svg>
);

export default Filter;
