import { SVGAssetProps } from './system/types';

const Play = (props: SVGAssetProps) => (
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
      d="M8.15482 3.30857L18.9737 10.0927C19.6098 10.4914 20 11.2166 20 12C20 12.7834 19.6098 13.5086 18.9737 13.9073L8.15482 20.6914C7.50841 21.0966 6.70669 21.1032 6.05448 20.7086C5.40227 20.314 4.99976 19.5788 5 18.7827V5.21734C4.99976 4.42118 5.40227 3.68604 6.05448 3.29143C6.70669 2.89682 7.50841 2.90336 8.15482 3.30857V3.30857Z"
      stroke="#161517"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Play;
