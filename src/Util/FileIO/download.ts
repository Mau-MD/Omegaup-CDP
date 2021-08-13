import { IInput, IInputModel } from "../../Redux/Models/InputModel";
import { IGroup } from "../../Redux/Models/CasesModel";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export const downloadInFiles = (cases: IInput[], groups: IGroup[]) => {
  // Primero necesito agruparlo por grupos
  // Buscar cuantos grupos hay
  let zip = new JSZip(); // Crear nuevo zip
  groups.forEach((group) => {
    // Todos los cases que tengan el mismo grupo

    const groupName = group.name.toLowerCase().replaceAll(" ", "_");
    let folder = zip.folder(groupName); // Crear folder del grupo
    const groupCases = cases.filter(
      (caseElement) => caseElement.id.groupId === group.groupId
    );

    if (groupCases !== undefined) {
      // Ya tengo todos los casos del grupo. Ahora necesito sacar la string que ira a .out
      groupCases.forEach((caseElement) => {
        const result = caseElement.lines.reduce((prev: string, curr) => {
          if (curr.type === "line" || curr.type === "multiline") {
            return prev + curr.value + "\n";
          }
          if (curr.type === "array") {
            return prev + curr.arrayData?.value + "\n";
          }
          return prev + curr.matrixData?.value + "\n";
        }, "");
        console.log(result);
        const caseName = group.cases.find(
          (caseToFind) => caseToFind.caseId === caseElement.id.caseId
        )?.name;
        folder?.file(caseName + ".in", result);
      });
    }
  });
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "test.zip");
  });
};
