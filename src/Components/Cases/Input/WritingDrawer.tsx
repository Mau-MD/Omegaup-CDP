import * as React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";

import "../../Writing/Markdown/MarkdownDark.css";
import "../../Writing/Markdown/MarkdownLight.css";
import "../../Writing/Markdown/Markdown.css";
import LayoutLines from "./LayoutLines";
import { parse } from "../../Writing/Markdown/Parser";
import { useStoreState } from "../../../Redux/Store";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}
const WritingDrawer = (props: PropTypes) => {
  const { isOpen, onClose } = props;

  const writingRef = useCallback((node) => {
    if (node !== null) {
      node.innerHTML = parse(markdownState);
    }
  }, []);

  const markdownState = useStoreState((state) => state.writing.all);

  const style = useColorModeValue("light", "dark");

  return (
    <Drawer isOpen={isOpen} size={"sm"} placement={"left"} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <Box ml={5} ref={writingRef} className={style + " markdown"} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default WritingDrawer;
