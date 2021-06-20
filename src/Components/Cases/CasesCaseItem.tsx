import * as React from "react";
import { Badge, Box, Button, HStack } from "@chakra-ui/react";

interface PropTypes {
  groupName: string;
  caseName: string;
  pointsDefined: boolean;
  points: number;
}
const CasesCaseItem = ({
  groupName,
  caseName,
  pointsDefined,
  points,
}: PropTypes) => {
  return (
    <Button variant={"ghost"} size={"sm"}>
      <HStack>
        <span>{caseName}</span>
        {pointsDefined && <Badge> {points}</Badge>}
      </HStack>
    </Button>
  );
};

export default CasesCaseItem;
