import JSZip, { JSZipObject } from "jszip";
import { asyncForEach, readJSON } from "../asyncFunctions";

const getGroupIds = (zip: JSZip) => {
  const groupIdsFileName = Object.keys(zip.files).find(
    (filename) => filename.split("/")[1] === "ids.json"
  );
  if (groupIdsFileName !== undefined) {
    return zip.files[groupIdsFileName];
  }
  return zip.files[""];
};

const getGroupCasesIds = async (
  groupsIds: any,
  zipFilesArray: JSZip.JSZipObject[]
) => {
  const casesIds: Map<string, []> = new Map();
  await asyncForEach(zipFilesArray, async (fileObject: JSZip.JSZipObject) => {
    // Tengo que saber si es el json del grupo
    const fileFullPath = fileObject.name;
    if (!fileFullPath.endsWith(".json") || fileFullPath.split("/").length < 3)
      return;
    const fileGroupName = fileFullPath.split("/")[1];
    const groupId = groupsIds[fileGroupName];
    const groupIdsJSONData = await readJSON(fileObject);
    casesIds.set(groupId, groupIdsJSONData);
  });
  return casesIds;
};

const separateFilesInGroups = async (
  groupsIds: any,
  casesIds: Map<any, any>,
  zipFilesArray: JSZipObject[]
) => {
  const outGroups = new Map();
  await asyncForEach(zipFilesArray, async (fileObject: JSZip.JSZipObject) => {
    const fileFullPath = fileObject.name;
    // Realmente solo queremos .outs
    if (fileObject.dir || fileFullPath.endsWith(".json")) return;
    const splittedFileFullPath = fileFullPath.split("/");
    const fileGroupName = splittedFileFullPath[1];
    const fileNameExtension = splittedFileFullPath[2];
    const fileName = fileNameExtension.slice(0, fileNameExtension.length - 3);

    // Ahora puedo buscar el id en el json con el nombre
    const groupId = groupsIds[fileGroupName];
    const caseId = casesIds.get(groupId)[fileName];
    const caseData = await fileObject.async("string");
    // TODO: Realmente necesito los .out
    const casesArray = outGroups.get(groupId);
    if (casesArray === undefined) {
      outGroups.set(groupId, [
        {
          caseId,
          caseData,
        },
      ]);
      return;
    }
    outGroups.set(groupId, [...casesArray, { caseId, caseData }]);
  });
  return outGroups;
};

export const readOutputZip = async (zip: any) => {
  // TODO: Comprobar si es un zip valido

  const zipData = await JSZip.loadAsync(zip);
  const JSONData = await readJSON(getGroupIds(zipData));
  const zipFilesArray = Object.values(zipData.files).filter(
    (fileObject) => !fileObject.name.startsWith("__MACOSX")
  );

  const casesIds = await getGroupCasesIds(JSONData, zipFilesArray);
  const outGroups = await separateFilesInGroups(
    JSONData,
    casesIds,
    zipFilesArray
  );

  console.log(outGroups);
};
