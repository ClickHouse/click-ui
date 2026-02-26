import { SVGAssetProps } from './system/types';

const Secure = (props: SVGAssetProps) => (
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
      d="M15.319 10.342 11.17 14.49 8.68 12"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.1 5.921a11.268 11.268 0 0 1-6.463-2.688.989.989 0 0 0-1.274 0A11.275 11.275 0 0 1 4.9 5.921a.988.988 0 0 0-.9.991v4.33c0 4.367 3.156 8.462 7.478 9.685.339.096.706.096 1.045 0C16.844 19.703 20 15.61 20 11.243v-4.33a.988.988 0 0 0-.9-.992Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Secure;
