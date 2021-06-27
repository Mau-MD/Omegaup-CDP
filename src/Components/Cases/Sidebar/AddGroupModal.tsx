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
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";

interface PropTypes {
  shouldSubmit: boolean;
}
const AddGroupModal = ({ shouldSubmit }: PropTypes) => {
  const [autoPoints, setAutoPoints] = useState(true);

  const groupName = useRef<string | null>(null);
  const points = useRef<number | null>(null);
  const pointsDefined = useRef<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const setData = useStoreActions((actions) => actions.add.setData);
  const groupData = useStoreState((state) => state.cases.data);

  const toast = useToast();

  useEffect(() => {
    if (shouldSubmit) {
      formRef.current && formRef.current.submit();
    }
  }, [shouldSubmit]);

  function handleSubmit() {
    // Primero tengo que checar si el caso está repetido
    let isValid = true;
    groupData.forEach((groupElement) => {
      if (groupElement.name === groupName.current) {
        isValid = false;
        return;
      }
    });

    if (!isValid) {
      toast({
        title: "Error al crear grupo",
        description: "No puedes tener grupos con el mismo nombre",
        status: "error",
      });
      return;
    }

    setData({
      type: "case",
      caseName: null,
      groupName: groupName.current,
      points: points.current,
      pointsDefined: pointsDefined.current,
    });
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <FormControl mt={3} isRequired>
        <FormLabel> Nombre del grupo</FormLabel>
        <Input onChange={(e) => (groupName.current = e.target.value)} />
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

export default AddGroupModal;
