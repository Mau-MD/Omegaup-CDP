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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";

interface PropTypes {
  shouldSubmit: boolean;
}
const AddCaseModal = ({ shouldSubmit }: PropTypes) => {
  const [autoPoints, setAutoPoints] = useState(true);

  const caseName = useRef<string | null>(null);
  const groupName = useRef<string | null>(null);
  const points = useRef<number | null>(null);
  const pointsDefined = useRef<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (shouldSubmit) {
      formRef.current && formRef.current.submit();
    }
  }, [shouldSubmit]);

  const setData = useStoreActions((actions) => actions.add.setData);
  const groupData = useStoreState((state) => state.cases.data);

  const toast = useToast();

  function handleSubmit() {
    // Primero tengo que checar si el caso está repetido
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
      });
      return;
    }

    setData({
      type: "case",
      caseName: caseName.current,
      groupName: groupName.current,
      points: points.current,
      pointsDefined: pointsDefined.current,
    });
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <FormControl mt={3} isRequired>
        <FormLabel> Nombre del caso</FormLabel>
        <Input onChange={(e) => (caseName.current = e.target.value)} />
      </FormControl>
      <FormControl mt={5} isRequired>
        <FormLabel> Nombre del grupo</FormLabel>
        <Select onChange={(e) => (groupName.current = e.target.value)}>
          <option value={"null"}>Sin Grupo</option>
          <option value={"1"}>Opcion 1</option>
          <option value={"2"}>Opcion 1</option>
          <option value={"3"}>Opcion 1</option>
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
    </form>
  );
};

export default AddCaseModal;
