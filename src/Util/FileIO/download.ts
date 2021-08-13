import { IInput, IInputModel } from "../../Redux/Models/InputModel";
import { IGroup } from "../../Redux/Models/CasesModel";
import { saveAs } from "file-saver";

export const downloadInFiles = (cases: IInput[], groups: IGroup[]) => {
  // Primero necesito agruparlo por grupos
  // Buscar cuantos grupos hay
  groups.forEach((group) => {
    // Todos los cases que tengan el mismo grupo
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
        const blob = new Blob([result], { type: "text/plain:charset=utf-8" });
        // Necesito el nombre del caso
        const caseName = group.cases.find(
          (caseToFind) => caseToFind.caseId === caseElement.id.caseId
        )?.name;
        const groupName = group.name.toLowerCase().replaceAll(" ", "_");
        saveAs(blob, groupName + "-" + caseName + ".in");
      });
    }
  });
};
