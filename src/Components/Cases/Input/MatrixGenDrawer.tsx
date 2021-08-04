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
  Spacer,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  caseIdentifier,
  IArrayData,
  IMatrixData,
} from "../../../Redux/Models/InputModel";
import { useStoreActions } from "../../../Redux/Store";
import LayoutLines from "./LayoutLines";
import LayoutDrawer from "./LayoutDrawer";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  caseIdentifier: caseIdentifier;
  lineId: string;
  matrixData: IMatrixData | undefined;
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateMatrix(
  rows: number,
  columns: number,
  minValue: number,
  maxValue: number,
  distinct: "row" | "column" | "all" | "none"
) {
  var generatedMatrix = "";
  const rowValues = new Array(rows);
  const columnValues = new Array(columns);

  rowValues.fill(new Set());
  columnValues.fill(new Set());

  if (distinct !== "none" && maxValue - minValue < rows * columns - 1) {
    return "No se puede generar un arreglo con estos parámetros";
  }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      let randomNumber: number;
      switch (distinct) {
        case "row": {
          do {
            randomNumber = getRandom(minValue, maxValue + 1);
          } while (rowValues[i].has(randomNumber));
          break;
        }
        case "column": {
          do {
            randomNumber = getRandom(minValue, maxValue + 1);
          } while (columnValues[j].has(randomNumber));
          break;
        }
        case "all": {
          do {
            randomNumber = getRandom(minValue, maxValue + 1);
          } while (
            rowValues[i].has(randomNumber) ||
            columnValues[j].has(randomNumber)
          );
          break;
        }
        default: {
          randomNumber = getRandom(minValue, maxValue + 1);
        }
      }

      rowValues[i].add(randomNumber);
      columnValues[j].add(randomNumber);
      generatedMatrix += randomNumber + " ";
    }
    generatedMatrix += "\n";
  }
  return generatedMatrix;
}

const ArrayGenDrawer = (props: PropTypes) => {
  const { isOpen, onClose, caseIdentifier, lineId, matrixData } = props;

  const [matrixValue, setMatrixValue] = useState<string>(
    matrixData !== undefined ? matrixData.value : ""
  );
  const [distinct, setDistinct] = useState<"row" | "column" | "all" | "none">(
    "none"
  );

  const rowsRef = useRef<HTMLInputElement>(null);
  const colsRef = useRef<HTMLInputElement>(null);
  const minValueRef = useRef<HTMLInputElement>(null);
  const maxValueRef = useRef<HTMLInputElement>(null);

  const updateMatrixData = useStoreActions(
    (actions) => actions.input.setLineMatrixData
  );

  const {
    isOpen: isOpenLayout,
    onClose: onCloseLayout,
    onOpen: onOpenLayout,
  } = useDisclosure();

  function handleGenerateArray() {
    if (
      rowsRef.current !== null &&
      colsRef.current !== null &&
      minValueRef.current !== null &&
      maxValueRef.current !== null
    ) {
      const rows = parseInt(rowsRef.current.value);
      const cols = parseInt(colsRef.current.value);
      const minValue = parseInt(minValueRef.current.value);
      const maxValue = parseInt(maxValueRef.current.value);

      const newMatrix = generateMatrix(
        rows,
        cols,
        minValue,
        maxValue,
        distinct
      );

      const matrixData: IMatrixData = {
        rows: rows,
        columns: cols,
        minValue: minValue,
        maxValue: maxValue,
        distinct: distinct,
        value: newMatrix,
      };

      setMatrixValue(newMatrix);
      updateMatrixData({
        caseIdentifier: caseIdentifier,
        lineId: lineId,
        matrixData: matrixData,
      });
    }
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Generador de Matriz</DrawerHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerateArray();
            }}
          >
            <DrawerBody>
              <HStack>
                <FormControl isRequired>
                  <FormLabel> Columnas</FormLabel>
                  <NumberInput defaultValue={matrixData?.columns}>
                    <NumberInputField ref={colsRef} required />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel> Filas</FormLabel>
                  <NumberInput defaultValue={matrixData?.rows}>
                    <NumberInputField ref={rowsRef} required />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>
              <HStack mt={5}>
                <FormControl isRequired>
                  <FormLabel> Valor Mínimo</FormLabel>
                  <NumberInput defaultValue={matrixData?.minValue}>
                    <NumberInputField ref={minValueRef} required />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel> Valor Máximo</FormLabel>
                  <NumberInput defaultValue={matrixData?.maxValue}>
                    <NumberInputField ref={maxValueRef} required />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>
              <FormControl mt={5}>
                <FormLabel> Valores distintos:</FormLabel>
                <Select
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (
                      selectedValue === "none" ||
                      selectedValue === "row" ||
                      selectedValue === "column" ||
                      selectedValue === "all"
                    ) {
                      setDistinct(selectedValue);
                    }
                  }}
                >
                  <option value="none">Ninguno</option>
                  <option value="row">Filas</option>
                  <option value="column">Columnas</option>
                  <option value="all">Ambas</option>
                </Select>
              </FormControl>
              <FormControl mt={5}>
                <FormLabel>
                  <HStack>
                    <span>Matriz Generada:</span>
                    <Spacer />
                    <Link to={`/matrix/${lineId}`}>
                      <Button size="sm" variant="link">
                        Ver Raw
                      </Button>
                    </Link>
                  </HStack>
                </FormLabel>
                <Textarea h={"150px"} value={matrixValue}/>
              </FormControl>
            </DrawerBody>

            <DrawerFooter>
              <VStack w={"100%"}>
                <HStack w={"100%"}>
                  <Button isFullWidth size={"sm"} colorScheme="blue">
                    Ver Redacción
                  </Button>
                  <Button
                    isFullWidth
                    size={"sm"}
                    colorScheme="blue"
                    onClick={onOpenLayout}
                  >
                    Ver Layout
                  </Button>
                </HStack>
                <Button
                  isFullWidth
                  colorScheme="red"
                  size={"sm"}
                  onClick={() => {
                    setMatrixValue("");
                  }}
                >
                  Reiniciar
                </Button>
                <Button
                  type="submit"
                  isFullWidth
                  colorScheme="green"
                  // onClick={() => handleGenerateArray()}
                >
                  Generar
                </Button>
              </VStack>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      <LayoutDrawer
        isOpen={isOpenLayout}
        onClose={onCloseLayout}
        placement={"left"}
      />
    </>
  );
};
export default ArrayGenDrawer;
