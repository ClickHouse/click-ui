import { SVGAssetProps } from './system/types';

const Folder_Closed = (props: SVGAssetProps) => (
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
      strokeWidth={1.5}
      d="M19 19H3C2.44772 19 2 18.5523 2 18V6C2 5.44772 2.44772 5 3 5H6.62869C6.98835 5 7.32032 5.19315 7.49805 5.50583L8.34405 6.99417C8.52179 7.30685 8.85375 7.5 9.21342 7.5H19C19.5523 7.5 20 7.94772 20 8.5V9.5V18C20 18.5523 19.5523 19 19 19Z"
    />
  </svg>
);

export default Folder_Closed;
