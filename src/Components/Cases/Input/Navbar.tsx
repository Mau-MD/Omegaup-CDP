import * as React from "react";
import { useStoreState } from "../../../Redux/Store";
import {
  Divider,
  HStack,
  Text,
  Spacer,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import AddCaseModal from "../Sidebar/AddCaseModal";
import EditGroup from "../Sidebar/EditGroup";
import Line from "./Line";
import { useEffect, useRef, useState } from "react";
import { ICase } from "../../../Redux/Models/CasesModel";
import EditCase from "../Sidebar/EditCase";
import DeleteItem from "../Sidebar/DeleteItem";

const Navbar = () => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove,
  } = useDisclosure();

  const selectedCase = useStoreState((state) => state.cases.selected);
  const groupData = useStoreState((state) => state.cases.data);

  const emptyObject = {
    name: "None",
    caseId: "None",
    groupId: "None",
    points: 0,
    defined: false,
  };
  const [selectedCaseData, setSelectedCaseData] = useState<ICase>(emptyObject);

  const selectedGroupNameRef = useRef("");

  useEffect(() => {
    const groupState = groupData.find(
      (groupElement) => groupElement.groupId === selectedCase.groupId
    );
    selectedGroupNameRef.current = groupState ? groupState.name : "None";

    const caseState = groupState?.cases.find(
      (caseElement) => caseElement.caseId === selectedCase.caseId
    );

    if (caseState) {
      setSelectedCaseData(caseState);
    }
  }, [selectedCase]);

  return (
    <Box mb={2}>
      <HStack h={"20%"} w={"100%"} pl={5}>
        <Text fontWeight={"bold"} fontSize={20}>
          {selectedCaseData.name}
        </Text>
        <h2> {selectedGroupNameRef.current}</h2>
        <Spacer />
        <Button size={"sm"} onClick={onOpenEdit}>
          Editar Caso
        </Button>
        <Button size={"sm"} onClick={onOpenRemove}>
          {" "}
          Eliminar Caso{" "}
        </Button>
      </HStack>
      <EditCase
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        {...selectedCaseData}
      />
      <DeleteItem
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        groupId={selectedCase.groupId}
        caseId={selectedCase.caseId}
      />
    </Box>
  );
};

export default Navbar;
