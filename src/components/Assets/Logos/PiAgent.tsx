import type { SVGAssetProps } from '@/types';

const PiAgent = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    fill="none"
    viewBox="0 0 28 28"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 0H21V14H14V21H7V28H0V0ZM7 7V14H14V7H7Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M21 14H28V28H21V14Z"
    />
  </svg>
);

export default PiAgent;
