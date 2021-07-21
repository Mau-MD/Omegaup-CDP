import * as React from "react";
import Line from "./Line";
import { Button, Center, Flex, VStack } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import { ICase } from "../../../Redux/Models/CasesModel";
import { useInputPage } from "../../../Hooks/useInputPage";
import { useCallback, useEffect, useMemo } from "react";
import { uuid } from "uuidv4";

interface PropTypes {
  groupName: string;
  caseData: ICase;
}
const InputWindow = (props: PropTypes) => {
  const { groupName, caseData } = props;

  const hidden = useStoreState((state) => state.input.hidden);
  const addLine = useStoreActions((action) => action.input.addLine);
  const pageData = useInputPage(caseData);

  const caseIdentifier = { groupId: caseData.groupId, caseId: caseData.caseId };

  const addLineToStore = useCallback(() => {
    addLine({
      caseIdentifier: { groupId: caseData.groupId, caseId: caseData.caseId },
      line: { lineId: uuid(), type: "line", value: "", label: "Nombre" },
    });
  }, [addLine, caseData]);

  // function addLineToStore() {
  //   addLine({
  //     caseIdentifier: caseIdentifier,
  //     line: { lineId: uuid(), type: "line", value: "", label: "Nombre" },
  //   });
  // }

  return (
    <VStack ml={5}>
      {pageData.map((line) => (
        <Line
          {...line}
          key={line.lineId}
          hide={hidden}
          caseIdentifier={caseIdentifier}
          addLine={addLineToStore}
        />
      ))}
      <Center>
        <Button size={"sm"} onClick={addLineToStore}>
          +
        </Button>
      </Center>
    </VStack>
  );
};

export default InputWindow;
