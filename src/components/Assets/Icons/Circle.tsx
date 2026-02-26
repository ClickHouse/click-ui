import { SVGAssetProps } from './system/types';

const Circle = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 20.6284V20.6284C7.029 20.6284 3 16.5994 3 11.6284V11.6284C3 6.65742 7.029 2.62842 12 2.62842V2.62842C16.971 2.62842 21 6.65742 21 11.6284V11.6284C21 16.5994 16.971 20.6284 12 20.6284Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Circle;
