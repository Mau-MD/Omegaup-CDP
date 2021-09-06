export function makeAll(state: any) {
  return (
    state.description +
    "\n" +
    state.input +
    "\n" +
    state.output +
    "\n" +
    state.example +
    "\n" +
    state.limits
  );
}

export function findSections(markdown: string[]) {
  const sections = [
    "# Descripción",
    "# Entrada",
    "# Salida",
    "# Ejemplo",
    "# Límites",
  ];
  let sectionInfo: string[][] = [];
  let info: string[] = [];
  let sectionIndex = 0;
  markdown.forEach((line) => {
    if (line.trim() === sections[sectionIndex]) {
      sectionInfo.push(info);
      sectionIndex++;
      info = [];
    }
    info.push(line);
  });
  sectionInfo.push(info);
  return sectionInfo;
}

export const initialMarkdownValue = {
  all: `# Descripción

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
||end

# Límites

* Aquí
* Van
* Los
* Límites
`,
  description: `# Descripción
  
Esta es la descripción del problema. Inventa una historia creativa.
Puedes utilizar matemáticas inline para hacer $x_i, y_i$, o $z_i$ o incluso:
$$x=\\frac{b\\pm \\sqrt{b^2 -4ac}}{2a}$$
`,
  input: `# Entrada

Aquí va la descripción de la entrada del problema.
`,
  output: `# Salida

Esta es la descripción de la salida esperada.
`,
  example: `# Ejemplo 

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
||end
`,
  limits: `# Límites

* Aquí
* Van
* Los
* Límites
`,
}
