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
import { ICase, IGroup } from "../../../Redux/Models/CasesModel";
import EditGroupModal from "./EditGroupModal";
import EditCaseModal from "./EditCaseModal";

interface PropTypes extends ICase {
  isOpen: boolean;
  onClose: () => void;
}
const EditCase = (props: PropTypes) => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Editar Caso </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={5}>
          <EditCaseModal {...props} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCase;
