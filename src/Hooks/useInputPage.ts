import { useEffect, useState } from "react";
import { caseIdentifier, IInput, ILine } from "../Redux/Models/InputModel";
import { useStoreActions, useStoreState } from "../Redux/Store";
import { ICase } from "../Redux/Models/CasesModel";

export const useInputPage = (caseData: ICase) => {
  const [pageData, setPageData] = useState<ILine[]>([]);
  const inputData = useStoreState((state) => state.input.data);
  const addInputPage = useStoreActions((actions) => actions.input.addData);

  useEffect(() => {
    const caseIdentifier = {
      groupId: caseData.groupId,
      caseId: caseData.caseId,
    };
    const inputPage = inputData.find((inputElement) => {
      return JSON.stringify(inputElement.id) === JSON.stringify(caseIdentifier);
    });

    console.log(inputPage);
    if (inputPage === undefined) {
      addInputPage({ id: caseIdentifier, lines: [] });
      console.log("Created New");
      setPageData([]);
    } else {
      console.log("Loaded");
      setPageData(inputPage.lines);
    }
  }, [caseData, inputData]);

  return pageData;
};
