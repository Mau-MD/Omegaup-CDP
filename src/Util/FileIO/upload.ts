import JSZip from "jszip";

export const readOutputZip = (zip: any) => {
  // First we should separate in groups

  // Create groups with specific id given in the zip file. Search in the state for that id, and assign every case based in the name? I think we need to add an id too when downloading
  // I have all the ids in a single json file
  return new Promise((resolve, reject) => {
    JSZip.loadAsync(zip)
      .then((zip) => {
        Object.keys(zip.files).forEach((filename) => {
          if (filename.startsWith("__MACOSX")) return; // Weird MACOS compress method
          console.log(filename);
          console.log(zip.files[filename]);
        });
        resolve("Yay");
      })
      .catch((err) => reject(Error(err)));
  });
};
