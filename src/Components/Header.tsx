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
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialog,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../Redux/Store";

const Header = () => {
  const titleText = useStoreState((state) => state.title.titleName);
  const setTitleText = useStoreActions((actions) => actions.title.setTitleName);

  const [isEditTitleActive, setIsEditTitleActive] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  function handleTitleSubmit(value: string) {
    setIsEditTitleActive(false);
    setTitleText(value);
  }

  function createNewProblem() {
    sessionStorage.clear();
    window.location.reload();
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
            Guardar Problema
          </Button>
          <Button size={"sm"} colorScheme={"orange"} onClick={onOpen}>
            Nuevo Problema
          </Button>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Crear nuevo problema</AlertDialogHeader>
              <AlertDialogBody>
                ¿Deseas crear un nuevo problema? Se borrará TODO el problema
                anterior. Guarda el problema primero antes de crear uno nuevo.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={() => createNewProblem()}
                >
                  Sí
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </HStack>
      </Box>
    </Container>
  );
};

export default Header;