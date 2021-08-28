import JSZip, { JSZipObject } from "jszip";

// Use a hashmap instead
interface IOutGroup {
  groupId: string;
  outData: IOutData[];
}

interface IOutData {
  caseId: string;
  outData: string;
}

const getDirNames = (zip: JSZip) => {
  return Object.keys(zip.files).filter(
    (filename, index) =>
      index !== 0 && !filename.startsWith("__MACOSX") && zip.files[filename].dir
  );
};

const getGroupIds = (zip: JSZip) => {
  const groupIdsFileName = Object.keys(zip.files).find(
    (filename) => filename.split("/")[1] === "ids.json"
  );
  if (groupIdsFileName !== undefined) {
    return zip.files[groupIdsFileName];
  }
  return zip.files[""];
};

export const readJSON = async (JSONFile: JSZip.JSZipObject) => {
  const JSONData = await JSONFile.async("string");
  return JSON.parse(JSONData);
};

export const asyncForEach = async (array: any, callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const getGroupCasesIds = async (
  groupsIds: any,
  zipFilesArray: JSZip.JSZipObject[]
) => {
  const casesIds = new Map();
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

const separateFilesInGroups = (
  groupsIds: any,
  casesIds: Map<any, any>,
  zipFilesArray: JSZipObject[]
) => {
  const outGroups = new Map();
  zipFilesArray.forEach((fileObject) => {
    const fileFullPath = fileObject.name;
    // Realmente solo queremos .outs
    if (fileObject.dir || fileFullPath.endsWith(".json")) return;
    const splittedFileFullPath = fileFullPath.split("/");
    const fileGroupName = splittedFileFullPath[1];
    const fileNameExtension = splittedFileFullPath[2];
    const fileName = fileNameExtension.slice(0, fileNameExtension.length - 3);
    console.log(fileName);

    // Ahora puedo buscar el id en el json con el nombre
    const groupId = groupsIds[fileGroupName];
    const caseId = casesIds.get(groupId)[fileName];
    // Group id sera la llave del grupo y el objeto sera parte del array del mapa
    const casesArray = outGroups.get(groupId);
    if (casesArray === undefined) {
      outGroups.set(groupId, [
        {
          caseId,
          fileObject,
        },
      ]);
      return;
    }
    outGroups.set(groupId, [...casesArray, { caseId, fileObject }]);
  });
  return outGroups;
};

export const readOutputZip = async (zip: any) => {
  // const outGroups = new Map(); // Mapa con llaves como id y array como lo demas
  // Otro mapa donde este guardado los ids de los grupos, pero que tenga almacenado su archivo con ids ya parseado
  const zipData = await JSZip.loadAsync(zip);
  const JSONData = await readJSON(getGroupIds(zipData));
  const zipFilesArray = Object.values(zipData.files).filter(
    (fileObject) => !fileObject.name.startsWith("__MACOSX")
  );

  const casesIds = await getGroupCasesIds(JSONData, zipFilesArray);
  const outGroups = separateFilesInGroups(JSONData, casesIds, zipFilesArray);
  // Tambien ya debo de buscar el id del caso

  console.log(casesIds);
  console.log(outGroups);
};
