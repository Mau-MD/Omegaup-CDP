import * as React from "react";
import { useStoreState } from "../../Redux/Store";
import { Box } from "@chakra-ui/react";
import CasesItem from "./CasesItem";

const CasesNavigation = () => {
  const caseState = useStoreState((state) => state.cases.cases);

  return (
    <Box mt={2} overflow={"hidden" + ""}>
      {caseState.map((group) => (
        <CasesItem
          name={group.name}
          points={group.points}
          arePointsDefined={group.pointsDefined}
        />
      ))}
    </Box>
  );
};

export default CasesNavigation;
