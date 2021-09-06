import * as React from "react";
import { Badge, Button, HStack } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "../../../redux/store";
import { ICase } from "../../../redux/models/cases/casesModel";

interface PropTypes extends ICase {
  shouldShowPoints: boolean;
}
const Case = (props: PropTypes) => {
  const { name, points, caseId, groupId, defined, shouldShowPoints } = props;

  const setSelectedCase = useStoreActions(
    (actions) => actions.cases.setSelected
  );

  const selectedCase = useStoreState((state) => state.cases.selected);
  const config = useStoreState((state) => state.config.caseConfig);

  function handleSelectedCase() {
    setSelectedCase({ caseId: caseId, groupId: groupId });
    if (config.goUp) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
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
            {points.toFixed(2)}
          </Badge>
        )}
      </HStack>
    </Button>
  );
};

export default React.memo(Case);
