import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AddCase from "./AddCase";
import AddGroup from "./AddGroup";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const AddContainer = ({ isOpen, onClose }: PropTypes) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs size={"sm"}>
            <TabList>
              <Tab> Caso </Tab>
              <Tab data-test={"add-group-tab"}> Grupo </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AddCase onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <AddGroup onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddContainer;
