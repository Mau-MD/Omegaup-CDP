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
import { useStoreActions, useStoreState } from "../../../../redux/store";
import { ICase, IGroup } from "../../../../redux/models/cases/casesModel";
import { uuid } from "uuidv4";

interface PropTypes extends IGroup {
  onClose: () => void;
}

const AddGroupModal = (props: PropTypes) => {
  const { groupId, name, points, defined, onClose, cases } = props;

  const [autoPoints, setAutoPoints] = useState(!defined);

  const nameRef = useRef<string>(name);
  const pointsRef = useRef<number>(points);
  const definedRef = useRef<boolean>(defined);

  const editGroup = useStoreActions((actions) => actions.cases.editGroup);
  const groupData = useStoreState((state) => state.cases.data);

  const toast = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validName = nameRef.current.toLowerCase().replaceAll(" ", "_");

    let isValid = true;
    groupData.forEach((groupElement) => {
      if (groupElement.name === validName && validName !== name) {
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

    editGroup({
      groupId: groupId,
      points: pointsRef.current,
      defined: definedRef.current,
      name: validName,
      cases: cases,
    });

    onClose();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl mt={3} isRequired>
        <FormLabel> Nombre del grupo</FormLabel>
        <Input
          onChange={(e) => (nameRef.current = e.target.value)}
          defaultValue={name}
        />
        <FormHelperText>En minúsculas y sin espacios</FormHelperText>
      </FormControl>
      <FormControl mt={5}>
        <FormLabel> Puntaje </FormLabel>
        <NumberInput
          defaultValue={points}
          onChange={(e, valueAsNumber) => (pointsRef.current = valueAsNumber)}
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
            definedRef.current = autoPoints;
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

export default AddGroupModal;
