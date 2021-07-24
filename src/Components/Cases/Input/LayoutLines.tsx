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
import { ILine } from "../../../Redux/Models/InputModel";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import LayoutLine from "./LayoutLine";
import Line from "./Line";

const LayoutLines = () => {
  const layout = useStoreState((state) => state.input.layout);
  const setLayout = useStoreActions((actions) => actions.input.setLayout);
  const addLine = useStoreActions((actions) => actions.input.addLayoutLine);

  function handleDragEnd(result: DropResult) {}

  function handleAddLine() {
    addLine({ lineId: uuid(), label: "New", type: "line", value: "" });
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
                    {(provided, snapshot) => (
                      <Box
                        w={"full"}
                        mb={3}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <LayoutLine provided={provided} {...line} />
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
        <Button size={"sm"} onClick={handleAddLine}>
          +
        </Button>
      </Center>
    </VStack>
  );
};

export default LayoutLines;
