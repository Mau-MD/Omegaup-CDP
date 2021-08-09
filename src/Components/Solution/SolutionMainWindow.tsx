import * as React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SelectField,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";

import "../Writing/Markdown/EditorStyles/react-mde-all.css";
import "./AceStyles/darkTheme.css";

import ReactMde from "react-mde";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

const SolutionMainWindow = () => {
  const [markdown, setMarkdown] = useState(
    "Escribe aquí la solución de tu problema"
  );
  const [mdEditorHeight, setMdEditorHeight] = useState(695);
  const mdEditorRef = useRef(null);

  const editorStyle = useColorModeValue("light", "dark");
  const codeStyle = useColorModeValue("tomorrow", "monokai");

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerHeight]);
  // 48 y 10 de padding

  useEffect(() => {
    handleResize();
  }, []);

  function handleResize() {
    if (mdEditorRef.current !== null) {
      setMdEditorHeight(
        mdEditorRef.current.finalRefs.textarea.current.scrollHeight
      );
    }
  }
  return (
    <Flex>
      <Box>
        <Text>Código</Text>
        <Box border={"0.5px solid #C8CCD0"} borderRadius={2}>
          <Box
            borderBottom={"0.5px solid #C8CCD0"}
            bg={"#2C323D"}
            h={"48px"}
            p={"10px"}
          >
            <HStack>
              <Text fontSize={"smaller"}> Lenguaje</Text>
              <Select size={"sm"} fontSize={"13px"} h={"21.5px"}>
                <option value={"C"}>C</option>
                <option value={"Cpp"}>C++</option>
                <option value={"Cpp14"}>C++ 14</option>
                <option value={"Csharp"}>C#</option>
                <option value={"Java"}>Java</option>
                <option value={"Perl"}>Perl</option>
                <option value={"Php"}>PHP</option>
                <option value={"Python"}>Python</option>
                <option value={"Python3"}>Python 3</option>
              </Select>
              <Text fontSize={"smaller"}> Tamaño</Text>
              <NumberInput max={1} min={50} size={"small"} fontSize={"13px"}>
                <NumberInputField />
              </NumberInput>
            </HStack>
          </Box>
          <AceEditor
            placeholder={"Ingresa el código que soluciona el problema aquí"}
            mode={"javascript"}
            theme={codeStyle}
            name={"SOLUTIONEDITOR"}
            height={mdEditorHeight + "px"}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
          />
        </Box>
      </Box>
      <Box ml={5}>
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
    </Flex>
  );
};

export default SolutionMainWindow;
