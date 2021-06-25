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
} from "@chakra-ui/react";

const Navbar = () => {
  const selectedCase = useStoreState((state) => state.selected.selected);

  return (
    <HStack h={"20%"} w={"100%"} pl={5}>
      <Text fontWeight={"bold"} fontSize={20}>
        {selectedCase?.caseName}
      </Text>
      <h2> {selectedCase?.groupName}</h2>
      <Spacer />
      <Button size={"sm"}> Editar Caso </Button>
      <Button size={"sm"}> Eliminar Caso </Button>
    </HStack>
  );
};

export default Navbar;
