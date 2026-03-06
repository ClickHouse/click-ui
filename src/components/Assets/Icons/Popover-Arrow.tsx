import { SVGAssetProps } from './system/types';

const Popover_Arrow = (props: SVGAssetProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="10"
      viewBox="0 0 30 10"
      fill="none"
      {...props}
    >
      <path
        d="M0 -1L15 9L30 -1"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Popover_Arrow;
