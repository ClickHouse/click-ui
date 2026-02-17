import { SVGAssetProps } from './system/types';

const Hexagon = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M10.875 3.64952C11.5712 3.2476 12.4288 3.2476 13.125 3.64952L18.6692 6.85048C19.3654 7.2524 19.7942 7.99519 19.7942 8.79904V15.201C19.7942 16.0048 19.3654 16.7476 18.6692 17.1495L13.125 20.3505C12.4288 20.7524 11.5712 20.7524 10.875 20.3505L5.33077 17.1495C4.63462 16.7476 4.20577 16.0048 4.20577 15.201V8.79904C4.20577 7.99519 4.63462 7.2524 5.33077 6.85048L10.875 3.64952Z"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

export default Hexagon;
