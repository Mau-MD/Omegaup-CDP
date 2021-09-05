import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { caseIdentifier } from "../../../../redux/models/inputModel";
import { useStoreActions } from "../../../../redux/store";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  caseIdentifier: caseIdentifier;
}
const DeleteLinesModal = (props: PropTypes) => {
  const { isOpen, onClose, caseIdentifier } = props;
  const deleteAllLines = useStoreActions(
    (actions) => actions.input.removeAllLines
  );

  function handleDeleteAllLines() {
    deleteAllLines(caseIdentifier);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Borrar todas las Líneas </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          ¿Estás seguro que deseas borrar todas las líneas? Todo el contenido
          dentro de estas será borrado. Esta acción no se puede deshacer.
        </ModalBody>
        <ModalFooter>
          <Button variant={"ghost"} mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button
            colorScheme="red"
            type={"submit"}
            onClick={() => handleDeleteAllLines()}
          >
            Borrar Líneas
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteLinesModal;
