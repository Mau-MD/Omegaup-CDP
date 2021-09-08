import * as React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { IGroup } from "../../../../redux/models/cases/casesInterfaces";
import EditGroupModal from "./EditGroup";

interface PropTypes extends IGroup {
  isOpen: boolean;
  onClose: () => void;
}
const EditGroupContainer = (props: PropTypes) => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Editar Grupo </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={5}>
          <EditGroupModal {...props} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditGroupContainer;
