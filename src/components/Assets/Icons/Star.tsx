import { SVGAssetProps } from './system/types';

const Star = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.896L14.935 8.889L21.5 9.856L16.75 14.518L17.871 21.104L12 17.993L6.129 21.104L7.25 14.518L2.5 9.856L9.064 8.889L12 2.896Z"
      stroke="#161517"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Star;
