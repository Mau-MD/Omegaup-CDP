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
  const setSelectedCase = useStoreActions(
    (actions) => actions.cases.setSelected
  );
  const selectedCase = useStoreState((state) => state.cases.selected);

  function handleSelectedCase() {
    setSelectedCase({
      name: caseName,
      group: groupName,
    });
  }

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={() => handleSelectedCase()}
      isActive={
        selectedCase?.name === caseName && selectedCase.group === groupName
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
