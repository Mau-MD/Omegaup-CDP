import * as React from "react";
import Line from "./Line";
import { Box, Button, Center, Flex, VStack } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "../../../redux/store";
import { ICase } from "../../../redux/models/cases/casesInterfaces";
import { useInputPage } from "../../../hooks/useInputPage";
import { useCallback, useEffect, useMemo } from "react";
import { uuid } from "uuidv4";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface PropTypes {
  groupName?: string;
  caseData: ICase;
}

const Lines = (props: PropTypes) => {
  const { caseData } = props;

  const hidden = useStoreState((state) => state.input.hidden);

  const addLine = useStoreActions((action) => action.input.addLine);
  const setLines = useStoreActions((action) => action.input.setLines);

  const { pageData, setPageData } = useInputPage(caseData);

  const caseIdentifier = { groupId: caseData.groupId, caseId: caseData.caseId };

  const addLineToStore = useCallback(() => {
    addLine({
      caseIdentifier: { groupId: caseData.groupId, caseId: caseData.caseId },
      line: {
        lineId: uuid(),
        type: "line",
        value: "",
        label: "New",
        arrayData: undefined,
        matrixData: undefined,
      },
    });
  }, [addLine, caseData]);

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const newArray = Array.from(pageData);
    const [removed] = newArray.splice(startIndex, 1);
    newArray.splice(endIndex, 0, removed);

    setPageData(newArray);
    setLines({
      caseIdentifier,
      lineArray: newArray,
    });
  }

  function getFirstOrLast(index: number, dataLength: number) {
    if (dataLength === 1) return "both";
    if (index === 0) return "first";
    if (index === dataLength - 1) return "last";
    return "none";
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
                        firstOrLast={getFirstOrLast(index, pageData.length)}
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
        <Button data-test={"add-line"} size={"sm"} onClick={addLineToStore}>
          +
        </Button>
      </Center>
    </VStack>
  );
};

export default Lines;
