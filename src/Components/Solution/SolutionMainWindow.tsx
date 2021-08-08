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
import { useState } from "react";

const SolutionMainWindow = () => {
  const [markdown, setMarkdown] = useState(
    "Escribe aquí la solución de tu problema"
  );
  const editorStyle = useColorModeValue("light", "dark");
  const codeStyle = useColorModeValue("tomorrow", "monokai");
  // 48 y 10 de padding
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
                <option> C++</option>
                <option> C</option>
                <option> C#</option>
                <option> Javascript</option>
                <option> Javascript</option>
                <option> Javascript</option>
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
            height={"695px"}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
          />
        </Box>
      </Box>
      <Box ml={5}>
        <Text>Redacción</Text>
        <Box className={editorStyle}>
          <ReactMde value={markdown} onChange={setMarkdown} />{" "}
        </Box>
      </Box>
    </Flex>
  );
};

export default SolutionMainWindow;
