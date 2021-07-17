import { useStoreState } from "../Redux/Store";
import { useEffect, useState } from "react";
import { ICase } from "../Redux/Models/CasesModel";

export const useSelectedData = () => {
  const emptyObject: ICase = {
    name: "None",
    caseId: "None",
    groupId: "None",
    points: 0,
    defined: false,
  };

  const [groupName, setGroupName] = useState("None");
  const [caseData, setCaseData] = useState<ICase>(emptyObject);

  const selectedCase = useStoreState((state) => state.cases.selected);
  const selectedData = useStoreState((state) => state.cases.selectedData);

  useEffect(() => {
    if (selectedCase.caseId !== "none" || selectedCase.groupId !== "none") {
      const objectData = selectedData(
        selectedCase.groupId,
        selectedCase.caseId
      );
      setGroupName(objectData.groupName);
      setCaseData(objectData.caseData);
    }
  }, [selectedCase]);

  return { groupName, caseData };
};
