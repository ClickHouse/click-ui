import { SVGAssetProps } from './system/types';

const Arrow_Left = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M19.5195 12.02L4.52953 12.02"
      stroke="#161517"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5166 18.0122L4.4796 12.0002L10.5166 5.98821"
      stroke="#161517"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Arrow_Left;
