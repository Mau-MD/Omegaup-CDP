import * as React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Code,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  useColorModeValue,
  TabPanels,
} from "@chakra-ui/react";
import { languages } from "../../../Solution/SolutionMainWindow";
import { useState } from "react";
import ReactAce from "react-ace";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
import { useStoreState } from "../../../../Redux/Store";
import { downloadAllGroups } from "../../../../Util/FileIO/download";

languages.forEach((language) => {
  require(`ace-builds/src-noconflict/mode-${language.ace}`);
});

const c = `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
  const char *GRUPO = "sin_grupo/"; // sin_grupo, easy, ...
  const char *CASO = "1";

  char *dirIN = strcat(strcat(strcpy(malloc(strlen(GRUPO) + strlen(CASO) + 4), GRUPO), CASO), ".in");
  char *dirOUT = strcat(strcat(strcpy(malloc(strlen(GRUPO) + strlen(CASO) + 4), GRUPO), CASO), ".out");

  freopen(dirIN, "r", stdin);
  freopen(dirOUT, "w", stdout);
}
  `;
const cpp = `#include <iostream>
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
}`;
const python = `import sys

GRUPO = 'sin_grupo/' # sin_grupo/, easy/, ...
CASO = '1'

sys.stdin = open(GRUPO + CASO + '.in', 'r')
sys.stdout = open(GRUPO + CASO + '.out', 'w')
  `;
const java = `import java.io.*;
import java.util.Scanner;

public class Main {

  public static void main(String[] args) throws FileNotFoundException {
    final String GRUPO = "sin_grupo/"; // sin_grupo/, easy/, ...
    final String CASO = "1";

    PrintStream outStream = new PrintStream(new File(GRUPO + CASO + ".out"));
    System.setOut(outStream);

    Scanner input = new Scanner(new File(GRUPO + CASO + ".in"));

  }
}
  `;

const languagesCode = [c, cpp, cpp, java, python, python];

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const OutDownload = (props: PropTypes) => {
  const { isOpen, onClose } = props;

  const [languageIndex, setLanguage] = useState(0);

  const groupData = useStoreState((state) => state.cases.data);
  const inputData = useStoreState((state) => state.input.data);
  const problemName = useStoreState((state) => state.title.titleName);
  const codeStyle = useColorModeValue("tomorrow", "monokai");

  function downloadFiles(txt: boolean) {
    downloadAllGroups(inputData, groupData, problemName, { txt: txt });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Descargar Salida</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={5}>
          <Tabs size={"sm"}>
            <TabList>
              <Tab>
                Usando
                <Code>.in</Code>
              </Tab>
              <Tab>
                Usando
                <Code>.txt</Code>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl>
                  <FormLabel> Lenguaje</FormLabel>
                  <Select
                    size={"sm"}
                    onChange={(e) => setLanguage(parseInt(e.target.value))}
                  >
                    {languages.map(
                      (language, index) =>
                        language.ide !== "Csharp" && (
                          <option
                            key={language.ace + index}
                            value={index}
                            selected={index === languageIndex}
                          >
                            {language.ide}
                          </option>
                        )
                    )}
                  </Select>
                </FormControl>
                <Text mt={5}>
                  Agrega esto a <Code>codigo_solucion</Code>. Por cada grupo,
                  cambia <Code>GRUPO</Code> por el{" "}
                  <strong> nombre de la carpeta</strong> del grupo. Por cada
                  caso, cambia <Code>CASO</Code> por el nombre del archivo{" "}
                  <Code>.in</Code>, ejecuta el programa y repite.
                </Text>
                <Box mt={2}>
                  <ReactAce
                    mode={languages[languageIndex].ace}
                    theme={codeStyle}
                    fontSize={14}
                    width={"100%"}
                    height={"280px"}
                    value={languagesCode[languageIndex]}
                    readOnly
                  />
                </Box>
                <Text my={5}>
                  Despues, comprime la carpeta que descargaste y regresa a{" "}
                  <Code> OmegaupCDP </Code> y sube tus <Code>.out</Code>{" "}
                  generados dentro de <Code>Subir .out's</Code>
                </Text>
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  <AlertTitle mr={2}>
                    No cambies el nombre ni muevas ningún archivo/carpeta
                  </AlertTitle>
                </Alert>
              </TabPanel>
              <TabPanel>
                <Text mt={5}>
                  Copia y pega el contenido de cada <Code>.txt</Code> a tu
                  código como si hicieras una entrada normal.
                </Text>
                <Text mt={5}>
                  Despues, por cada salida generada, regresa a{" "}
                  <Code>OmegaupCDP</Code> y agrega tu salida manualmente desde
                  cada caso individual dentro de <Code>Editar Salida</Code>.
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <HStack mt={3}>
            <Button
              isFullWidth
              colorScheme={"green"}
              onClick={() => downloadFiles(false)}
            >
              Descargar .in's
            </Button>
            <Button
              isFullWidth
              colorScheme={"green"}
              onClick={() => downloadFiles(true)}
            >
              Descargar .txt's
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OutDownload;
