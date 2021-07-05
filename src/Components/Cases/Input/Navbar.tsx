import * as React from "react";
import { useStoreState } from "../../../Redux/Store";
import {
  Divider,
  HStack,
  Text,
  Spacer,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedCase = useStoreState((state) => state.cases.selected);

  return (
    <HStack h={"20%"} w={"100%"} pl={5}>
      <Text fontWeight={"bold"} fontSize={20}>
        {selectedCase?.name}
      </Text>
      <h2> {selectedCase?.group}</h2>
      <Spacer />
      <Button size={"sm"} onClick={onOpen}>
        {" "}
        Editar Caso{" "}
      </Button>
      <Button size={"sm"}> Eliminar Caso </Button>
    </HStack>
  );
};

export default Navbar;
