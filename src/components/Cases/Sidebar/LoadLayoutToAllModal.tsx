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
} from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const LoadLayoutToAllModal = (props: PropTypes) => {
  const { isOpen, onClose } = props;

  const loadLayoutToAll = useStoreActions(
    (actions) => actions.input.setLayoutToAll
  );

  function handleLoadLayout() {
    loadLayoutToAll();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cargar Layout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Esta operación cargará el layout definido a TODOS los casos,
          sobreescribiendo la información que tengan. ¿Estás seguro que deseas
          realizar la operación? No se puede deshacer
        </ModalBody>
        <ModalFooter>
          <Button variant={"ghost"} mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button
            colorScheme="blue"
            type={"submit"}
            onClick={() => handleLoadLayout()}
          >
            Cargar Layout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoadLayoutToAllModal;
