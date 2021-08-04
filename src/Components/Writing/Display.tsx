import * as React from "react";
import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import { Flex, useColorModeValue } from "@chakra-ui/react"; // `rehype-katex` does not import the CSS for you
import { parse } from "./Markdown/Parser";
import "./Markdown/MarkdownDark.css";
import "./Markdown/MarkdownLight.css";
import "./Markdown/Markdown.css";
import MarkdownIt from "markdown-it";
// @ts-ignore
import markdownMath from "markdown-it-texmath";
// @ts-ignore
import katex from "katex";

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
  const style = useColorModeValue("light", "dark");
  const divRef = useRef(null);


  useEffect(() => {
    if (divRef.current !== null) divRef.current.innerHTML = markdownHtml;
  }, []);

  return (
    <Flex direction={"column"}>
      <div ref={divRef} className={style + " markdown"} />
    </Flex>
  );
};

export default Display;
