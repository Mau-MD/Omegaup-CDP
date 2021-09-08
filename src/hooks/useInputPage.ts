import { useEffect, useState } from "react";
import {   ILine } from "../redux/models/input/inputInterfaces";
import { useStoreActions, useStoreState } from "../redux/store";
import { ICase } from "../redux/models/cases/casesInterfaces";
import _ from "lodash";
import { uuid } from "uuidv4";

// Loads/Creates an Input Page base on the selected case
export const useInputPage = (caseData: ICase) => {
  const [pageData, setPageData] = useState<ILine[]>([]);

  const inputData = useStoreState((state) => state.input.data);
  const layout = useStoreState((state) => state.input.layout);
  const selected = useStoreState((state) => state.cases.selected);

  const addInputPage = useStoreActions((actions) => actions.input.addData);

  const caseIdentifier = {
    groupId: caseData.groupId,
    caseId: caseData.caseId,
  };

  useEffect(() => {
    if (selected.caseId === "None" || selected.groupId === "None") return;

    const inputPage = inputData.find((inputElement) => {
      return _.isEqual(inputElement.id, caseIdentifier);
    });

    // Page doesn't exit, create one
    if (inputPage === undefined) {
      // Layout is not defined
      if (layout !== undefined) {
        // Create new random id's so they don't overlap
        const layoutNewIds = layout.map((layoutElement) => {
          layoutElement.lineId = uuid();
          return layoutElement;
        });
        addInputPage({ id: caseIdentifier, lines: layoutNewIds, outData: "" });
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
