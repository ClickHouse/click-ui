import { SVGAssetProps } from './system/types';

const Payment = (props: SVGAssetProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="#161517"
      d="M20.467 18.666H3.533A1.509 1.509 0 0 1 2 17.133V6.866C2 6 2.667 5.333 3.533 5.333h16.934C21.333 5.333 22 6 22 6.866v10.267c0 .867-.667 1.533-1.533 1.533Zm-16.934-12c-.133 0-.2.067-.2.2v10.267c0 .133.067.2.2.2h16.934c.133 0 .2-.067.2-.2V6.866c0-.133-.067-.2-.2-.2H3.533Z"
    />
    <path
      fill="#161517"
      d="M2.666 9.2h18.667v2.666H2.666V9.2Z"
    />
  </svg>
);

export default Payment;
