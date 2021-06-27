import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import AddCaseModal from "./AddCaseModal";
import AddGroupModal from "./AddGroupModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const Add = ({ isOpen, onClose }: PropTypes) => {
  const submit = useRef(false);

  useEffect(() => {
    submit.current = false;
  }, [isOpen]);

  function handleSubmit() {
    submit.current = true;
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant={"soft-rounded"} size={"sm"}>
            <TabList>
              <Tab> Caso </Tab>
              <Tab> Grupo </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AddCaseModal shouldSubmit={submit.current} />
              </TabPanel>
              <TabPanel>
                <AddGroupModal shouldSubmit={submit.current} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button variant={"ghost"} mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button
            colorScheme="green"
            type={"submit"}
            onClick={() => handleSubmit()}
          >
            Agregar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Add;
