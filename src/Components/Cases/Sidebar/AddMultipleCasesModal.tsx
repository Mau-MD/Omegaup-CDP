import * as React from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import AddCaseModal from "./AddCaseModal";
import AddGroupModal from "./AddGroupModal";
import { useRef, useState } from "react";
import ReactSelectDark from "../../External/ReactSelectDark";
import { useStoreState } from "../../../Redux/Store";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}
const AddMultipleCasesModal = (props: PropTypes) => {
  const { isOpen, onClose } = props;

  const [selectedValue, setSelectedValue] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");

  const groupData = useStoreState((state) => state.cases.data);

  const caseNumberRef = useRef(0);

  const darkTheme = useColorModeValue(false, true);

  const options = groupData.map((groupElement) => {
    return {
      value: groupElement.groupId,
      label: groupElement.name,
    };
  });

  function handleSelectChange(event: any) {
    setSelectedValue(event.value);
  }
  return (
    <form onSubmit={() => console.log("")}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Multiples Casos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack mt={3}>
              <FormControl>
                <FormLabel> Prefijo</FormLabel>
                <Input onChange={(e) => setPrefix(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel> Sufijo</FormLabel>
                <Input onChange={(e) => setSuffix(e.target.value)} />
              </FormControl>
            </HStack>
            <FormControl mt={5} isRequired>
              <FormLabel> Número de casos</FormLabel>
              <NumberInput
                onChange={(e, valueAsNumber) =>
                  (caseNumberRef.current = valueAsNumber)
                }
              >
                <NumberInputField required />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mt={5} isRequired>
              <FormLabel> Grupo</FormLabel>
              <ReactSelectDark
                onChange={handleSelectChange}
                value={options.find((obj) => obj.value === selectedValue)}
                options={options}
                darkTheme={darkTheme}
              />
              <FormHelperText>
                Tus casos tendrán el nombre {prefix}1{suffix}, {prefix}2{suffix}
                , ...
              </FormHelperText>
            </FormControl>
            <Button colorScheme={"green"} isFullWidth mt={10} mb={5}>
              Agregar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </form>
  );
};

export default AddMultipleCasesModal;
