import * as React from "react";
import { Box, Button } from "@chakra-ui/react";

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
      {caseName}
    </Button>
  );
};

export default CasesCaseItem;
