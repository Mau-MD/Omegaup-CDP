import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  VStack,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  FormControl,
  FormLabel,
  HStack,
  Center,
  Checkbox,
  Textarea,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { caseIdentifier, IArrayData } from "../../../Redux/Models/InputModel";
import { useStoreActions } from "../../../Redux/Store";
import LayoutLines from "./LayoutLines";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  caseIdentifier: caseIdentifier;
  lineId: string;
  arrayData: IArrayData | undefined;
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateArray(
  size: number,
  minValue: number,
  maxValue: number,
  distinct: boolean
) {
  var generatedArray = "";
  const arrayValues = new Set();

  if (distinct && maxValue - minValue < size - 1) {
    return "No se puede generar un arreglo con estos parámetros";
  }

  for (var i = 0; i < size; i++) {
    let randomValue = Infinity;
    do {
      randomValue = getRandom(minValue, maxValue + 1);
    } while (distinct && arrayValues.has(randomValue));
    arrayValues.add(randomValue);
    generatedArray += randomValue + " ";
  }
  return generatedArray;
}

const ArrayGenDrawer = (props: PropTypes) => {
  const { isOpen, onClose, caseIdentifier, lineId, arrayData } = props;

  const [arrayValue, setArrayValue] = useState("");
  const [distinct, setDistinct] = useState<boolean>(
    arrayData !== undefined ? arrayData.distinct : false
  );
  const [valid, setValid] = useState<"size" | "min" | "max" | "none">("none");

  const sizeRef = useRef<HTMLInputElement>(null);
  const minValueRef = useRef<HTMLInputElement>(null);
  const maxValueRef = useRef<HTMLInputElement>(null);

  const updateArrayData = useStoreActions(
    (actions) => actions.input.setLineArrayData
  );

  function handleGenerateArray() {
    setValid("none");
    if (
      sizeRef.current !== null &&
      minValueRef.current !== null &&
      maxValueRef.current !== null
    ) {
      const size = parseInt(sizeRef.current.value);
      const minValue = parseInt(minValueRef.current.value);
      const maxValue = parseInt(maxValueRef.current.value);

      const newArray = generateArray(size, minValue, maxValue, distinct);
      const arrayData: IArrayData = {
        size: size,
        minValue: minValue,
        maxValue: maxValue,
        distinct: distinct,
      };
      setArrayValue(newArray);
      updateArrayData({
        caseIdentifier: caseIdentifier,
        lineId: lineId,
        arrayData: arrayData,
      });
    }
  }

  function checkValidity(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const localArrayVal = e.target.value;
    let anyFails = false;
    const arraySplitted = localArrayVal.split(" ").filter((value) => {
      const parsedValue = parseInt(value);
      if (minValueRef.current !== null && maxValueRef.current !== null) {
        if (parsedValue < parseInt(minValueRef.current.value)) {
          setValid("min");
          anyFails = true;
        }

        if (parsedValue > parseInt(maxValueRef.current.value)) {
          setValid("max");
          anyFails = true;
        }
      }
      return value !== "";
    });
    if (
      sizeRef.current !== null &&
      arraySplitted.length !== parseInt(sizeRef.current.value)
    ) {
      setValid("size");
      anyFails = true;
    }
    console.log(arraySplitted);
    if (!anyFails) setValid("none");
    setArrayValue(e.target.value);
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Generador de Arreglos</DrawerHeader>

        <form onSubmit={(e) => e.preventDefault()}>
          <DrawerBody>
            <FormControl isRequired>
              <FormLabel> Tamaño del Arreglo</FormLabel>
              <NumberInput defaultValue={arrayData?.size}>
                <NumberInputField ref={sizeRef} required />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <HStack mt={5}>
              <FormControl isRequired>
                <FormLabel> Valor Mínimo</FormLabel>
                <NumberInput defaultValue={arrayData?.minValue}>
                  <NumberInputField ref={minValueRef} required />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel> Valor Máximo</FormLabel>
                <NumberInput defaultValue={arrayData?.maxValue}>
                  <NumberInputField ref={maxValueRef} required />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
            <Center mt={5}>
              <Checkbox
                isChecked={distinct}
                onChange={(e) => setDistinct(e.target.checked)}
              >
                Valores Distintos
              </Checkbox>
            </Center>
            <FormControl mt={5} isInvalid={valid !== "none"}>
              <FormLabel>Arreglo Generado:</FormLabel>
              <Textarea
                h={valid !== "none" ? "170px" : "195px"}
                value={arrayValue}
                onChange={(e) => checkValidity(e)}
              ></Textarea>
              <FormErrorMessage>
                {valid === "size" && (
                  <span>El tamaño del arreglo no coincide</span>
                )}
                {valid === "min" && (
                  <span>Algún valor del arreglo es menor </span>
                )}
                {valid === "max" && (
                  <span>Algún valor del arreglo es mayor </span>
                )}
              </FormErrorMessage>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <VStack w={"100%"}>
              <HStack w={"100%"}>
                <Button isFullWidth size={"sm"} colorScheme="blue">
                  Ver Redacción
                </Button>
                <Button isFullWidth size={"sm"} colorScheme="blue">
                  Ver Layout
                </Button>
              </HStack>
              <Button
                isFullWidth
                colorScheme="red"
                size={"sm"}
                onClick={() => {
                  setValid("none");
                  setArrayValue("");
                }}
              >
                Reiniciar
              </Button>
              <Button
                type="submit"
                isFullWidth
                colorScheme="green"
                onClick={() => handleGenerateArray()}
              >
                Generar
              </Button>
            </VStack>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
export default ArrayGenDrawer;
