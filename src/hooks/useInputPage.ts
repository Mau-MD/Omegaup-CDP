import { useEffect, useState } from "react";
import { caseIdentifier, IInput, ILine } from "../redux/models/input/inputModel";
import { useStoreActions, useStoreState } from "../redux/store";
import { ICase } from "../redux/models/cases/casesModel";
import _ from "lodash";
import { uuid } from "uuidv4";

export const useInputPage = (caseData: ICase) => {
  const [pageData, setPageData] = useState<ILine[]>([]);
  const inputData = useStoreState((state) => state.input.data);
  const addInputPage = useStoreActions((actions) => actions.input.addData);
  const layout = useStoreState((state) => state.input.layout);
  const selected = useStoreState((state) => state.cases.selected);

  const caseIdentifier = {
    groupId: caseData.groupId,
    caseId: caseData.caseId,
  };

  // TODO: El error es que se vuelve a crear el mismo caso despues de borrarlo ????
  useEffect(() => {
    if (selected.caseId === "None" || selected.groupId === "None") return;
    const inputPage = inputData.find((inputElement) => {
      // return JSON.stringify(inputElement.id) === JSON.stringify(caseIdentifier);
      return _.isEqual(inputElement.id, caseIdentifier);
    });
    if (inputPage === undefined) {
      if (layout !== undefined) {
        const layoutNewIds = layout.map((layoutElement) => {
          layoutElement.lineId = uuid();
          return layoutElement;
        });
        addInputPage({ id: caseIdentifier, lines: layoutNewIds, outData: "" });
        //console.log("Created New", layoutNewIds);
        //console.log("Created Id", caseIdentifier);
        setPageData(layoutNewIds);
      } else {
        addInputPage({ id: caseIdentifier, lines: [], outData: "" });
        setPageData([]);
      }
    } else {
      setPageData(inputPage.lines);
    }
  }, [caseData, inputData]);

  return { pageData, setPageData };
};
