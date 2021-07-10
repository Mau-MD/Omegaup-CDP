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
import RSelect from "react-select";
import StateManager from "react-select";

interface PropTypes {
  onClose: () => void;
  initial?: {
    caseName: string;
    groupName: string;
    points: number;
    pointsDefined: boolean;
  };
  submitButton: string;
}

// TODO handle logic for no group cases

const AddCaseModal = ({ onClose, initial, submitButton }: PropTypes) => {
  const [autoPoints, setAutoPoints] = useState(
    initial?.pointsDefined ? initial?.pointsDefined : true
  );
  const [selectedValue, setSelectedValue] = useState("");

  const caseName = useRef<string>(initial ? initial.caseName : "");
  const groupName = useRef<StateManager>(null);
  const points = useRef<number>(initial ? initial.points : 50);
  const pointsDefined = useRef<boolean>(
    initial ? initial.pointsDefined : false
  );

  const addCase = useStoreActions((actions) => actions.cases.addCase);
  const groupData = useStoreState((state) => state.cases.data);

  const toast = useToast();

  let options = groupData.map((groupElement) => {
    return {
      value: groupElement.name ? groupElement.name : undefined,
      label: groupElement.name,
    };
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let groupNameCurrent: string = selectedValue;
    if (groupNameCurrent === undefined || groupNameCurrent === "") {
      groupNameCurrent = "Sin Grupo";
    }

    console.log(groupNameCurrent);
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
      if (groupElement.name === groupNameCurrent) {
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
      group: groupNameCurrent,
      points: points.current,
      defined: pointsDefined.current,
      ioData: {},
    });

    onClose();
  }

  function handleSelectChange(event: any) {
    setSelectedValue(event.value);
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl mt={3} isRequired>
        <FormLabel> Nombre del caso</FormLabel>
        <Input
          onChange={(e) => (caseName.current = e.target.value)}
          defaultValue={initial?.caseName}
        />
      </FormControl>
      <FormControl mt={5} isRequired>
        <FormLabel> Nombre del grupo</FormLabel>
        <RSelect
          options={options}
          value={options.find((obj) => obj.value === selectedValue)}
          onChange={handleSelectChange}
          defaultValue={{
            label: initial?.groupName === undefined ? "" : initial?.groupName,
            value: initial?.groupName === undefined ? "" : initial?.groupName,
          }}
        />
        {/*<Select*/}
        {/*  onChange={(e) => (groupName.current = e.target.value)}*/}
        {/*  defaultValue={initial?.groupName}*/}
        {/*>*/}
        {/*  {groupData.map((group) => {*/}
        {/*    return (*/}
        {/*      <option*/}
        {/*        value={group.name ? group.name : undefined}*/}
        {/*        key={group.name}*/}
        {/*      >*/}
        {/*        {group.name}*/}
        {/*      </option>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</Select>*/}
      </FormControl>
      <FormControl mt={5}>
        <FormLabel> Puntaje </FormLabel>
        <NumberInput
          onChange={(e, valueAsNumber) => (points.current = valueAsNumber)}
          defaultValue={initial?.points}
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
        {submitButton}
      </Button>
    </form>
  );
};

export default AddCaseModal;
