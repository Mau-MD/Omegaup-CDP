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
  useToast,
  Kbd,
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
import { useStoreActions, useStoreState } from "../../Redux/Store";

const Display = () => {
  const markdownElements = useWriting();

  const [markdown, setMarkdown] = useState(markdownElements[0]);
  const [showEditor, setShowEditor] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [localTab, setLocalTab] = useState(0);

  const divRef = useRef<HTMLDivElement>(null);
  const generateRef = useRef<HTMLButtonElement>(null);
  const hideRef = useRef<HTMLButtonElement>(null);
  const showAllRef = useRef<HTMLButtonElement>(null);
  const tabIndexRef = useRef(0);

  const tabIndex = useStoreState((state) => state.tabs.tabIndex);
  const saveError = useStoreState((state) => state.writing.error);

  const style = useColorModeValue("light", "dark");
  const setStoreMarkdown = useStoreActions((actions) => actions.writing.set);
  const toast = useToast();

  useEffect(() => {
    document.addEventListener("keydown", (key) => handleKeyPress(key));
    return () => {
      document.removeEventListener("keydown", (key) => handleKeyPress(key));
    };
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
  }, [markdownElements, showAll, localTab]);

  useEffect(() => {
    if (saveError) {
      toast({
        title: "Borraste una de las 5 seccciones",
        description:
          "No podras usar la edición indivudal de secciones. Para activarla otra vez, agrega todas las secciones y vuelve a generar el Markdown. Ejemplo: # Descripción.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [saveError]);

  function handleKeyPress(key: KeyboardEvent) {
    // console.log(key.which);
    if (key.ctrlKey) {
      if (key.which === 83 && generateRef.current !== null) {
        generateRef.current.click();
      }
      if (key.which === 72 && hideRef.current !== null) {
        hideRef.current.click();
        hideRef.current.focus();
      }
      if (key.which === 77 && showAllRef.current !== null) {
        showAllRef.current.click();
      }
      // Local Tabs
      if (key.which >= 49 && key.which <= 54) {
        handleShorcutTabChange(key.which);
      }
    }
    // 49 es uno
    // 55 es el max
  }

  function handleShorcutTabChange(key: number) {
    const index = key - 49;
    // console.log("index shorcut", index);
    // console.log(markdownElements[index]);

    setMarkdown(markdownElements[index]);
    tabIndexRef.current = index;
    setLocalTab(index);
  }
  function generateMarkdown() {
    setStoreMarkdown({
      markdown,
      index: tabIndexRef.current,
    });
    toast({
      title: "Markdown generado!",
      status: "success",
      variant: "left-accent",
      duration: 2000,
      isClosable: true,
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
          index={localTab}
          onChange={(index) => {
            console.log("index", index);
            setLocalTab(index);
            setMarkdown(markdownElements[index]);
            tabIndexRef.current = index;
          }}
        >
          <TabList>
            <Tab>
              <HStack>
                <Text>Todo</Text>
                <Text fontSize={"xs"} opacity={0.5}>
                  Ctrl + 1
                </Text>
              </HStack>
            </Tab>
            <Tab isDisabled={saveError}>
              <HStack>
                <Text>Descripción</Text>
                <Text fontSize={"xs"} opacity={0.5}>
                  Ctrl + 2
                </Text>
              </HStack>
            </Tab>
            <Tab isDisabled={saveError}>
              <HStack>
                <Text>Entrada</Text>
                <Text fontSize={"xs"} opacity={0.5}>
                  Ctrl + 3
                </Text>
              </HStack>
            </Tab>
            <Tab isDisabled={saveError}>
              <HStack>
                <Text>Salida</Text>
                <Text fontSize={"xs"} opacity={0.5}>
                  Ctrl + 4
                </Text>
              </HStack>
            </Tab>
            <Tab isDisabled={saveError}>
              <HStack>
                <Text>Ejemplo</Text>
                <Text fontSize={"xs"} opacity={0.5}>
                  Ctrl + 5
                </Text>
              </HStack>
            </Tab>
            <Tab isDisabled={saveError}>
              <HStack>
                <Text>Límites</Text>
                <Text fontSize={"xs"} opacity={0.5}>
                  Ctrl + 6
                </Text>
              </HStack>
            </Tab>
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
          mr={4}
          size={"sm"}
          colorScheme={"twitter"}
          onClick={() => {
            tabIndex === 1 && setShowEditor(!showEditor);
          }}
        >
          <HStack>
            <Text> {showEditor ? "Ocultar Editor" : "Mostrar Editor"}</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + H
            </Text>
          </HStack>
        </Button>
        <Button
          colorScheme={"blue"}
          size={"sm"}
          ref={showAllRef}
          onClick={() => {
            tabIndex === 1 && setShowAll(!showAll);
          }}
          disabled={tabIndexRef.current === 0}
        >
          <HStack>
            <Text> {showAll ? "Ocultar Todo" : "Mostrar Todo"}</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + M
            </Text>
          </HStack>
        </Button>
      </Box>
      <Box pos={"fixed"} right={10} bottom={5}>
        <Button
          ref={generateRef}
          size={"sm"}
          colorScheme={"green"}
          onClick={() => {
            tabIndex === 1 && generateMarkdown();
          }}
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
