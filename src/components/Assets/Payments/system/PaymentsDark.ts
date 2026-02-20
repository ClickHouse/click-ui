/*
 ** WARNING: Auto-generated file!
 ** Do NOT modify it, your changes will be lost!
 ** If you find need to modify manually,
 ** report the issue immediately.
 */

import Amex from '../Amex';
import MasterCard from '../MasterCard';
import Paypal from '../Paypal';
import Visa from '../Visa';
import { PaymentName } from './types';
import type { SVGAssetProps } from '../../types';
import type { ComponentType } from 'react';

const PaymentsDark: Record<PaymentName, ComponentType<SVGAssetProps>> = {
  amex: Amex,
  mastercard: MasterCard,
  paypal: Paypal,
  visa: Visa,
};

export default PaymentsDark;
