import * as React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Code,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { languages } from "../../Solution/SolutionMainWindow";
import { useState } from "react";
import ReactAce from "react-ace";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";

languages.forEach((language) => {
  require(`ace-builds/src-noconflict/mode-${language.ace}`);
});

const languagesCode = {
  cpp: `#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main() {
  const string GRUPO = "sin_grupo/" // sin_grupo/, easy/, ...
  const string CASO = "1"; 
  
  ifstream in(GRUPO + CASO + ".in");
  streambuf *cinbuf = cin.rdbuf();
  cin.rdbuf(in.rdbuf());
  
  ios_base::sync_with_stdio(0);
  cin.tie(0);
    
  ofstream out(GRUPO + CASO +".out");
  streambuf *coutbuf = cout.rdbuf(); 
  cout.rdbuf(out.rdbuf()); 
  
  restoDelCodigo();
}`,
  python: `
import sys

sys.stdin = open('1.in', 'r')
sys.stdout = open('1.out', 'w')
  `,
};

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal = (props: PropTypes) => {
  const { isOpen, onClose } = props;

  const [languageIndex, setLanguage] = useState(0);

  const codeStyle = useColorModeValue("tomorrow", "monokai");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Descargar .in </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={5}>
          <FormControl>
            <FormLabel> Lenguaje</FormLabel>
            <Select
              size={"sm"}
              onChange={(e) => setLanguage(parseInt(e.target.value))}
            >
              {languages.map((language, index) => (
                <option
                  key={language.ace + index}
                  value={index}
                  selected={index === languageIndex}
                >
                  {language.ide}
                </option>
              ))}
            </Select>
          </FormControl>
          <Text mt={5}>
            Agrega esto a <Code>codigo_solucion</Code>. Por cada grupo, cambia{" "}
            <Code>GRUPO</Code> por el <strong> nombre de la carpeta</strong> del
            grupo. Por cada caso, cambia <Code>CASO</Code> por el nombre del
            archivo <Code>.in</Code>, ejecuta el programa y repite.
          </Text>
          <Box mt={2}>
            <ReactAce
              mode={languages[languageIndex].ace}
              theme={codeStyle}
              fontSize={14}
              width={"100%"}
              height={"280px"}
              value={languagesCode["cpp"]}
              readOnly
            />
          </Box>
          <Alert status="error" mt={2}>
            <AlertIcon />
            <AlertTitle mr={2}>
              No cambies el nombre ni muevas ningún archivo
            </AlertTitle>
          </Alert>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DownloadModal;
