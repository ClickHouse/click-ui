import { SVGAttributes } from "react";
import UnitedStates from "./UnitedStates";
import UnitedKingdom from "./UnitedKingdom";
import EuropeanUnion from "./EuropeanUnion";
import Germany from "./Germany";
import Singapore from "./Singapore";
import Ireland from "./Ireland";
import India from "./India";
import Netherlands from "./Netherlands";
import Australia from "./Australia";
import SouthAfrica from "./SouthAfrica";
import Brazil from "./Brazil";
import Canada from "./Canada";
import { IconSize } from "@/components/Icon/types";
import { IconSvgElement } from "@/components/commonElement";

export type FlagName =
  | "usa"
  | "de"
  | "sg"
  | "uk"
  | "ie"
  | "eu"
  | "in"
  | "nl"
  | "au"
  | "br"
  | "ca"
  | "za";
export interface FlagProps extends Omit<SVGAttributes<SVGElement>, "size"> {
  name: FlagName;
  size?: IconSize;
}

export const FlagList = {
  usa: UnitedStates,
  de: Germany,
  sg: Singapore,
  uk: UnitedKingdom,
  ie: Ireland,
  eu: EuropeanUnion,
  in: India,
  nl: Netherlands,
  au: Australia,
  br: Brazil,
  ca: Canada,
  za: SouthAfrica,
};

const Flags = ({ name, size, ...props }: FlagProps) => {
  const Component = FlagList[name];
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

export default Flags;
