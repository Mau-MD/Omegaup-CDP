import JSZip from "jszip";

export const readJSON = async (JSONFile: JSZip.JSZipObject) => {
  const JSONData = await JSONFile.async("string");
  return JSON.parse(JSONData);
};

export const asyncForEach = async (array: any, callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
