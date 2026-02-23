import { SVGAssetProps } from './system/types';

const Metrics = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle
      cx={19.503}
      cy={4.497}
      r={2.501}
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m16.002 10-2.72 3.626L9.999 11l-3.001 4.002"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.004 10v7.002a4.002 4.002 0 0 1-4.002 4.002H6.998a4.002 4.002 0 0 1-4.002-4.002V6.998a4.002 4.002 0 0 1 4.002-4.001H14"
    />
  </svg>
);

export default Metrics;
