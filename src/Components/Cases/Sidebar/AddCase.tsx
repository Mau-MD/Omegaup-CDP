import * as React from "react";
import { useRef, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useStoreActions, useStoreState } from "../../../Redux/Store";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

interface ICase {
  name: string;
  group: string;
  points: number;
}

const AddCase = ({ isOpen, onClose, title }: PropTypes) => {
  const [isGroup, setIsGroup] = useState(false);
  const groupRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      group: "",
      points: undefined,
    },
  });

  const toast = useToast();

  const addCase = useStoreActions((actions) => actions.cases.addCase);
  const caseState = useStoreState((state) => state.cases.cases);

  function createCase(data: ICase) {
    const { current } = groupRef;
    data.group = current ? current.value : "";
    data.group = data.group === "" ? "mainGroup" : data.group;

    let invalid = false;
    caseState.forEach((group) => {
      if (group.name === data.group) {
        group.cases.forEach((individualCase) => {
          if (individualCase.name === data.name) {
            invalid = true;
            return;
          }
        });
      }
    });

    if (invalid) {
      toast({
        title: "Nombre repetido",
        description:
          "No puedes tener casos con el mismo nombre dentro de un grupo",
        status: "error",
      });
      return;
    }

    console.log("points " + data.points);
    // @ts-ignore
    addCase({
      name: data.name,
      group: data.group,
      arePointsDefined: data.points ? true : false,
      points: data.points ? parseFloat(data.points) : 0,
    });

    toast({
      title: "Caso creado",
      description: "El caso ha sido creado correctamente",
      status: "success",
    });

    onClose();
  }

  function checkIfGroup(event: React.ChangeEvent<HTMLInputElement>) {
    event.target.value !== "" ? setIsGroup(true) : setIsGroup(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(createCase)} autoComplete={"off"}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel> Nombre del caso</FormLabel>
              <Input
                {...register("name", {
                  required: true,
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel> Nombre del grupo</FormLabel>
              <Input
                {...register("group")}
                onChange={checkIfGroup}
                ref={groupRef}
              />
            </FormControl>
            <FormControl mt={4} isDisabled={isGroup}>
              <FormLabel> Puntaje del caso (opcional)</FormLabel>
              <Input
                type={"number"}
                {...register("points", { min: 0, max: 100 })}
              />
              {isGroup && (
                <FormHelperText>
                  No puedes asignar puntos individuales si el caso está dentro
                  de un grupo
                </FormHelperText>
              )}
              {errors.points && (
                <Alert status="error" mt={3}>
                  <AlertIcon />
                  <AlertTitle mr={2}>Error</AlertTitle>
                  <AlertDescription>
                    Ingresa un número entre 0 y 100
                  </AlertDescription>
                </Alert>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" type={"submit"}>
              Agregar Caso
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddCase;
