import { SVGAttributes } from "react";

const Book = (props: SVGAttributes<SVGElement>) => (
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
      d="M12 16.37a6.368 6.368 0 0 0-7.495-1.12c-.684.364-1.509-.085-1.509-.86V5.295c0-.637.294-1.249.812-1.618A6.367 6.367 0 0 1 12 4.364a6.367 6.367 0 0 1 8.191-.687c.518.37.813.981.813 1.618v9.095c0 .775-.826 1.225-1.509.86A6.368 6.368 0 0 0 12 16.37Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.505 19.387A6.368 6.368 0 0 1 12 20.507a6.368 6.368 0 0 1 7.495-1.12M12 16.37V4.363"
    />
  </svg>
);

export default Book;
