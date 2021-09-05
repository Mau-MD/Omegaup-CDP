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
import { useStoreActions } from "../../../../redux/store";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  caseId: string;
}

const DeleteCase = (props: PropTypes) => {
  const { isOpen, onClose, groupId, caseId } = props;

  const toast = useToast();

  const removeCase = useStoreActions((actions) => actions.cases.removeCase);
  const selectCase = useStoreActions((actions) => actions.cases.setSelected);

  function deleteCase() {
    toast({
      title: "Caso borrado",
      description: "El caso ha sido borrado exitosamente",
      status: "success",
      isClosable: true,
    });

    removeCase({
      caseId: caseId,
      groupId: groupId,
    });
    selectCase({ caseId: "None", groupId: "None" });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Borrar Caso</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          ¿Estás seguro que deseas borrar este caso? Este cambio no se puede
          deshacer
        </ModalBody>
        <ModalFooter>
          <Button variant={"ghost"} mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button
            colorScheme="red"
            type={"submit"}
            onClick={() => deleteCase()}
          >
            Borrar Caso
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCase;
