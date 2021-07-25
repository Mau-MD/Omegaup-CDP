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
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import LayoutLines from "./LayoutLines";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
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
  const { isOpen, onClose } = props;

  const [arrayValue, setArrayValue] = useState("");

  const sizeRef = useRef<HTMLInputElement>(null);
  const minValueRef = useRef<HTMLInputElement>(null);
  const maxValueRef = useRef<HTMLInputElement>(null);
  const distinctRef = useRef<boolean>(false);

  function handleGenerateArray() {
    if (
      sizeRef.current !== null &&
      minValueRef.current !== null &&
      maxValueRef.current !== null
    ) {
      const size = parseInt(sizeRef.current.value);
      const minValue = parseInt(minValueRef.current.value);
      const maxValue = parseInt(maxValueRef.current.value);
      const distinct = distinctRef.current;

      const newArray = generateArray(size, minValue, maxValue, distinct);

      setArrayValue(newArray);
      console.log(newArray);
    }
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
              <NumberInput>
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
                <NumberInput>
                  <NumberInputField ref={minValueRef} required />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel> Valor Máximo</FormLabel>
                <NumberInput>
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
                onChange={(e) => (distinctRef.current = e.target.checked)}
              >
                Valores Distintos
              </Checkbox>
            </Center>
            <FormControl mt={5}>
              <FormLabel>Arreglo Generado:</FormLabel>
              <Textarea isReadOnly h={"180px"} value={arrayValue}></Textarea>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <VStack w={"100%"}>
              <HStack w={"100%"}>
                <Button isFullWidth colorScheme="blue">
                  Ver Redacción
                </Button>
                <Button isFullWidth colorScheme="blue">
                  Ver Layout
                </Button>
              </HStack>
              <Button
                isFullWidth
                colorScheme="red"
                onClick={() => setArrayValue("")}
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
