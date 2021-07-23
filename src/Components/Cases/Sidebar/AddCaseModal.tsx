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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import RSelect from "react-select";
import { uuid } from "uuidv4";
import chakraColors from "../../../Util/chakraColors";

interface PropTypes {
  onClose: () => void;
}

// TODO handle logic for no group cases

const AddCaseModal = ({ onClose }: PropTypes) => {
  const [autoPoints, setAutoPoints] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [hasGroup, setHasGroup] = useState(false);

  const caseName = useRef<string>("");
  const points = useRef<number>(50);
  const pointsDefined = useRef<boolean>(false);

  const addCase = useStoreActions((actions) => actions.cases.addCase);
  const groupData = useStoreState((state) => state.cases.data);

  const toast = useToast();
  const darkTheme = useColorModeValue(false, true);

  let options = groupData.map((groupElement) => {
    return {
      value: groupElement.groupId,
      label: groupElement.name,
    };
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let isValid = true;
    let selectedGroupId = selectedValue;

    if (selectedGroupId === "") {
      selectedGroupId = options[0].value;
    }

    groupData.forEach((groupElement) => {
      if (groupElement.groupId === selectedGroupId) {
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
      caseId: uuid(),
      name: caseName.current,
      groupId: selectedGroupId,
      points: points.current,
      defined: pointsDefined.current,
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
        <Input onChange={(e) => (caseName.current = e.target.value)} />
      </FormControl>
      <FormControl mt={5} isRequired>
        <FormLabel> Nombre del grupo</FormLabel>
        <RSelect
          defaultValue={{ label: "Sin Grupo", value: options[0].value }}
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
      )}
      <Button colorScheme="green" isFullWidth mt={10} type="submit">
        Agregar Caso
      </Button>
    </form>
  );
};

export default AddCaseModal;
