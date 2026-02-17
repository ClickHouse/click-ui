import { SVGAssetProps } from './system/types';

const Globe = (props: SVGAssetProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C14.2512 18.5355 15.5305 15.3372 15.6 12C15.5305 8.66283 14.2512 5.46452 12 3M12 21C9.74885 18.5355 8.46952 15.3372 8.4 12C8.46952 8.66283 9.74885 5.46452 12 3M3 12C3 7.02944 7.02944 3 12 3"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Globe;
