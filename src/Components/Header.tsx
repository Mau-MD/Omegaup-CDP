import * as React from "react";
import {
  Box,
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import { useStoreActions, useStoreState } from "../Redux/Store";

const Header = () => {
  const titleText = useStoreState((state) => state.title.titleName);
  const setTitleText = useStoreActions((actions) => actions.title.setTitleName);

  const [isEditTitleActive, setIsEditTitleActive] = useState(false);

  function handleTitleSubmit(value: string) {
    setIsEditTitleActive(false);
    setTitleText(value);
    console.log(value);
  }

  return (
    <Container maxW={"container.lg"}>
      <Box mt={"5"}>
        <HStack>
          <Editable
            defaultValue={titleText}
            fontSize={"xl"}
            fontWeight={"bold"}
            placeholder={"Escribe el nombre del problema"}
            onEdit={() => setIsEditTitleActive(true)}
            onSubmit={(event) => handleTitleSubmit(event)}
            onCancel={() => setIsEditTitleActive(false)}
            width={isEditTitleActive ? "50%" : undefined}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <span>
            <AiFillEdit />
          </span>
          <Spacer />
          <Button size={"sm"}> Cargar Problema </Button>
          <Button size={"sm"} colorScheme={"blue"}>
            Subir Problema
          </Button>
        </HStack>
      </Box>
    </Container>
  );
};

export default Header;
