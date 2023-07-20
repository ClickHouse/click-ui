import { SVGAttributes } from "react";

const MasterCard = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={22}
    viewBox="0 0 30 22"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <g clipPath="url(#b)">
        <path
          fill="#36495D"
          d="M27.217 21.262H2.779A2.78 2.78 0 0 1 0 18.482V2.919A2.78 2.78 0 0 1 2.78.138h24.437a2.78 2.78 0 0 1 2.78 2.78v15.565a2.78 2.78 0 0 1-2.78 2.779Z"
        />
        <path
          fill="#F16522"
          d="M17.517 6.172h-5.04v9.056h5.04V6.172Z"
        />
        <path
          fill="#E41B24"
          d="M12.798 10.7a5.75 5.75 0 0 1 2.2-4.528 5.76 5.76 0 1 0 0 9.056 5.75 5.75 0 0 1-2.2-4.528Z"
        />
        <path
          fill="#F89E1C"
          d="M24.136 14.269v-.223h-.058l-.067.153-.067-.153h-.059v.223h.041V14.1l.063.146h.043l.063-.146v.169h.041Zm-.37 0v-.185h.075v-.038h-.19v.038h.075v.185h.04Zm.55-3.569a5.759 5.759 0 0 1-9.318 4.528 5.749 5.749 0 0 0 2.2-4.528 5.75 5.75 0 0 0-2.2-4.528 5.759 5.759 0 0 1 9.318 4.528Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 .138h30v21.138H0z"
        />
      </clipPath>
      <clipPath id="b">
        <path
          fill="#fff"
          d="M0 .138h30v21.138H0z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default MasterCard;
