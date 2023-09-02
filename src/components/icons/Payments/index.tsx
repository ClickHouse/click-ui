import { SVGAttributes } from "react";
import Visa from "./Visa";
import MasterCard from "./MasterCard";
import Amex from "./Amex";
import Paypal from "./Paypal";
import { IconSize } from "@/components/Icon/types";
import { IconSvgElement } from "@/components/commonElement";

export type PaymentName = "visa" | "mastercard" | "amex" | "paypal";

export const PaymentList = {
  visa: Visa,
  mastercard: MasterCard,
  amex: Amex,
  paypal: Paypal,
};

export interface PaymentProps extends SVGAttributes<SVGElement> {
  name: PaymentName;
  size?: IconSize;
}

const Payments = ({ name, size, ...props }: PaymentProps) => {
  const Component = PaymentList[name];
  if (Component === undefined) {
    return;
  }
  return (
    <IconSvgElement
      as={Component}
      $size={size}
      {...props}
    />
  );
};

export default Payments;
