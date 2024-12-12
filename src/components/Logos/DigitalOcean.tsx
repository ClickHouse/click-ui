import { SVGAttributes } from "react";

const DigitalOcean = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#clip0_10220_29310)">
      <path
        d="M32.0036 61V49.7625C43.9081 49.7625 53.1483 37.9813 48.5771 25.4424C47.7373 23.1414 46.4046 21.0518 44.6722 19.3201C42.9399 17.5884 40.8499 16.2564 38.5486 15.4174C26.0206 10.8826 14.2158 20.0846 14.2158 31.9837H3C3 13.0195 21.3498 -1.76868 41.2438 4.44276C49.9438 7.17057 56.8639 14.0726 59.5591 22.749C65.7759 42.6684 51.0095 61.0054 32.0036 61.0054V61Z"
        fill="#0080FF"
      />
      <path
        d="M20.853 49.7937V38.6196H32.0325V49.7937H20.853ZM12.2382 58.4031V49.7937H20.853V58.4031H12.2382ZM12.2382 49.7937H5.03711V42.5981H12.2382V49.7937Z"
        fill="#0080FF"
      />
    </g>
    <defs>
      <clipPath id="clip0_10220_29310">
        <rect
          width="58"
          height="58"
          fill="white"
          transform="translate(3 3)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default DigitalOcean;
