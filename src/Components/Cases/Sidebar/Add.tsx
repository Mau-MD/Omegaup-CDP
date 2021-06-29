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
import AddCaseModal from "./AddCaseModal";
import AddGroupModal from "./AddGroupModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const Add = ({ isOpen, onClose }: PropTypes) => {
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
              <Tab> Grupo </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AddCaseModal onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <AddGroupModal onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Add;
