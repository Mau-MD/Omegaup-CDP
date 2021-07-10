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
import AddCaseModal from "./AddCaseModal";

const Navigation = () => {
  const caseState = useStoreState((state) => state.cases.data);

  return (
    <>
      <Box mt={2}>
        {caseState.map((group) => (
          <GroupItem
            name={group.name}
            points={group.points}
            arePointsDefined={group.defined}
            cases={group.cases}
            key={group.name}
          />
        ))}
      </Box>
    </>
  );
};

export default Navigation;
