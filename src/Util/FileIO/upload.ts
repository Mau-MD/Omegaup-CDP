import JSZip from "jszip";

export const readOutputZip = (zip: any) => {
  // First we should separate in groups

  return new Promise((resolve, reject) => {
    JSZip.loadAsync(zip)
      .then((zip) => {
        console.log(zip);
        resolve("Zip Read");
      })
      .catch((err) => reject(Error(err)));
  });
};
