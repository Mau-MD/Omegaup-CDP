import { IInput, IInputModel, ILine } from "../../Redux/Models/InputModel";
import { IGroup } from "../../Redux/Models/CasesModel";
import { saveAs } from "file-saver";
import JSZip from "jszip";

interface IOptions {
  txt?: boolean;
}

const getCaseContent = (lines: ILine[]) => {
  return lines.reduce((prev: string, curr) => {
    if (curr.type === "line" || curr.type === "multiline") {
      return prev + curr.value + "\n";
    }
    if (curr.type === "array") {
      return prev + curr.arrayData?.value + "\n";
    }
    return prev + curr.matrixData?.value + "\n";
  }, "");
};

const downloadGroup = (
  group: IGroup,
  cases: IInput[],
  problemName: string,
  options: IOptions,
  zip: JSZip
) => {
  const groupName = group.name.toLowerCase().replaceAll(" ", "_");
  let folder = zip.folder(groupName); // Crear folder del grupo
  folder?.file(groupName + ".id", group.groupId);
  const groupCases = cases.filter(
    (caseElement) => caseElement.id.groupId === group.groupId
  );

  if (groupCases !== undefined) {
    // Ya tengo todos los casos del grupo. Ahora necesito sacar la string que ira a .out
    groupCases.forEach((caseElement) => {
      const caseContent = getCaseContent(caseElement.lines);
      const caseName = group.cases.find(
        (caseToFind) => caseToFind.caseId === caseElement.id.caseId
      )?.name;
      folder?.file(caseName + (options.txt ? ".txt" : ".in"), caseContent);
    });
  }
};

export const downloadAllGroups = (
  cases: IInput[],
  groups: IGroup[],
  problemName: string,
  options: IOptions = { txt: false }
) => {
  // Primero necesito agruparlo por grupos
  // Buscar cuantos grupos hay
  let zip = new JSZip();
  groups.forEach((group) => {
    // Todos los cases que tengan el mismo grupo
    downloadGroup(group, cases, problemName, options, zip);
  });
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(
      content,
      problemName.toLowerCase().replaceAll(" ", "_") + "-input.zip"
    );
  });
};

export const downloadSingleGroup = (
  cases: IInput[],
  group: IGroup,
  problemName: string,
  options: IOptions = { txt: false }
) => {
  let zip = new JSZip();
  downloadGroup(group, cases, problemName, options, zip);
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(
      content,
      problemName.toLowerCase().replaceAll(" ", "_") + "-input.zip"
    );
  });
};

export const downloadSingleFile = (
  caseName: string,
  cases: IInput[],
  caseId: string,
  options: IOptions = { txt: false }
) => {
  const targetCase = cases.find(
    (caseElement) => caseElement.id.caseId === caseId
  );
  if (targetCase !== undefined) {
    const caseContent = getCaseContent(targetCase.lines);
    if (caseName !== undefined) {
      const blob = new Blob([caseContent], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(
        blob,
        caseName.toLowerCase().replaceAll(" ", "_") +
          (options.txt ? ".txt" : ".in")
      );
    }
  }
};
