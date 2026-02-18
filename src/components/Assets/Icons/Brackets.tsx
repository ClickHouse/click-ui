import { SVGAssetProps } from './system/types';

const Brackets = (props: SVGAssetProps) => (
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
      d="M18.574 20.003a2.287 2.287 0 0 0 2.287-2.287v-4.573L22.005 12l-1.144-1.144V6.284a2.286 2.286 0 0 0-2.287-2.287M5.427 3.997A2.286 2.286 0 0 0 3.14 6.284v4.572L1.996 12l1.144 1.143v4.573a2.286 2.286 0 0 0 2.287 2.287M9.285 12.533l1.833 1.833 4-4.002"
    />
  </svg>
);

export default Brackets;
