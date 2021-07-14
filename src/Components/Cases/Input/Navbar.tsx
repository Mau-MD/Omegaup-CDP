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

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedCase = useStoreState((state) => state.cases.selected);

  return (
    <Box mb={2}>
      <HStack h={"20%"} w={"100%"} pl={5}>
        <Text fontWeight={"bold"} fontSize={20}>
          {selectedCase?.name}
        </Text>
        <h2> {selectedCase?.group}</h2>
        <Spacer />
        <Button size={"sm"} onClick={onOpen}>
          Editar Caso
        </Button>
        <Button size={"sm"}> Eliminar Caso </Button>
      </HStack>
    </Box>
  );
};

export default Navbar;
