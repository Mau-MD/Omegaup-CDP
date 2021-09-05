import { action, Action } from "easy-peasy";
import { splitBetweenTwo } from "../../libs/markdown/Parser";

function makeAll(state: any) {
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
  // ${state.description}
  //
  // ${state.input}
  //
  // ${state.output}
  //
  // ${state.example}
  //
  // ${state.limits}
  // `;
}

function findSections(markdown: string[]) {
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

export interface IWritingModel {
  all: string;
  description: string;
  input: string;
  output: string;
  example: string;
  limits: string;
  error: boolean;

  set: Action<IWritingModel, { markdown: string; index: number }>;
  setAll: Action<IWritingModel, string>;
  setDescription: Action<IWritingModel, string>;
  setInput: Action<IWritingModel, string>;
  setOutput: Action<IWritingModel, string>;
  setExample: Action<IWritingModel, string>;
  setLimits: Action<IWritingModel, string>;
  setError: Action<IWritingModel, boolean>;

  handleAll: () => string;
}

const WritingModel = {
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
  error: false,

  set: action((state, payload) => {
    switch (payload.index) {
      case 0:
        state.all = payload.markdown;
        const sectionData = findSections(payload.markdown.split("\n"));
        if (sectionData.length < 6) {
          state.error = true;
          return;
        }
        state.error = false;
        state.description = sectionData[1].join("\n");
        state.input = sectionData[2].join("\n");
        state.output = sectionData[3].join("\n");
        state.example = sectionData[4].join("\n");
        state.limits = sectionData[5].join("\n");
        return;
      case 1:
        state.description = payload.markdown;
        break;
      case 2:
        state.input = payload.markdown;
        break;
      case 3:
        state.output = payload.markdown;
        break;
      case 4:
        state.example = payload.markdown;
        break;
      case 5:
        state.limits = payload.markdown;
        break;
    }
    state.all = makeAll(state);
    //console.log(state.all);
  }),
  setAll: action((state, payload) => {
    state.all = payload;
    makeAll(state);
  }),
  setDescription: action((state, payload) => {
    state.description = payload;
    makeAll(state);
  }),
  setInput: action((state, payload) => {
    state.input = payload;
    makeAll(state);
  }),
  setOutput: action((state, payload) => {
    state.output = payload;
    makeAll(state);
  }),
  setExample: action((state, payload) => {
    state.example = payload;
    makeAll(state);
  }),
  setLimits: action((state, payload) => {
    state.limits = payload;
    makeAll(state);
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
} as IWritingModel;

export default WritingModel;
