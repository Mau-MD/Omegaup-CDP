import { Box, Button, Center, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { uuid } from "uuidv4";
import { ILine } from "../../../../redux/models/input/inputModel";
import { useStoreActions, useStoreState } from "../../../../redux/store";
import Line from "./Line";
// import Line from "../../../cases/input/Line";

interface PropTypes {
  isLeft?: boolean;
}
const Lines = (props: PropTypes) => {
  const { isLeft = false } = props;
  const layout = useStoreState((state) => state.input.layout);
  const setLayout = useStoreActions((actions) => actions.input.setLayout);
  const addLine = useStoreActions((actions) => actions.input.addLayoutLine);

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    if (layout !== undefined) {
      const newArray = Array.from(layout);
      const [removed] = newArray.splice(startIndex, 1);
      newArray.splice(endIndex, 0, removed);
      setLayout(newArray);
    }
  }

  function handleAddLine() {
    addLine({
      lineId: uuid(),
      label: "New",
      type: "line",
      value: "",
      arrayData: undefined,
      matrixData: undefined,
    });
  }

  return (
    <VStack>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <Droppable droppableId={"layout"}>
          {(provided, snapshot) => (
            <Box
              w={"full"}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {layout !== undefined &&
                layout.map((line, index) => (
                  <Draggable
                    key={line.lineId}
                    draggableId={line.lineId}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      if (
                        snapshot.isDragging &&
                        provided.draggableProps.style !== undefined
                      ) {
                        const offset = {
                          x: isLeft ? 0 : window.innerWidth - 320,
                          y: 0,
                        }; // your fixed container left/top position
                        // @ts-ignore
                        const x = provided.draggableProps.style.left - offset.x;
                        // @ts-ignore
                        const y = provided.draggableProps.style.top - offset.y;
                        // @ts-ignore
                        provided.draggableProps.style.left = x;
                        // @ts-ignore
                        provided.draggableProps.style.top = y;
                      }
                      return (
                        <Box
                          w={"full"}
                          mb={3}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Line provided={provided} {...line} />
                        </Box>
                      );
                    }}
                  </Draggable>
                ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Center>
        <Button size={"sm"} onClick={handleAddLine}>
          +
        </Button>
      </Center>
    </VStack>
  );
};

export default Lines;
