import { SVGAttributes } from "react";
import UnitedStates from "./UnitedStates";
import UnitedKingdom from "./UnitedKingdom";
import UnitedArabEmirates from "./UnitedArabEmirates";
import EuropeanUnion from "./EuropeanUnion";
import Germany from "./Germany";
import GreatBritain from "./GreatBritain";
import Singapore from "./Singapore";
import Ireland from "./Ireland";
import Israel from "./Israel";
import India from "./India";
import Japan from "./Japan";
import Netherlands from "./Netherlands";
import Australia from "./Australia";
import SouthAfrica from "./SouthAfrica";
import SouthKorea from "./SouthKorea";
import Brazil from "./Brazil";
import Canada from "./Canada";
import Sweden from "./Sweden";
import { IconSize } from "@/components/Icon/types";
import { SvgImageElement } from "@/components/commonElement";
import Switzerland from "@/components/icons/Flags/Switzerland.tsx";

export type FlagName =
  | "ae"
  | "au"
  | "br"
  | "ca"
  | "ch"
  | "de"
  | "eu"
  | "gb"
  | "in"
  | "il"
  | "ie"
  | "jp"
  | "nl"
  | "sg"
  | "kr"
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
  ae: UnitedArabEmirates,
  au: Australia,
  br: Brazil,
  ca: Canada,
  ch: Switzerland,
  de: Germany,
  eu: EuropeanUnion,
  gb: GreatBritain,
  ie: Ireland,
  il: Israel,
  in: India,
  jp: Japan,
  nl: Netherlands,
  sg: Singapore,
  za: SouthAfrica,
  kr: SouthKorea,
  sw: Sweden,
  uk: UnitedKingdom,
  usa: UnitedStates,
};

const Flags = ({ name, size = "md", ...props }: FlagProps) => {
  const Component = FlagList[name];
  if (Component === undefined) {
    return;
  }
  return (
    <SvgImageElement size={size}>
      <Component {...props} />
    </SvgImageElement>
  );
};

export default Flags;
