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

interface PropTypes {
  type: "group" | "case";
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  caseName?: string;
  points: number;
  cases: object[];
  arePointsDefined: boolean;
}
const Edit = ({
  type,
  isOpen,
  onClose,
  groupName,
  caseName = "",
  points,
  cases,
  arePointsDefined,
}: PropTypes) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Editar {type === "group" ? "Grupo" : "Caso"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={5}>
          {type === "group" ? (
            <AddGroupModal
              onClose={onClose}
              initial={{
                groupName: groupName,
                points: points,
                pointsDefined: arePointsDefined,
                cases: cases,
              }}
              submitButton={"Editar"}
              edit={true}
            />
          ) : (
            <AddCaseModal
              onClose={onClose}
              initial={{
                caseName: caseName,
                groupName: groupName,
                points: points,
                pointsDefined: arePointsDefined,
              }}
              submitButton={"Editar"}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Edit;
