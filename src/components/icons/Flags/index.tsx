import React from "react";
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

interface Props extends React.SVGAttributes<SVGElement> {
  name: string;
}

const Flags = ({ name, ...props }: Props) => {
  switch (name) {
    case "usa":
      return <UnitedStates {...props} />;

    case "de":
      return <Germany {...props} />;

    case "sg":
      return <Singapore {...props} />;

    case "uk":
      return <UnitedKingdom {...props} />;

    case "ie":
      return <Ireland {...props} />;

    case "eu":
      return <EuropeanUnion {...props} />;

    case "in":
      return <India {...props} />;

    case "nl":
      return <Netherlands {...props} />;

    case "au":
      return <Australia {...props} />;

    case "br":
      return <Brazil {...props} />;

    case "ca":
      return <Canada {...props} />;

    case "za":
      return <SouthAfrica {...props} />;

    default:
      return null;
  }
};

export default Flags;
