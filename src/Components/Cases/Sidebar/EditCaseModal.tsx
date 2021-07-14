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
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import { ICase, IGroup } from "../../../Redux/Models/CasesModel";
import RSelect from "react-select";

interface PropTypes extends ICase {
  onClose: () => void;
}
const EditCaseModal = (props: PropTypes) => {
  const { groupId, caseId, name, points, defined, onClose } = props;

  const [autoPoints, setAutoPoints] = useState(!defined);
  const [selectedValue, setSelectedValue] = useState(groupId);

  const nameRef = useRef<string>(name);
  const pointsRef = useRef<number>(points);
  const definedRef = useRef<boolean>(defined);

  const editCase = useStoreActions((actions) => actions.cases.editCase);
  const groupData = useStoreState((state) => state.cases.data);

  const toast = useToast();

  let options = groupData.map((groupElement) => {
    return {
      value: groupElement.groupId,
      label: groupElement.name,
    };
  });

  const [hasGroup, setHasGroup] = useState(groupId !== options[0].value);

  // Tengo que quitarlo primero del grupo donde estaba antes
  // Tengo que agregarlo al nuevo grupo

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let isValid = true;
    let selectedGroupId = selectedValue;

    if (selectedGroupId === "") {
      selectedGroupId = options[0].value;
    }

    groupData.forEach((groupElement) => {
      if (groupElement.groupId === groupId) {
        groupElement.cases.forEach((caseElement) => {
          if (
            caseElement.name === nameRef.current &&
            nameRef.current !== name
          ) {
            isValid = false;
            return;
          }
        });
        if (!isValid) return;
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

    console.log(nameRef.current);

    // cambiar el selected
    editCase({
      case: {
        caseId: caseId,
        name: nameRef.current,
        points: pointsRef.current,
        groupId: selectedGroupId,
        defined: definedRef.current,
      },
      lastId: groupId,
    });

    onClose();
  }

  function handleSelectChange(event: any) {
    setSelectedValue(event.value);
    setHasGroup(event.value !== options[0].value);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl mt={3} isRequired>
        <FormLabel> Nombre del caso</FormLabel>
        <Input
          onChange={(e) => (nameRef.current = e.target.value)}
          defaultValue={name}
        />
      </FormControl>
      <FormControl mt={5} isRequired>
        <FormLabel> Nombre del grupo</FormLabel>
        <RSelect
          defaultValue={options.find((obj) => obj.value === groupId)}
          options={options}
          value={options.find((obj) => obj.value === selectedValue)}
          onChange={handleSelectChange}
        />
      </FormControl>
      {!hasGroup && (
        <FormControl mt={5}>
          <FormLabel> Puntaje </FormLabel>
          <NumberInput
            onChange={(e, valueAsNumber) => (pointsRef.current = valueAsNumber)}
            defaultValue={points}
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
      )}
      <Button colorScheme="green" isFullWidth mt={10} type={"submit"}>
        Editar Caso
      </Button>
    </form>
  );
};

export default EditCaseModal;
