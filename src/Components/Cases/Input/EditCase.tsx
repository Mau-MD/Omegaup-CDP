import * as React from "react";
import {
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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import { useEffect, useRef, useState } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  caseName: string;
  groupName: string;
  casePoints: number;
  pointsDefined: boolean;
}

interface IData {
  name: string;
  points: number;
}

const EditCase = ({
  isOpen,
  onClose,
  caseName,
  groupName,
  casePoints,
  pointsDefined,
}: PropTypes) => {
  const [isGroup, setIsGroup] = useState(false);
  const [automaticPoints, setAutomaticPoints] = useState(!pointsDefined);

  const pointsRef = useRef<HTMLInputElement>(null);

  const caseState = useStoreState((state) => state.cases.cases);
  const updateState = useStoreActions((actions) => actions.cases.updateCase);

  const toast = useToast();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: `${caseName}`,
      group: `${groupName}`,
      points: `${casePoints}`,
    },
  });

  useEffect(() => {
    setValue("name", caseName);
    setValue("group", groupName);
    setValue("points", casePoints);
    setIsGroup(groupName !== "");
  }, [isOpen]);

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
    const { current } = pointsRef;
    data.points = current ? parseInt(current.value) : 0;

    let isValid = true;

    if (data.name !== groupName) {
      if (checkIfGroupExist(data)) {
        toast({
          title: "Nombre repetido",
          description: "No puedes tener dos grupos con el mismo nombre",
          status: "error",
          isClosable: true,
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

  function checkIfGroup(event: React.ChangeEvent<HTMLInputElement>) {
    event.target.value !== "" ? setIsGroup(true) : setIsGroup(false);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Caso</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(editCase)} autoComplete={"off"}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel> Nombre del caso</FormLabel>
              <Input {...register("name")} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel> Nombre del grupo</FormLabel>
              <Input {...register("group")} onChange={checkIfGroup} />
            </FormControl>
            <FormControl mt={4} isDisabled={automaticPoints}>
              <FormLabel> Puntaje del caso</FormLabel>
              <Input
                type={"number"}
                {...register("points", { min: 0, max: 100 })}
                ref={pointsRef}
              />
              {automaticPoints && (
                <FormHelperText>
                  {isGroup ? (
                    <p>
                      No puedes asignar puntos individuales si el caso está
                      dentro de un grupo
                    </p>
                  ) : (
                    <p>El programa automáticamente generará los puntos.</p>
                  )}
                </FormHelperText>
              )}
            </FormControl>
            <Checkbox
              isDisabled={isGroup}
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
              Cerrar
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

export default EditCase;
