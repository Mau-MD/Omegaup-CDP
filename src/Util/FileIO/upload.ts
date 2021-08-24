import JSZip from "jszip";

interface IOutGroup {
  groupId: string;
  outData: IOutData[];
}

interface IOutData {
  caseId: string;
  outData: string;
}

const getDirNames = (zip: JSZip) => {
  const dirs = Object.keys(zip.files).filter((filename, index) => {
    return (
      index !== 0 && !filename.startsWith("__MACOSX") && zip.files[filename].dir
    );
  });
  return dirs;
};

export const readOutputZip = (zip: any) => {
  // First we should separate in groups

  // Create groups with specific id given in the zip file. Search in the state for that id, and assign every case based in the name? I think we need to add an id too when downloading
  // I have all the ids in a single json file

  // First I need to create an array with all the .out with their respective IDS

  return new Promise((resolve, reject) => {
    const outGroups: IOutGroup[] = [];
    JSZip.loadAsync(zip)
      .then((zip) => {
        const dirs = getDirNames(zip);
        console.log(zip);
        dirs.forEach((dir) => {});
        console.log(dirs);
        resolve("Yay");
      })
      .catch((err) => reject(Error(err)));
  });
};
