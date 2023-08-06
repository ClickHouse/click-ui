import React from "react";
import Visa from "./Visa";
import MasterCard from "./MasterCard";
import Amex from "./Amex";
import Paypal from "./Paypal";

interface Props extends React.SVGAttributes<SVGElement> {
  name: string;
}

const Payments = ({ name, ...props }: Props) => {
  switch (name) {
    case "visa":
      return <Visa {...props} />;

    case "mastercard":
      return <MasterCard {...props} />;

    case "amex":
      return <Amex {...props} />;

    case "paypal":
      return <Paypal {...props} />;

    default:
      return null;
  }
};

export default Payments;
