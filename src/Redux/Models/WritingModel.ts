import { action, Action } from "easy-peasy";

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

export interface IWritingModel {
  all: string;
  description: string;
  input: string;
  output: string;
  example: string;
  limits: string;

  set: Action<IWritingModel, { markdown: string; index: number }>;
  setAll: Action<IWritingModel, string>;
  setDescription: Action<IWritingModel, string>;
  setInput: Action<IWritingModel, string>;
  setOutput: Action<IWritingModel, string>;
  setExample: Action<IWritingModel, string>;
  setLimits: Action<IWritingModel, string>;

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

  set: action((state, payload) => {
    switch (payload.index) {
      case 0:
        state.all = payload.markdown;
        break;
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
    console.log(state.all);
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
} as IWritingModel;

export default WritingModel;
