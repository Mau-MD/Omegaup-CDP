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

const defaultMarkdown = `
# Descripción

# Entrada 

# Salida 

# Ejemplo 
||input
1
2
||output
Case #1: 3
||description
Explicación
||input 
5
10
||output
Case #2: 15
Case #3: 15
14
||description 
hola
||end

# Limites


`;
const markdownHtml = parse(`
# Descripción

Esta es la descripción del problema. Inventa una historia creativa. 
Puedes utilizar matemáticas inline para hacer $x_i, y_i$, o $z_i$ o incluso:
$$x=\\frac{b\\pm \\sqrt{b^2 -4ac}}{2a}$$

# Entrada

Aquí va la descripción de la entrada del problema.

# Salida

Esta es la descripción de la salida esperada.

# Ejemplo

||input
1
2
||output
Case #1: 3
||description
Explicación
||input 
5
10
||output
Case #2: 15
Case #3: 15
14
||description 
hola
||input
3
4
||output
3
||description
hola
||end

# Límites

* Aquí
* Van
* Los
* Límites`);

const Display = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [showEditor, setShowEditor] = useState(true);

  const divRef = useRef<HTMLDivElement>(null);
  const generateRef = useRef<HTMLButtonElement>(null);
  const hideRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (divRef.current != null)
      divRef.current.innerHTML = parse(defaultMarkdown);
    document.addEventListener("keydown", (key) => handleKeyPress(key));
    return () =>
      document.removeEventListener("keydown", (key) => handleKeyPress(key));
  }, []);

  const style = useColorModeValue("light", "dark");

  function handleKeyPress(key: KeyboardEvent) {
    console.log(key);
    if (key.ctrlKey && key.which === 83 && generateRef.current !== null) {
      generateRef.current.click();
      generateRef.current.focus();
    }
    if (key.ctrlKey && key.which === 72 && hideRef.current !== null) {
      hideRef.current.click();
      hideRef.current.focus();
    }
  }

  function generateMarkdown() {
    console.log(markdown);
    if (divRef.current != null) divRef.current.innerHTML = parse(markdown);
  }

  return (
    <>
      <Flex direction={"column"} w={"100%"}>
        <Tabs size={"sm"} isFitted w={"100%"}>
          <TabList>
            <Tab>Todo</Tab>
            <Tab>Descripción</Tab>
            <Tab>Entrada</Tab>
            <Tab>Salida</Tab>
            <Tab>Ejemplo</Tab>
            <Tab>Limites</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex>
                {showEditor && (
                  <ReactMde
                    value={markdown}
                    onChange={setMarkdown}
                    generateMarkdownPreview={(markdown) =>
                      Promise.resolve(parse(markdown))
                    }
                  />
                )}
                <Box
                  ml={5}
                  w={"50%"}
                  ref={divRef}
                  className={style + " markdown"}
                />
              </Flex>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Box pos={"fixed"} right={10} bottom={5}>
        <Button
          mr={4}
          ref={hideRef}
          size={"sm"}
          colorScheme={"blue"}
          onClick={() => setShowEditor(!showEditor)}
        >
          <HStack>
            <Text> Ocultar Editor</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + H
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
