import { SVGAssetProps } from './system/types';

const History = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 4.997H4.997M12 4.997A8.003 8.003 0 1 1 3.997 13M7.998 1.996l-3 3.001M7.998 7.998l-3-3"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.001 13.75h-3.81V9.834"
    />
  </svg>
);
export default History;
