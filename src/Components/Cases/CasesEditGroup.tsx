import * as React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
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
import { useState } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  groupPoints: number;
  pointsDefined: boolean;
}

interface IData {
  name: string;
  points: number;
}

const CasesEditGroup = ({
  isOpen,
  onClose,
  groupName,
  groupPoints,
  pointsDefined,
}: PropTypes) => {
  const [automaticPoints, setAutomaticPoints] = useState(!pointsDefined);

  const caseState = useStoreState((state) => state.cases.cases);
  const updateState = useStoreActions((actions) => actions.cases.updateCase);

  const toast = useToast();

  function checkIfGroupExist(data: IData): boolean {
    let duplicateExist = false;
    caseState.forEach((group) => {
      if (group.name === data.name) {
        duplicateExist = true;
      }
    });

    return duplicateExist;
  }

  function editCase(data: IData) {
    // TODO verificar que no se duplique el nombre del grupo
    let isValid = true;

    if (data.name !== groupName) {
      if (checkIfGroupExist(data)) {
        toast({
          title: "Nombre repetido",
          description: "No puedes tener dos grupos con el mismo nombre",
          status: "error",
        });
        isValid = false;
      }
    }

    if (isValid) {
      updateState({
        oldName: groupName,
        newName: data.name,
        points: data.points,
        pointsDefined: !automaticPoints,
      });
      onClose();
    }
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: `${groupName}`,
      points: `${groupPoints}`,
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Grupo</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(editCase)} autoComplete={"off"}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel> Nombre del caso</FormLabel>
              <Input {...register("name")} />
            </FormControl>
            <FormControl mt={4} isDisabled={automaticPoints}>
              <FormLabel> Puntaje del grupo</FormLabel>
              <Input
                type={"number"}
                {...register("points", { min: 0, max: 100 })}
              />
              {automaticPoints && (
                <FormHelperText>
                  El programa automáticamente generará los puntos.
                </FormHelperText>
              )}
            </FormControl>
            <Checkbox
              mt={4}
              isChecked={automaticPoints}
              onChange={(e) => setAutomaticPoints(e.target.checked)}
            >
              {" "}
              Puntaje Automático{" "}
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" type={"submit"}>
              Editar Caso
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CasesEditGroup;
