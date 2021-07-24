import * as React from "react";
import Line from "./Line";
import { Box, Button, Center, Flex, VStack } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import { ICase } from "../../../Redux/Models/CasesModel";
import { useInputPage } from "../../../Hooks/useInputPage";
import { useCallback, useEffect, useMemo } from "react";
import { uuid } from "uuidv4";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useState } from "react";
import { ILine } from "../../../Redux/Models/InputModel";

interface PropTypes {
  groupName: string;
  caseData: ICase;
}
const InputWindow = (props: PropTypes) => {
  const { groupName, caseData } = props;

  const hidden = useStoreState((state) => state.input.hidden);
  const addLine = useStoreActions((action) => action.input.addLine);
  const setLines = useStoreActions((action) => action.input.setLines);
  const pageData = useInputPage(caseData);

  const caseIdentifier = { groupId: caseData.groupId, caseId: caseData.caseId };

  const addLineToStore = useCallback(() => {
    addLine({
      caseIdentifier: { groupId: caseData.groupId, caseId: caseData.caseId },
      line: { lineId: uuid(), type: "line", value: "", label: "Nombre" },
    });
  }, [addLine, caseData]);

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const newArray = Array.from(pageData);
    const [removed] = newArray.splice(startIndex, 1);
    newArray.splice(endIndex, 0, removed);

    setLines({
      caseIdentifier,
      lineArray: newArray,
    });
  }

  return (
    <VStack ml={5}>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <Droppable droppableId={caseData.groupId + caseData.caseId}>
          {(provided, snapshot) => (
            <Box
              w={"full"}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {pageData.map((line, index) => (
                <Draggable
                  key={line.lineId}
                  draggableId={line.lineId}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Box
                      w={"full"}
                      mb={3}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <Line
                        {...line}
                        provided={provided}
                        key={line.lineId}
                        hide={hidden}
                        caseIdentifier={caseIdentifier}
                        addLine={addLineToStore}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Center>
        <Button size={"sm"} onClick={addLineToStore}>
          +
        </Button>
      </Center>
    </VStack>
  );
};

export default InputWindow;
