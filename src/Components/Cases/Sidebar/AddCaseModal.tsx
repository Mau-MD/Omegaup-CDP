import * as React from "react";
import {
  Button,
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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";

interface PropTypes {
  onClose: () => void;
}

// TODO handle logic for no group cases

const AddCaseModal = ({ onClose }: PropTypes) => {
  const [autoPoints, setAutoPoints] = useState(true);

  const caseName = useRef<string | null>(null);
  const groupName = useRef<string | null>(null);
  const points = useRef<number | null>(50);
  const pointsDefined = useRef<boolean>(false);

  const addCase = useStoreActions((actions) => actions.cases.addCase);
  const groupData = useStoreState((state) => state.cases.data);

  const toast = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (caseName === null || caseName.current === "") {
      toast({
        title: "Por favor ingresa los datos",
        description: "No puedes dejar campos vacios",
        status: "error",
        isClosable: true,
      });
      return;
    }

    let isValid = true;
    groupData.forEach((groupElement) => {
      if (groupElement.name === groupName.current) {
        groupElement.cases.forEach((caseElement) => {
          if (caseElement.name === caseName.current) {
            isValid = false;
            return;
          }
        });
      }
      if (!isValid) return;
    });

    if (!isValid) {
      toast({
        title: "Error al crear caso",
        description:
          "No puedes tener casos con el mismo nombre en un mismo grupo",
        status: "error",
        isClosable: true,
      });
      return;
    }

    addCase({
      name: caseName.current,
      group: groupName.current,
      points: points.current,
      defined: pointsDefined.current,
      ioData: {},
    });

    onClose();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl mt={3} isRequired>
        <FormLabel> Nombre del caso</FormLabel>
        <Input onChange={(e) => (caseName.current = e.target.value)} />
      </FormControl>
      <FormControl mt={5} isRequired>
        <FormLabel> Nombre del grupo</FormLabel>
        <Select onChange={(e) => (groupName.current = e.target.value)}>
          <option value={"null"}>Sin Grupo</option>
          {groupData.map((group) => {
            return (
              <option
                value={group.name ? group.name : undefined}
                key={group.name}
              >
                {group.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl mt={5}>
        <FormLabel> Puntaje </FormLabel>
        <NumberInput
          onChange={(e, valueAsNumber) => (points.current = valueAsNumber)}
          defaultValue={50}
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
      <Button colorScheme="green" isFullWidth mt={10} type="submit">
        Agregar
      </Button>
    </form>
  );
};

export default AddCaseModal;
