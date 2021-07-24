import { useEffect, useState } from "react";
import { caseIdentifier, IInput, ILine } from "../Redux/Models/InputModel";
import { useStoreActions, useStoreState } from "../Redux/Store";
import { ICase } from "../Redux/Models/CasesModel";
import _ from "lodash";

export const useInputPage = (caseData: ICase) => {
  const [pageData, setPageData] = useState<ILine[]>([]);
  const inputData = useStoreState((state) => state.input.data);
  const addInputPage = useStoreActions((actions) => actions.input.addData);

  const caseIdentifier = {
    groupId: caseData.groupId,
    caseId: caseData.caseId,
  };

  useEffect(() => {
    const inputPage = inputData.find((inputElement) => {
      // return JSON.stringify(inputElement.id) === JSON.stringify(caseIdentifier);
      return _.isEqual(inputElement.id, caseIdentifier);
    });
    if (inputPage === undefined) {
      addInputPage({ id: caseIdentifier, lines: [] });
      setPageData([]);
    } else {
      setPageData(inputPage.lines);
    }
  }, [caseData, inputData]);

  return {pageData, setPageData};
};
