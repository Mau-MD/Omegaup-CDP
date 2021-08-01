import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGFM from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Flex, useColorModeValue, VStack } from "@chakra-ui/react"; // `rehype-katex` does not import the CSS for you
import { sanitize } from "./Markdown/Sanitizer";
import "./Markdown/MarkdownDark.css";
import "./Markdown/MarkdownLight.css";
import "./Markdown/Markdown.css";

const markdownText = sanitize(`
# Descripción

Esta es la descripción del problema. Inventa una historia creativa.
Puedes utilizar matemáticas inline para hacer $x_i, y_i$, o $z_i$ o incluso:
$$x=\\frac{b\\pm \\sqrt{b^2 -4ac}}{2a}$$

# Entrada

Aquí va la descripción de la entrada del problema.

# Salida

Esta es la descripción de la salida esperada.

# Ejemplo


| Entrada | Salida | Descripcion| 
|-|-|-|
|hola|adios|si|
|hola|adios|si|



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

~hola~
~~hola~~
# Límites

* Aquí
* Van
* Los
* Límites`);

const Display = () => {
  const style = useColorModeValue("light", "dark");
  return (
    <Flex direction={"column"}>
      <ReactMarkdown
        className={style + " markdown"}
        remarkPlugins={[remarkMath, remarkGFM]}
        rehypePlugins={[rehypeKatex]}
        children={markdownText}
      />
    </Flex>
  );
};

export default Display;
