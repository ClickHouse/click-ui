import { SVGAssetProps } from './system/types';

const Briefcase = (props: SVGAssetProps) => (
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
      d="M19 20.5H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.174 7.5v-2a2 2 0 0 0-2-2H9.826a2 2 0 0 0-2 2v2M3 9.5l6.351 4.191c.327.216.71.331 1.102.331h3.094c.392 0 .775-.115 1.102-.331L21 9.5"
    />
  </svg>
);

export default Briefcase;
