import * as React from "react";
import { useStoreState } from "../../Redux/Store";
import { Box } from "@chakra-ui/react";
import CasesGroupItem from "./CasesGroupItem";

const CasesNavigation = () => {
  const caseState = useStoreState((state) => state.cases.cases);

  return (
    <Box mt={2}>
      {caseState.map((group) => (
        <CasesGroupItem
          name={group.name}
          points={group.points}
          arePointsDefined={group.pointsDefined}
        />
      ))}
    </Box>
  );
};

export default CasesNavigation;
