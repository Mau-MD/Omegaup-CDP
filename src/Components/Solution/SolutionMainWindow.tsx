import * as React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SelectField,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

import "../Writing/Markdown/EditorStyles/react-mde-all.css";
import "./AceStyles/darkTheme.css";

import ReactMde from "react-mde";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import sloth from "../../Assets/Images/slothSad.png";

const languages = [
  { ide: "C", ace: "c_cpp" },
  { ide: "Cpp", ace: "c_cpp" },
  { ide: "Cpp14", ace: "c_cpp" },
  { ide: "Java", ace: "java" },
  { ide: "Python", ace: "python" },
  { ide: "Python3", ace: "python" },
  { ide: "Csharp", ace: "csharp" },
];

languages.forEach((language) => {
  require(`ace-builds/src-noconflict/mode-${language.ace}`);
  require(`ace-builds/src-noconflict/snippets/${language.ace}`);
});

const SolutionMainWindow = () => {
  const [markdown, setMarkdown] = useState(
    "Escribe aquí la solución de tu problema"
  );
  const [mdEditorHeight, setMdEditorHeight] = useState(695);
  const [fontSize, setFontSize] = useState(14);
  const [language, setLanguage] = useState(languages[0].ace);
  const [showCode, setShowCode] = useState(true);
  const [showSolution, setShowSolution] = useState(true);

  const mdEditorRef = useRef<any>(null);
  const showCodeRef = useRef<HTMLButtonElement>(null);
  const showSolutionRef = useRef<HTMLButtonElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);

  const editorStyle = useColorModeValue("light", "dark");
  const codeStyle = useColorModeValue("tomorrow", "monokai");
  const codeToolbarStyle = useColorModeValue("#F9F9F9", "#2C323D");

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerHeight]);
  // 48 y 10 de padding

  useEffect(() => {
    handleResize();
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  function handleResize() {
    if (mdEditorRef.current !== null) {
      setMdEditorHeight(
        mdEditorRef.current.finalRefs.textarea.current.scrollHeight
      );
    }
  }

  function handleKeyPress(key: KeyboardEvent) {
    if (key.ctrlKey && key.which === 83 && saveRef.current !== null) {
      saveRef.current.click();
    }
    if (key.ctrlKey && key.which === 72 && showCodeRef.current !== null) {
      showCodeRef.current.click();
    }
    if (key.ctrlKey && key.which === 77 && showSolutionRef.current !== null) {
      showSolutionRef.current.click();
    }
  }

  function handleFontSize(e: number) {
    setFontSize(e);
  }

  return (
    <>
      <Flex>
        {showCode && (
          <Box w={"100%"}>
            <Text>Código</Text>
            <Box border={"0.5px solid #C8CCD0"} borderRadius={2}>
              <Box
                borderBottom={"0.5px solid #C8CCD0"}
                bg={codeToolbarStyle}
                h={"48px"}
                p={"10px"}
              >
                <HStack>
                  <Text fontSize={"smaller"}> Lenguaje</Text>
                  <Select
                    size={"sm"}
                    fontSize={"13px"}
                    h={"21.5px"}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map((language, index) => (
                      <option key={language.ace + index} value={language.ace}>
                        {language.ide}
                      </option>
                    ))}
                  </Select>
                  <Text fontSize={"smaller"}> Tamaño</Text>
                  <NumberInput
                    min={1}
                    max={50}
                    defaultValue={14}
                    size={"small"}
                    fontSize={"13px"}
                    onChange={(valueAsString, valueAsNumber) =>
                      handleFontSize(valueAsNumber)
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </HStack>
              </Box>

              <AceEditor
                placeholder={"Ingresa el código que soluciona el problema aquí"}
                mode={language}
                theme={codeStyle}
                fontSize={fontSize}
                name={"SOLUTIONEDITOR"}
                width={"100%"}
                height={mdEditorHeight + "px"}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
              />
            </Box>
          </Box>
        )}
        {showSolution && (
          <Box ml={5} w={"100%"}>
            <Text>Redacción</Text>
            <Box className={editorStyle}>
              <ReactMde
                ref={mdEditorRef}
                value={markdown}
                minEditorHeight={695}
                minPreviewHeight={695}
                onChange={setMarkdown}
              />{" "}
            </Box>
          </Box>
        )}
      </Flex>
      {!showSolution && !showCode && (
        <Center h="60vh">
          <VStack>
            <Center w={"300px"} h={"300px"}>
              <Image src={sloth} w={"50%"} />
            </Center>
            <Text fontWeight={"bold"}> No ocultes todo :(</Text>
            <Box fontSize={9}>
              <a href="https://www.freepik.com/vectors/tree">
                Tree vector created by pch.vector - www.freepik.com
              </a>
            </Box>
          </VStack>
        </Center>
      )}
      <Box pos={"fixed"} zIndex={5} left={10} bottom={5}>
        <Button
          ref={showCodeRef}
          size={"sm"}
          colorScheme={"twitter"}
          mr={5}
          onClick={() => setShowCode(!showCode)}
        >
          <HStack>
            <Text> {showCode ? "Ocultar Código" : "Mostrar Código"}</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + H
            </Text>
          </HStack>
        </Button>
        <Button
          ref={showSolutionRef}
          mr={4}
          colorScheme={"blue"}
          size={"sm"}
          onClick={() => setShowSolution(!showSolution)}
        >
          <HStack>
            <Text>
              {showSolution ? "Ocultar Redacción" : "Mostrar Redacción"}
            </Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + M
            </Text>
          </HStack>
        </Button>
      </Box>
      <Box pos={"fixed"} right={10} bottom={5}>
        <Button ref={saveRef} size={"sm"} colorScheme={"green"}>
          <HStack>
            <Text> Salvar </Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + S
            </Text>
          </HStack>
        </Button>
      </Box>
    </>
  );
};

export default SolutionMainWindow;
