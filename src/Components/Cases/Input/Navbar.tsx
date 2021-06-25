import * as React from "react";
import { useStoreState } from "../../../Redux/Store";
import {
  Divider,
  HStack,
  Text,
  VStack,
  Flex,
  Spacer,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import AddCase from "../Sidebar/AddCase";
import EditCase from "./EditCase";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedCase = useStoreState((state) => state.selected.selected);

  return (
    <HStack h={"20%"} w={"100%"} pl={5}>
      <Text fontWeight={"bold"} fontSize={20}>
        {selectedCase?.caseName}
      </Text>
      <h2> {selectedCase?.groupName}</h2>
      <Spacer />
      <Button size={"sm"} onClick={onOpen}>
        {" "}
        Editar Caso{" "}
      </Button>
      <EditCase
        isOpen={isOpen}
        onClose={onClose}
        groupName={selectedCase ? selectedCase?.groupName : ""}
        caseName={selectedCase ? selectedCase?.caseName : ""}
        casePoints={1}
        pointsDefined={false}
      />
      <Button size={"sm"}> Eliminar Caso </Button>
    </HStack>
  );
};

export default Navbar;
