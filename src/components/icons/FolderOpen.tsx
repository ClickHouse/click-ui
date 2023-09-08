import { SVGAttributes } from "react";

const FolderOpen = (props: SVGAttributes<SVGElement>) => (
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
      strokeLinejoin="round"
      d="M2 6V18.5C2 19.0523 2.44772 19.5 3 19.5H19C19.5523 19.5 20 19.0523 20 18.5V17.6732C20 17.5586 20.0197 17.4448 20.0583 17.3369L22.0227 11.8363C22.2553 11.1851 21.7725 10.5 21.081 10.5H21C20.4477 10.5 20 10.0523 20 9.5V8.5C20 7.94772 19.5523 7.5 19 7.5H9.17703C8.76813 7.5 8.40042 7.25105 8.24856 6.87139L7.75144 5.62861C7.59958 5.24895 7.23187 5 6.82297 5H3C2.44772 5 2 5.44771 2 6Z"
    />

    <path
      stroke="#161517"
      strokeWidth={1.5}
      strokeLinejoin="round"
      d="M2 19.5L8.20063 10.9145C8.38864 10.6542 8.69021 10.5 9.01131 10.5H21"
    />
  </svg>
);

export default FolderOpen;
