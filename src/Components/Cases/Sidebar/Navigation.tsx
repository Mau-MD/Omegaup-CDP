import * as React from "react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import {
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import GroupItem from "./GroupItem";

const Navigation = () => {
  const caseState = useStoreState((state) => state.cases.data);

  return (
    <>
      <Box mt={2}>
        {caseState.map((group) => (
          <GroupItem {...group} key={group.groupId} />
        ))}
      </Box>
    </>
  );
};

export default Navigation;
