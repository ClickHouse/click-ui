import { SVGAssetProps } from './system/types';

const Share_Arrow = (props: SVGAssetProps) => (
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
      d="M11.0866 8.95455C6.19852 9.5062 2.50353 13.6395 2.50098 18.5586V19.1708C4.62535 16.6117 7.76103 15.1074 11.0866 15.0521V18.2804C11.0867 18.7489 11.3544 19.176 11.7759 19.3803C12.1975 19.5846 12.6987 19.53 13.0664 19.2398L21.0597 12.9282C21.3435 12.7046 21.5091 12.3632 21.5091 12.0018C21.5091 11.6405 21.3435 11.2991 21.0597 11.0754L13.0664 4.76381C12.6987 4.47364 12.1975 4.41908 11.7759 4.62335C11.3544 4.82762 11.0867 5.25479 11.0866 5.72321V8.95455Z"
      stroke="#323232"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Share_Arrow;
