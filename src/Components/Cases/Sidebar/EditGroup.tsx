import * as React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import AddCaseModal from "./AddCaseModal";
import AddGroupModal from "./AddGroupModal";
import { IGroup } from "../../../Redux/Models/CasesModel";
import EditGroupModal from "./EditGroupModal";

interface PropTypes extends IGroup {
  isOpen: boolean;
  onClose: () => void;
}
const EditGroup = (props: PropTypes) => {
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

export default EditGroup;
