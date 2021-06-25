import * as React from "react";
import { Badge, Button, HStack } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";

interface PropTypes {
  groupName: string;
  caseName: string;
  pointsDefined: boolean;
  points: number;
  shouldShowPoints: boolean;
}
const CaseItem = ({
  groupName,
  caseName,
  pointsDefined,
  points,
  shouldShowPoints,
}: PropTypes) => {
  const ioStore = useStoreState((state) => state.selected.data);
  const setSelectedCase = useStoreActions(
    (actions) => actions.selected.setSelected
  );
  const selectedCase = useStoreState((state) => state.selected.selected);
  const createCase = useStoreActions((actions) => actions.selected.createCase);

  function findSelectedCase(): boolean {
    let found = false;
    ioStore.forEach((element) => {
      if (element.groupName === groupName && element.caseName === caseName) {
        found = true;
        return;
      }
    });
    return found;
  }

  function handleSelectedCase() {
    if (!findSelectedCase()) {
      createCase({
        groupName: groupName,
        caseName: caseName,
        inputData: "",
        mode: "modern",
        outputData: "",
      });
    }
    setSelectedCase({
      caseName: caseName,
      groupName: groupName,
    });
  }

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={() => handleSelectedCase()}
      isActive={
        selectedCase?.caseName === caseName &&
        selectedCase.groupName === groupName
      }
    >
      <HStack>
        <span>{caseName}</span>
        {shouldShowPoints && (
          <Badge colorScheme={pointsDefined ? "green" : "blue"}>
            {points.toFixed(2) + " PTS"}
          </Badge>
        )}
      </HStack>
    </Button>
  );
};

export default CaseItem;
