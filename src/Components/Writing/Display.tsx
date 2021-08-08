import * as React from "react";
import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react"; // `rehype-katex` does not import the CSS for you
import { parse } from "./Markdown/Parser";
import "./Markdown/MarkdownDark.css";
import "./Markdown/MarkdownLight.css";
import "./Markdown/Markdown.css";
import MarkdownIt from "markdown-it";
// @ts-ignore
import markdownMath from "markdown-it-texmath";
// @ts-ignore
import katex from "katex";
import ReactMde from "react-mde";
import "./Markdown/EditorStyles/react-mde-all.css";
import MarkdownEditor from "./MarkdownEditor";
import { useWriting } from "../../Hooks/useWriting";
import { useStoreActions } from "../../Redux/Store";

const Display = () => {
  const markdownElements = useWriting();

  const [markdown, setMarkdown] = useState(markdownElements[0]);
  const [showEditor, setShowEditor] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const generateRef = useRef<HTMLButtonElement>(null);
  const hideRef = useRef<HTMLButtonElement>(null);
  const showAllRef = useRef<HTMLButtonElement>(null);
  const tabIndexRef = useRef(0);

  useEffect(() => {
    document.addEventListener("keydown", (key) => handleKeyPress(key));
    return () =>
      document.removeEventListener("keydown", (key) => handleKeyPress(key));
  }, []);

  useEffect(() => {
    if (
      divRef.current != null &&
      markdownElements[tabIndexRef.current] !== undefined
    )
      divRef.current.innerHTML = showAll
        ? parse(markdownElements[0])
        : parse(
            markdownElements[tabIndexRef.current],
            tabIndexRef.current === 4 || tabIndexRef.current === 0
          );

    setMarkdown(markdownElements[tabIndexRef.current]);
  }, [markdownElements, showAll, tabIndexRef.current]);

  const style = useColorModeValue("light", "dark");
  const setStoreMarkdown = useStoreActions((actions) => actions.writing.set);

  function handleKeyPress(key: KeyboardEvent) {
    if (key.ctrlKey && key.which === 83 && generateRef.current !== null) {
      generateRef.current.click();
    }
    if (key.ctrlKey && key.which === 72 && hideRef.current !== null) {
      hideRef.current.click();
      hideRef.current.focus();
    }
    if (key.ctrlKey && key.which === 77 && showAllRef.current !== null) {
      showAllRef.current.click();
    }
  }

  function generateMarkdown() {
    setStoreMarkdown({
      markdown,
      index: tabIndexRef.current,
    });
    // if (divRef.current != null) divRef.current.innerHTML = parse(markdown);
  }

  return (
    <>
      <Flex direction={"column"} w={"100%"} mb={10}>
        <Tabs
          size={"sm"}
          isFitted
          w={"100%"}
          onChange={(index) => {
            setMarkdown(markdownElements[index]);
            tabIndexRef.current = index;
          }}
        >
          <TabList>
            <Tab>Todo</Tab>
            <Tab>Descripción</Tab>
            <Tab>Entrada</Tab>
            <Tab>Salida</Tab>
            <Tab>Ejemplo</Tab>
            <Tab>Limites</Tab>
          </TabList>
        </Tabs>
        <Flex mt={5}>
          {showEditor && (
            <Box className={style}>
              <ReactMde value={markdown} onChange={setMarkdown} />{" "}
            </Box>
          )}
          <Box
            ml={5}
            w={showEditor ? "50%" : "100%"}
            ref={divRef}
            className={style + " markdown"}
          />
        </Flex>
      </Flex>
      <Box pos={"fixed"} left={10} bottom={5}>
        <Button
          ref={hideRef}
          size={"sm"}
          colorScheme={"twitter"}
          onClick={() => setShowEditor(!showEditor)}
        >
          <HStack>
            <Text> {showEditor ? "Ocultar Editor" : "Mostrar Editor"}</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + H
            </Text>
          </HStack>
        </Button>
      </Box>
      <Box pos={"fixed"} right={10} bottom={5}>
        <Button
          mr={4}
          colorScheme={"blue"}
          size={"sm"}
          ref={showAllRef}
          onClick={() => setShowAll(!showAll)}
          disabled={tabIndexRef.current === 0}
        >
          <HStack>
            <Text> {showAll ? "Ocultar Todo" : "Mostrar Todo"}</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + M
            </Text>
          </HStack>
        </Button>
        <Button
          ref={generateRef}
          size={"sm"}
          colorScheme={"green"}
          onClick={() => generateMarkdown()}
        >
          <HStack>
            <Text> Generar </Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + S
            </Text>
          </HStack>
        </Button>
      </Box>
    </>
  );
};

export default Display;
