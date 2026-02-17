import { SVGAssetProps } from './system/types';

const Enter = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M18 4V15.1389C18 15.4764 17.7264 15.75 17.3889 15.75H7M7 15.75L10.6667 11.9306M7 15.75L10.6667 19.7222"
      stroke="#161517"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

export default Enter;
