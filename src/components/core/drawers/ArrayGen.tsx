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
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { caseIdentifier, IArrayData } from "../../../Redux/Models/InputModel";
import { useStoreActions } from "../../../Redux/Store";
import LayoutLines from "../../Cases/Input/LayoutLines";
import Layout from "./Layout";
import Writing from "./Writing";
import {
  AiOutlineEye,
  AiOutlineLayout,
  IoMdCreate,
  RiRestartLine,
} from "react-icons/all";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  caseIdentifier: caseIdentifier;
  lineId: string;
  arrayData: IArrayData | undefined;
  label: string;
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

const ArrayGen = (props: PropTypes) => {
  const { isOpen, onClose, caseIdentifier, lineId, arrayData, label } = props;

  const [arrayValue, setArrayValue] = useState<string>(
    arrayData !== undefined ? arrayData.value : ""
  );
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

  const {
    isOpen: isOpenLayout,
    onClose: onCloseLayout,
    onOpen: onOpenLayout,
  } = useDisclosure();

  const {
    isOpen: isOpenWriting,
    onClose: onCloseWriting,
    onOpen: onOpenWriting,
  } = useDisclosure();

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
        value: newArray,
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
    //console.log(arraySplitted);
    if (!anyFails) setValid("none");
    setArrayValue(e.target.value);
    if (arrayData !== undefined)
      updateArrayData({
        caseIdentifier: caseIdentifier,
        lineId: lineId,
        arrayData: { ...arrayData, value: e.target.value },
      });
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" size={"sm"} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text maxW={"95%"} isTruncated>
              Generador de Arreglos - {label}
            </Text>
          </DrawerHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerateArray();
            }}
          >
            <DrawerBody>
              <HStack h={"100%"}>
                <FormControl isRequired>
                  <FormLabel> Tamaño </FormLabel>
                  <NumberInput defaultValue={arrayData?.size}>
                    <NumberInputField ref={sizeRef} required />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
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
                <FormLabel>
                  <HStack>
                    <span>Arreglo Generado:</span>
                    <Spacer />
                    <Link to={`/array/${lineId}`}>
                      <Button size="sm" variant="link">
                        Ver Raw
                      </Button>
                    </Link>
                  </HStack>
                </FormLabel>
                {/*72 */}
                <Textarea
                  h={"300px"}
                  value={arrayValue}
                  onChange={(e) => checkValidity(e)}
                />
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
                  <Button
                    isFullWidth
                    leftIcon={<AiOutlineEye />}
                    size={"sm"}
                    colorScheme="blue"
                    onClick={onOpenWriting}
                  >
                    Ver Redacción
                  </Button>
                  <Button
                    isFullWidth
                    leftIcon={<AiOutlineLayout />}
                    size={"sm"}
                    colorScheme="blue"
                    onClick={onOpenLayout}
                  >
                    Ver Layout
                  </Button>
                </HStack>
                <HStack w={"100%"}>
                  <Button
                    isFullWidth
                    leftIcon={<RiRestartLine />}
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
                    size={"sm"}
                    leftIcon={<IoMdCreate />}
                    type="submit"
                    isFullWidth
                    colorScheme="green"
                  >
                    Generar
                  </Button>
                </HStack>
              </VStack>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      <Layout
        isOpen={isOpenLayout}
        onClose={onCloseLayout}
        placement={"left"}
      />
      <Writing isOpen={isOpenWriting} onClose={onCloseWriting} />
    </>
  );
};
export default ArrayGen;
