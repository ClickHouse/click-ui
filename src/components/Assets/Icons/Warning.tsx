import { SVGAssetProps } from './system/types';

const Warning = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 13.12V9.38M11.999 16.125a.25.25 0 1 0 .002.5.25.25 0 0 0-.002-.5"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.029 4.14 7.659 13.403c.89 1.558-.235 3.497-2.03 3.497H4.342c-1.795 0-2.92-1.939-2.03-3.497L9.972 4.14c.897-1.57 3.16-1.57 4.058 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Warning;
