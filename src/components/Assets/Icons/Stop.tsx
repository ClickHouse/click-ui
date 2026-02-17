import { SVGAssetProps } from './system/types';

const Stop = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="path-1-inside-1_9731_929"
      fill="white"
    >
      <rect
        x="9"
        y="9"
        width="6"
        height="6"
        rx="0.4"
      />
    </mask>
    <rect
      x="9"
      y="9"
      width="6"
      height="6"
      rx="0.4"
      fill="white"
      stroke="white"
      strokeWidth="3"
      mask="url(#path-1-inside-1_9731_929)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3V3C16.971 3 21 7.029 21 12V12C21 16.971 16.971 21 12 21Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Stop;
