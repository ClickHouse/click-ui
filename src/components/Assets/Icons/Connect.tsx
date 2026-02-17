import { SVGAssetProps } from './system/types';

const Connect = (props: SVGAssetProps) => (
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
      d="M21 8.072c-5.249-4.097-12.751-4.097-18 0M6.751 13.314c3.062-2.388 7.437-2.388 10.499 0M12 18.25a.372.372 0 0 0-.373.375.374.374 0 1 0 .748 0A.375.375 0 0 0 12 18.25"
    />
  </svg>
);

export default Connect;
