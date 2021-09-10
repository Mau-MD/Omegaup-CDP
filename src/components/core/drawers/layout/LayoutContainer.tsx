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
  useDisclosure,
} from "@chakra-ui/react";
import _ from "lodash";
import * as React from "react";
import { uuid } from "uuidv4";
import { useStoreActions, useStoreState } from "../../../../redux/store";
import Lines from "./Lines";
import { useRef } from "react";
import Writing from "../Writing";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  placement?: "right" | "left";
  displayWritingButton?: boolean;
}
const LayoutContainer = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    placement = "right",
    displayWritingButton = false,
  } = props;

  const setLayout = useStoreActions((actions) => actions.input.setLayout);
  const selectedCase = useStoreState((state) => state.cases.selected);
  const selectedInputData = useStoreState((state) =>
    state.input.data.find((inputElement) =>
      _.isEqual(inputElement.id, selectedCase)
    )
  );

  const {
    isOpen: isOpenWriting,
    onOpen: onOpenWriting,
    onClose: onCloseWriting,
  } = useDisclosure();

  function loadCurrentLayout() {
    if (selectedInputData !== undefined) {
      const mappedLines = selectedInputData.lines.map((inputElement) => {
        return {
          ...inputElement,
          value: "",
          lineId: uuid(),
          arrayData:
            inputElement.arrayData !== undefined
              ? { ...inputElement.arrayData, value: "" }
              : undefined,
        };
      });
      setLayout(mappedLines);
    }
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement={placement} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton data-test={"layout-close"} />
          <DrawerHeader>Layout</DrawerHeader>

          <DrawerBody>
            <Lines isLeft={!displayWritingButton} />
          </DrawerBody>

          <DrawerFooter>
            <VStack w={"100%"}>
              {displayWritingButton && (
                <Button
                  isFullWidth
                  size={"sm"}
                  colorScheme="blue"
                  onClick={() => onOpenWriting()}
                >
                  Ver Reddacción
                </Button>
              )}
              <Button
                isFullWidth
                colorScheme="red"
                size={"sm"}
                onClick={() => setLayout([])}
              >
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
                Crear Layout a partir del caso seleccionado
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Writing isOpen={isOpenWriting} onClose={onCloseWriting} />
    </>
  );
};

export default LayoutContainer;
