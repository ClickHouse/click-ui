import { SVGAssetProps } from './system/types';

const Chat = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M13 17h5a3 3 0 003-3V6a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3h2v4l5-4"
    ></path>
  </svg>
);

export default Chat;
