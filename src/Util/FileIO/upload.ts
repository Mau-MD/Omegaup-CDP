import JSZip from "jszip";

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

export const readJSON = async (JSONFile: JSZip.JSZipObject, zip: JSZip) => {
  const groupIds = await JSONFile.async("string");
  const JSONData = JSON.parse(groupIds);
  return JSONData;
};

export const readOutputZip = (zip: any) => {
  // First we should separate in groups

  // Create groups with specific id given in the zip file. Search in the state for that id, and assign every case based in the name? I think we need to add an id too when downloading
  // I have all the ids in a single json file

  // First I need to create an array with all the .out with their respective IDS

  return new Promise((resolve, reject) => {
    // const outGroups: IOutGroup[] = [];
    const outGroups = new Map(); // Mapa con llaves como id y array como lo demas
    JSZip.loadAsync(zip)
      .then((zip) => {
        const dirs = getDirNames(zip); // Solo contienen el nombre del objetozip
        readJSON(getGroupIds(zip), zip).then((JSONData) => {
          Object.values(zip.files).forEach((fileObject) => {
            // Tengo que primero encontrar el id del grupo que pertenece
            const fileFullPath = fileObject.name;
            // Realmente solo queremos .outs
            if (
              fileFullPath.startsWith("__MACOSX") ||
              fileObject.dir ||
              fileFullPath.endsWith(".json")
            )
              return;
            const fileGroupName = fileFullPath.split("/")[1];
            // Ahora puedo buscar el id en el json con el nombre
            const groupId = JSONData[fileGroupName];
            console.log(fileFullPath, groupId);
            // Group id sera la llave del grupo y el objeto sera parte del array del mapa
            const casesArray = outGroups.get(groupId);
            if (casesArray === undefined) {
              outGroups.set(groupId, [fileObject]);
              return;
            }
            outGroups.set(groupId, [...casesArray, fileObject]);
          });
          console.log(outGroups);
          // Ya tengo los IDs
          // Iterar una vez por todos los archivos e ir guardando
        });
        // dirs.forEach((dir) => {
        //   const dirName = dir.split("/")[1];
        //   console.log(dirName);
        // });
        resolve("Yay");
      })
      .catch((err) => reject(Error(err)));
  });
};
