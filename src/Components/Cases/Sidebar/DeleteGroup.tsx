import * as React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useStoreActions } from "../../../Redux/Store";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
}

const DeleteGroup = ({ isOpen, onClose, groupName }: PropTypes) => {
  const toast = useToast();

  function removeCase() {
    toast({
      title: "Grupo borrado",
      description: "El grupo ha sido borrado exitosamente",
      status: "success",
      isClosable: true,
    });

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Borar Grupo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          ¿Estás seguro que deseas borrar este grupo? Este cambio no se puede
          deshacer
        </ModalBody>
        <ModalFooter>
          <Button variant={"ghost"} mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button
            colorScheme="red"
            type={"submit"}
            onClick={() => removeCase()}
          >
            Borrar Grupo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteGroup;
