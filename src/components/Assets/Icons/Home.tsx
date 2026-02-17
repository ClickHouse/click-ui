import { SVGAssetProps } from './system/types';

const Home = (props: SVGAssetProps) => (
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
      d="M4 8.6V21h16V8.6"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m2 10 10-7 10 7M15 21v-6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6"
    />
  </svg>
);

export default Home;
