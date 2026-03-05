import { SVGAssetProps } from './system/types';

const Sort = (props: SVGAssetProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#161517"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m16 9-4-4-4 4M8 15l4 4 4-4"
      />
    </svg>
  );
};

export default Sort;
