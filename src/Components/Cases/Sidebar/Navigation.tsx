import * as React from "react";
import { useStoreState } from "../../../Redux/Store";
import { Box } from "@chakra-ui/react";
import GroupItem from "./GroupItem";

const Navigation = () => {
  const caseState = useStoreState((state) => state.cases.data);

  return (
    <Box mt={2}>
      {caseState.map((group) => (
        <GroupItem
          name={group.name}
          points={group.points}
          arePointsDefined={group.pointsDefined}
          key={group.name}
        />
      ))}
    </Box>
  );
};

export default Navigation;
