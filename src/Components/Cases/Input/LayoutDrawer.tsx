import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  HStack,
  VStack,
  Center,
  Flex,
} from "@chakra-ui/react";
import _ from "lodash";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import LayoutLines from "./LayoutLines";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}
const LayoutDrawer = (props: PropTypes) => {
  const { isOpen, onClose } = props;
  const setLayout = useStoreActions((actions) => actions.input.setLayout);
  const selectedCase = useStoreState((state) => state.cases.selected);
  const selectedInputData = useStoreState((state) =>
    state.input.data.find((inputElement) =>
      _.isEqual(inputElement.id, selectedCase)
    )
  );

  function loadCurrentLayout() {
    if (selectedInputData !== undefined) {
      setLayout(selectedInputData?.lines);
    }
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Layout</DrawerHeader>

        <DrawerBody>
          <LayoutLines />
        </DrawerBody>

        <DrawerFooter>
          <VStack w={"100%"}>
            <Button isFullWidth colorScheme="red" onClick={() => setLayout([])}>
              Borrar Layout
            </Button>
            <Button
              isFullWidth
              p={7}
              whiteSpace={"normal"}
              overflowWrap={"break-word"}
              colorScheme="green"
              onClick={() => loadCurrentLayout()}
            >
              Cargar Layout a partir del caso seleccionado
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LayoutDrawer;
