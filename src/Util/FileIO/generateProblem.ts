import Store from "../../Redux/Store";
import JSZip from "jszip";
import { getCaseContent } from "./download";
import { IGroup } from "../../Redux/Models/CasesModel";

/* La estructura del zip debe de ser

cases/
  case1.in
  case1.out
  easy.case1.in
  easy.case1.out

statements/
  es.markdown

solutions/
  es.markdown

testplan
  easy.case1 puntos
  easy.case2 0
  ...
  sin_grupo.case1 puntos1
  sin_grupo.case2 puntos2
  ...
 */

const getStatements = (zip: JSZip) => {
  const folder = zip.folder("statements");
  const markdownData = Store.getState().writing.all;
  folder?.file("markdown.es", markdownData);
};

const getSolution = (zip: JSZip) => {
  const folder = zip.folder("solutions");
  const solutionMarkdownData = Store.getState().solution.text;
  folder?.file("markdown.es", solutionMarkdownData);
};

const getGroupFromId = (groupId: string) => {
  return Store.getState().cases.data.find(
    (groupElement) => groupElement.groupId === groupId
  );
};

const getCaseFromId = (caseId: string, groupData: IGroup) => {
  return groupData.cases.find((caseElement) => caseElement.caseId === caseId);
};

const getCasesAndTestPlan = (zip: JSZip) => {
  const folder = zip.folder("cases");
  let testplanData = "";
  const groupsDefined = new Set();

  const casesInputData = Store.getState().input.data;
  casesInputData.forEach((caseElement) => {
    const groupData = getGroupFromId(caseElement.id.groupId);
    if (groupData === undefined) {
      return;
    }
    const caseData = getCaseFromId(caseElement.id.caseId, groupData);
    if (caseData === undefined) {
      return;
    }

    const groupName = groupData.name;
    const caseName = caseData.name;
    const fileName = groupName + "." + caseName;

    const lineData = getCaseContent(caseElement.lines);
    const outData = caseElement.outData;

    folder?.file(fileName + ".in", lineData);
    folder?.file(fileName + ".out", outData);

    // Testplan calculation

    // Si es sin_grupo, simplemente paso al segundo, porque nunca estará definido
    if (
      !(groupData.name === "sin_grupo") &&
      !groupsDefined.has(groupData.groupId)
    ) {
      groupsDefined.add(groupData.groupId);
      testplanData += fileName + " " + groupData.points + "\n";
    } else {
      testplanData += fileName + " " + caseData.points + "\n";
    }
  });
  console.log(testplanData);
  zip.file("testplan", testplanData);
};

export const generateProblem = () => {
  let zip = new JSZip();
  getStatements(zip);
  getSolution(zip);
  getCasesAndTestPlan(zip);
};
