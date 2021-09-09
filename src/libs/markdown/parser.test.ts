import { toGFM } from "./parser";
import { initialMarkdownValue } from "../../redux/models/writing/writingLogic";

const githubStyleMarkdown = `# Descripción

Esta es la descripción del problema. Inventa una historia creativa.
Puedes utilizar matemáticas inline para hacer $x_i, y_i$, o $z_i$ o incluso:

$$
x=\\frac{b\\pm \\sqrt{b^2 -4ac}}{2a}
$$


# Entrada

Aquí va la descripción de la entrada del problema.

# Salida

Esta es la descripción de la salida esperada.

# Ejemplo

| Entrada | Salida | Descripcion| 
| - | - | -| 
|<pre>1</pre><pre>2</pre>|<pre>Case #1: 3</pre>|<pre>Explicación</pre>|
|<pre>5</pre><pre>10</pre>|<pre>Case #2: 15</pre>|<pre>hola</pre>|

# Límites

* Aquí
* Van
* Los
* Límites
`;

test("omegaUp Markdown to Github Flavored Markdown (Tables)", () => {
  expect(toGFM(initialMarkdownValue.all)).toBe(githubStyleMarkdown);
});
