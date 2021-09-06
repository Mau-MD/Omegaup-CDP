import * as React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import AddCase from "../add/AddCase";
import AddGroup from "../add/AddGroup";
import { ICase, IGroup } from "../../../../redux/models/cases/casesModel";
import EditGroupModal from "./EditGroup";
import EditCase from "./EditCase";

interface PropTypes extends ICase {
  isOpen: boolean;
  onClose: () => void;
}
const EditCaseContainer = (props: PropTypes) => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Editar Caso </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={5}>
          <EditCase {...props} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCaseContainer;
