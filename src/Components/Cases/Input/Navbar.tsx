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

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedCase = useStoreState((state) => state.cases.selected);
  const groupData = useStoreState((state) => state.cases.data);

  const [selectedCaseData, setSelectedCaseData] = useState<ICase>({
    name: "None",
    caseId: "None",
    groupId: "None",
    points: 0,
    defined: false,
  });

  const selectedGroupNameRef = useRef("");

  useEffect(() => {
    groupData.forEach((groupElement) => {
      if (groupElement.groupId === selectedCase.groupId) {
        selectedGroupNameRef.current = groupElement.name;
        groupElement.cases.forEach((caseElement) => {
          if (caseElement.caseId === selectedCase.caseId) {
            setSelectedCaseData(caseElement);
          }
        });
      }
    });
  }, [selectedCase]);

  return (
    <Box mb={2}>
      <HStack h={"20%"} w={"100%"} pl={5}>
        <Text fontWeight={"bold"} fontSize={20}>
          {selectedCaseData.name}
        </Text>
        <h2> {selectedGroupNameRef.current}</h2>
        <Spacer />
        <Button size={"sm"} onClick={onOpen}>
          Editar Caso
        </Button>
        <Button size={"sm"}> Eliminar Caso </Button>
      </HStack>
      <EditCase isOpen={isOpen} onClose={onClose} {...selectedCaseData} />
    </Box>
  );
};

export default Navbar;
