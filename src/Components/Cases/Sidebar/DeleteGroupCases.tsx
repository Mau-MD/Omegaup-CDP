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
  groupId: string;
  groupName: string;
}

const DeleteGroupCases = (props: PropTypes) => {
  const { isOpen, onClose, groupId, groupName } = props;

  const toast = useToast();

  const removeGroup = useStoreActions(
    (actions) => actions.cases.removeGroupCases
  );
  const setSelected = useStoreActions((actions) => actions.cases.setSelected);

  function deleteGroup() {
    toast({
      title: "Casos borrado",
      description: "Los casos del grupo han sido borrado exitosamente",
      status: "success",
      isClosable: true,
    });

    removeGroup(groupId);
    setSelected({ caseId: "None", groupId: "None" });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Borar Casos de {groupName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          ¿Estás seguro que deseas borrar TODOS los casos de {groupName}? Este
          cambio no se puede deshacer
        </ModalBody>
        <ModalFooter>
          <Button variant={"ghost"} mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button
            colorScheme="red"
            type={"submit"}
            onClick={() => deleteGroup()}
          >
            Borrar Casos
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteGroupCases;
