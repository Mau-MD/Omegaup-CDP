import * as React from "react";
import { Badge, Button, HStack } from "@chakra-ui/react";

interface PropTypes {
  groupName: string;
  caseName: string;
  pointsDefined: boolean;
  points: number;
  shouldShowPoints: boolean;
}
const CasesCaseItem = ({
  groupName,
  caseName,
  pointsDefined,
  points,
  shouldShowPoints,
}: PropTypes) => {
  return (
    <Button variant={"ghost"} size={"sm"}>
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

export default CasesCaseItem;
