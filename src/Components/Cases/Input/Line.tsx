import * as React from "react";
import {
  Input,
  Editable,
  Flex,
  EditablePreview,
  EditableInput,
  Box,
  HStack,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { DeleteIcon, DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface PropTypes {
  hide?: boolean;
}
const Line = ({ hide = false }: PropTypes) => {
  const [mode, setMode] = useState("line");

  return (
    <Box
      w={"100%"}
      h={mode === "multiline" ? "100px" : "40px"}
      p={5}
      border={"1px solid rgba(5,5,5,0.1)"}
      borderRadius={5}
    >
      <HStack w={"100%"} h={"100%"}>
        <DragHandleIcon />
        {!hide && (
          <Editable defaultValue={"Nombre"}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        )}
        {mode === "multiline" ? (
          <Textarea size={"sm"} h={"100%"} w={"100%"} />
        ) : (
          <Input
            isFullWidth
            size={"sm"}
            disabled={mode === "array" || mode === "matrix"}
          />
        )}
        {!hide && (
          <Select
            size={"sm"}
            w={"240px"}
            onChange={(e) => setMode(e.currentTarget.value)}
          >
            <option value={"line"}> Linea </option>
            <option value={"multiline"}> Multiple Lineas </option>
            <option value={"array"}> Arreglo </option>
            <option value={"matrix"}> Matriz </option>
          </Select>
        )}
        {(mode === "array" || mode === "matrix") && (
          <EditIcon cursor={"pointer"} />
        )}
        <DeleteIcon cursor={"pointer"} />
      </HStack>
    </Box>
  );
};

export default Line;
