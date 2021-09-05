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
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../../../../redux/store";
import { ICase, IGroup } from "../../../../redux/models/casesModel";
import RSelect from "react-select";
import chakraColors from "../../../../libs/other/chakraColors";
interface PropTypes extends ICase {
  onClose: () => void;
}
const EditCase = (props: PropTypes) => {
  const { groupId, caseId, name, points, defined, onClose } = props;

  const [autoPoints, setAutoPoints] = useState(!defined);
  const [selectedValue, setSelectedValue] = useState(groupId);

  const nameRef = useRef<string>(name);
  const pointsRef = useRef<number>(points);
  const definedRef = useRef<boolean>(defined);

  const editCase = useStoreActions((actions) => actions.cases.editCase);
  const groupData = useStoreState((state) => state.cases.data);
  const handleGroupChange = useStoreActions(
    (actions) => actions.input.handleGroupChange
  );

  const toast = useToast();
  const darkTheme = useColorModeValue(false, true);

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

    const validName = nameRef.current.toLowerCase().replaceAll(" ", "_");

    let isValid = true;
    let selectedGroupId = selectedValue;

    if (selectedGroupId === "") {
      selectedGroupId = options[0].value;
    }

    groupData.forEach((groupElement) => {
      if (groupElement.groupId === groupId) {
        groupElement.cases.forEach((caseElement) => {
          if (caseElement.name === validName && validName !== name) {
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

    // cambiar el selected
    editCase({
      case: {
        caseId: caseId,
        name: validName,
        points: pointsRef.current,
        groupId: selectedGroupId,
        defined: definedRef.current,
      },
      lastId: groupId,
    });

    handleGroupChange({ caseId: caseId, newGroupId: selectedGroupId });

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
        <FormHelperText>En minúsculas y sin espacios</FormHelperText>
      </FormControl>
      <FormControl mt={5} isRequired>
        <FormLabel> Nombre del grupo</FormLabel>
        <RSelect
          defaultValue={options.find((obj) => obj.value === groupId)}
          options={options}
          value={options.find((obj) => obj.value === selectedValue)}
          onChange={handleSelectChange}
          theme={
            darkTheme
              ? (theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: chakraColors.blue[200], // Selected
                    primary25: chakraColors.gray[600], // Ring
                    primary50: chakraColors.blue[600], // Ring
                    primary75: chakraColors.blue[700], // Ring
                    neutral0: chakraColors.gray[700],
                    neutral5: chakraColors.gray[700],
                    neutral10: chakraColors.gray[700],
                    neutral20: chakraColors.gray[600],
                    neutral30: chakraColors.gray[500],
                    neutral40: chakraColors.white,
                    neutral50: chakraColors.white,
                    neutral80: chakraColors.white,
                    neutral90: chakraColors.white,
                  },
                })
              : undefined
          }
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

export default EditCase;
