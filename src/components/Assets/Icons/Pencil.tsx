import { SVGAssetProps } from './system/types';

const Pencil = (props: SVGAssetProps) => (
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
      d="m17.54 10.12-3.66-3.66"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.251 21H3v-3.251c0-.265.105-.52.293-.707L16.627 3.707a.999.999 0 0 1 1.414 0l2.251 2.25a.999.999 0 0 1 0 1.415L6.958 20.707a.997.997 0 0 1-.707.293v0Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Pencil;
