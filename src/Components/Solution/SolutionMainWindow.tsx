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
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

import "../Writing/Markdown/EditorStyles/react-mde-all.css";
import "./AceStyles/darkTheme.css";

import ReactMde from "react-mde";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

// <option value={"C"}>C</option>
// <option value={"Cpp"}>C++</option>
// <option value={"Cpp14"}>C++ 14</option>
// <option value={"Csharp"}>C#</option>
// <option value={"Java"}>Java</option>
// <option value={"Perl"}>Perl</option>
// <option value={"Php"}>PHP</option>
// <option value={"Python"}>Python</option>
// <option value={"Python3"}>Python 3</option>

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

  function handleFontSize(e: number) {
    setFontSize(e);
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
