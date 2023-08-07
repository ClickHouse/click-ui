import React from "react";
import UnitedStates from "./UnitedStates";
import UnitedKingdom from "./UnitedKingdom";
import EuropeanUnion from "./EuropeanUnion";
import Germany from "./Germany";
import Singapore from "./Singapore";
import Ireland from "./Ireland";
import India from "./India";
import Netherlands from "./Netherlands";

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

    default:
      return null;
  }
};

export default Flags;
