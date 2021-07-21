import * as React from "react";
import { Badge, Button, HStack } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import { ICase } from "../../../Redux/Models/CasesModel";

interface PropTypes extends ICase {
  shouldShowPoints: boolean;
}
const CaseItem = (props: PropTypes) => {
  const { name, points, caseId, groupId, defined, shouldShowPoints } = props;

  const setSelectedCase = useStoreActions(
    (actions) => actions.cases.setSelected
  );
  const selectedCase = useStoreState((state) => state.cases.selected);

  function handleSelectedCase() {
    setSelectedCase({ caseId: caseId, groupId: groupId });
  }

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={() => handleSelectedCase()}
      isActive={
        selectedCase.caseId === caseId && selectedCase.groupId === groupId
      }
    >
      <HStack>
        <span>{name}</span>
        {shouldShowPoints && (
          <Badge colorScheme={defined ? "green" : "blue"}>
            {points.toFixed(2) + " PTS"}
          </Badge>
        )}
      </HStack>
    </Button>
  );
};

export default React.memo(CaseItem);
