import JSZip from "jszip";
import { readJSON } from "../asyncFunctions";

export const loadProblem = async (zip: any) => {
  try {
    const zipData = await JSZip.loadAsync(zip);
    const storeData = await readJSON(zipData.files["cdp.data"]);
    sessionStorage.setItem("[EasyPeasyStore][0]", JSON.stringify(storeData));
  } catch {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target == null) return;
      let storeData = JSON.parse(
        typeof event.target.result === "string" ? event.target.result : ""
      );
      sessionStorage.setItem("[EasyPeasyStore][0]", JSON.stringify(storeData));
    };
    reader.readAsText(zip);
  }
};
