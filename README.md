## Omegaup Creador de Problemas `ALPHA`

[![Website](https://img.shields.io/website?label=OmegaupCDP.com&style=for-the-badge&url=https%3A%2F%2Fmau-md.github.io/Omegaup-CDP)](https://mau-md.github.io/OmegaupCDP)

![imagen](https://user-images.githubusercontent.com/74751751/128214017-18547414-3216-4886-9577-4da39d1e596a.png)

<p align="center">
Layout principal
</p>

---
### ¿Qué es?

Omegaup CDP es una API el cual facilita y simplifica la creación de problemas para la plataforma [OmegaUp](http://omegaup.com), mediante la implementación de una UI intuitiva y feautures útiles. 

### ¿Cuál es la necesidad?

Actualmente para crear un problema, se necesita cumplir con ciertos requisitos de nombre de folders, generar casos `.in` y `.out` con una estructura constante, crear archivos `.testplan` y asegurarse que todo esté bien. Este proceso suele ser tardado y tedioso cuando se quiere crear un problema con rapidez, especialmente si estos problemas se van a utilizar para enseñar algún concepto sobre la programación competitiva.

### Preview

Puedes ver los avances de la aplicacíon en este [link](http://mau-md.github.io/Omegaup-CDP). Actualmente está hosteada en GitHub Pages, pero en un futuro se hosteará en algún lugar externo.

---

## Features 
OmegaUp CDP sigue en estado `ALPHA`, faltan muchas features por agregar, y estas probablementen puedan cambiar a lo largo del desarrollo.

### Creacion de Grupos y Casos de Prueba
| Grupo | Caso |
| ----- | ---- |
| ![imagen](https://user-images.githubusercontent.com/74751751/128216877-e2a27264-b8cd-4ce2-bdd0-050c5bb374af.png) | ![imagen](https://user-images.githubusercontent.com/74751751/128216941-07d215ca-365b-4b30-9258-55b78c6e35cb.png) |

### Organización de archivo `.in` mediante lineas individuales y labels
<p align="center">
  <img src="https://user-images.githubusercontent.com/74751751/128217256-e9558c92-e69f-4568-ad33-bb186ee3831e.png">
</p>

### Generador de arrelgos y matrices
| Arreglos | Matrices |
| ----- | ---- |
| ![imagen](https://user-images.githubusercontent.com/74751751/128217521-552617fa-7a3e-4384-83cf-e9c31f1cade8.png) | ![imagen](https://user-images.githubusercontent.com/74751751/128217655-c6715dd0-fb01-474c-80bc-0178105d98a6.png) |

### Layout predeterminado para que todos los casos mantengan un formato constante
Al momento de crear un caso nuevo, se cargará automáticamente con este layout
<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/74751751/128217904-5cbc3cba-b8af-42d8-ac1f-77f40628328a.png">
</p>

### Render de Markdown con estilo de Omegaup
![imagen](https://user-images.githubusercontent.com/74751751/128218206-7b740e44-26e4-4c53-96f9-da125ebcce66.png)

### Modo Oscuro Totalmente Compatible
![imagen](https://user-images.githubusercontent.com/74751751/128218322-3354d862-a039-47e6-9209-73075bd6b323.png)

![imagen](https://user-images.githubusercontent.com/74751751/128218338-d56c24d8-6bd0-4456-a5dd-7cb602e2ca05.png)

### Edición Individual de Markdown [WIP]
Poder separar `Descripcion`, `Problema`, `Entrada` y `Salida` en diferentes pestañas para facilitar la edición. De la misma manera tener una opcion donde todo esté en una misma pestaña

### Autogeneracion de archivo `.out`. [WIP]
Utilizar un compilador en línea el cual, dado lo ingresado en las lenias `.in`, se pueda obtener automaticamente un archivo `.out` conteniendo la salida.

### Generación de archivo `.zip` para poder subir el problema a OmegaUp [WIP]

### Generacion de archivo `.json` para poder cargar el problema generado cuando sea en **OmegaupCDP** [WIP]
