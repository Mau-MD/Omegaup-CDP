import * as React from "react";
import { useStoreState } from "../../../redux/store";
import { Box } from "@chakra-ui/react";
import Group from "./Group";

const Groups = () => {
  const caseState = useStoreState((state) => state.cases.data);

  return (
    <Box mt={2} mb={10}>
      {caseState.map((group) => (
        <Group {...group} key={group.groupId} />
      ))}
    </Box>
  );
};

export default Groups;
