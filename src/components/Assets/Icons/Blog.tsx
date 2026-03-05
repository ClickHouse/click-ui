import { SVGAssetProps } from './system/types';

const Blog = (props: SVGAssetProps) => (
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
      d="m9.332 10.318 2.142-2.157a3.084 3.084 0 0 1 4.377 0v0a3.097 3.097 0 0 1 0 4.364l-2.12 2.135c-.375.378-.885.59-1.416.59H8.75v-3.52c0-.53.209-1.037.582-1.412v0Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 7v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"
      clipRule="evenodd"
    />
    <path
      stroke="#161517"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m13.75 10.25-6 6"
    />
  </svg>
);

export default Blog;
