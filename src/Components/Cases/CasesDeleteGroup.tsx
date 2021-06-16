import * as React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useStoreActions, useStoreState } from "../../Redux/Store";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
}

interface IData {
  name: string;
  points: number;
}

const CasesDeleteGroup = ({ isOpen, onClose, groupName }: PropTypes) => {
  const deleteState = useStoreActions((actions) => actions.cases.removeCase);

  const toast = useToast();

  function removeCase() {
    deleteState(groupName);

    toast({
      title: "Grupo borrado",
      description: "El grupo ha sido borrado exitosamente",
      status: "success",
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

export default CasesDeleteGroup;
