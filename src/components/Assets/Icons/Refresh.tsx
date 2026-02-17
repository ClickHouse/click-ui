import { SVGAssetProps } from './system/types';

const Refresh = (props: SVGAssetProps) => (
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
      d="M15.5 6H12C7.858 6 4.5 9.358 4.5 13.5C4.5 17.642 7.858 21 12 21C16.142 21 19.5 17.642 19.5 13.5C19.5 12.26 19.199 11.09 18.666 10.06"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.5 3L15.5 6L12.5 9"
    />
  </svg>
);

export default Refresh;
