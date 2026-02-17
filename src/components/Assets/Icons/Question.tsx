import { SVGAssetProps } from './system/types';

const Question = (props: SVGAssetProps) => (
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
      d="M12 21v0a9 9 0 0 1-9-9v0a9 9 0 0 1 9-9v0a9 9 0 0 1 9 9v0a9 9 0 0 1-9 9Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 13.25V13c0-.817.505-1.26 1.011-1.6.494-.333.989-.767.989-1.567a2 2 0 1 0-4 0M11.999 16a.25.25 0 1 0 .002.5A.25.25 0 0 0 12 16"
    />
  </svg>
);

export default Question;
