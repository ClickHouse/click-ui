import { SVGAttributes } from "react";
import UnitedStates from "./UnitedStates";
import UnitedKingdom from "./UnitedKingdom";
import EuropeanUnion from "./EuropeanUnion";
import Germany from "./Germany";
import GreatBritain from "./GreatBritain";
import Singapore from "./Singapore";
import Ireland from "./Ireland";
import India from "./India";
import Japan from "./Japan";
import Netherlands from "./Netherlands";
import Australia from "./Australia";
import SouthAfrica from "./SouthAfrica";
import Brazil from "./Brazil";
import Canada from "./Canada";
import Sweden from "./Sweden";
import { IconSize } from "@/components/Icon/types";
import { SvgImageElement } from "@/components/commonElement";
import Switzerland from "@/components/icons/Flags/Switzerland.tsx";

export type FlagName =
  | "au"
  | "br"
  | "ca"
  | "ch"
  | "de"
  | "eu"
  | "gb"
  | "in"
  | "ie"
  | "jp"
  | "nl"
  | "sg"
  | "sw"
  | "usa"
  | "uk"
  | "za";

export interface FlagProps extends Omit<SVGAttributes<SVGElement>, "size"> {
  name: FlagName;
  size?: IconSize;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FlagList = {
  au: Australia,
  br: Brazil,
  ca: Canada,
  ch: Switzerland,
  de: Germany,
  eu: EuropeanUnion,
  gb: GreatBritain,
  ie: Ireland,
  in: India,
  jp: Japan,
  nl: Netherlands,
  sg: Singapore,
  za: SouthAfrica,
  sw: Sweden,
  uk: UnitedKingdom,
  usa: UnitedStates,
};

const Flags = ({ name, size, ...props }: FlagProps) => {
  const Component = FlagList[name];
  if (Component === undefined) {
    return;
  }
  return (
    <SvgImageElement
      as={Component}
      $size={size}
      {...props}
    />
  );
};

export default Flags;
