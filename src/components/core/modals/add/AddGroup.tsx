import * as React from "react";
import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  toast,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../../../../Redux/Store";
import { ICase } from "../../../../Redux/Models/CasesModel";
import { uuid } from "uuidv4";

interface PropTypes {
  onClose: () => void;
}

const AddGroup = ({ onClose }: PropTypes) => {
  const [autoPoints, setAutoPoints] = useState(true);

  const groupName = useRef<string>("");
  const points = useRef<number>(50);
  const pointsDefined = useRef<boolean>(false);

  const addGroup = useStoreActions((actions) => actions.cases.addGroup);
  const groupData = useStoreState((state) => state.cases.data);

  const toast = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validName = groupName.current.toLowerCase().replaceAll(" ", "_");

    let isValid = true;
    groupData.forEach((groupElement) => {
      if (groupElement.name === validName) {
        isValid = false;
        return;
      }
    });

    if (!isValid) {
      toast({
        title: "Error al crear grupo",
        description: "No puedes tener grupos con el mismo nombre",
        status: "error",
        isClosable: true,
      });
      return;
    }

    addGroup({
      groupId: uuid(),
      name: validName,
      points: points.current,
      defined: pointsDefined.current,
      cases: [],
    });

    onClose();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl mt={3} isRequired>
        <FormLabel> Nombre del grupo</FormLabel>
        <Input onChange={(e) => (groupName.current = e.target.value)} />
        <FormHelperText>En minúsculas y sin espacios</FormHelperText>
      </FormControl>
      <FormControl mt={5}>
        <FormLabel> Puntaje </FormLabel>
        <NumberInput
          onChange={(e, valueAsNumber) => (points.current = valueAsNumber)}
          min={0}
          max={100}
          isDisabled={autoPoints}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {autoPoints && (
          <FormHelperText>
            El programa calculará automáticamente el puntaje
          </FormHelperText>
        )}
        <Checkbox
          mt={3}
          isChecked={autoPoints}
          onChange={() => {
            setAutoPoints(!autoPoints);
            pointsDefined.current = autoPoints;
          }}
        >
          Puntaje automático
        </Checkbox>
      </FormControl>
      <Button colorScheme="green" isFullWidth mt={10} type={"submit"}>
        Agregar Problema
      </Button>
    </form>
  );
};

export default AddGroup;
