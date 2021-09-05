import { DragHandleIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Editable,
  EditablePreview,
  EditableInput,
  Textarea,
  Input,
  Select,
} from "@chakra-ui/react";
import * as React from "react";
import { useRef, useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { ILine } from "../../../Redux/Models/InputModel";
import { useStoreActions } from "../../../Redux/Store";

interface PropTypes extends ILine {
  provided: DraggableProvided;
}
const LayoutLine = (props: PropTypes) => {
  const { provided, label, type, lineId, arrayData, matrixData } = props;

  const [mode, setMode] = useState(type);

  const typeRef = useRef(type);
  const labelRef = useRef<HTMLDivElement>(null);
  const updateLine = useStoreActions(
    (actions) => actions.input.updateLayoutLine
  );
  const deleteLine = useStoreActions(
    (actions) => actions.input.removeLayoutLine
  );

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    if (
      value === "line" ||
      value === "multiline" ||
      value === "array" ||
      value === "matrix"
    ) {
      setMode(value);
      typeRef.current = value;
    }
    handleUpdateLine();
  }

  function handleUpdateLine() {
    const newLabel =
      labelRef.current !== null ? labelRef.current.children[0].innerHTML : "";
    updateLine({
      label: newLabel,
      lineId: lineId,
      type: typeRef.current,
      value: "",
      arrayData: arrayData,
      matrixData: matrixData,
    });
  }

  return (
    <Box w={"100%"} p={3} border={"1px solid rgba(5,5,5,0.1)"} borderRadius={5}>
      <HStack w={"100%"} h={"100%"}>
        <Box {...provided.dragHandleProps}>
          <DragHandleIcon />
        </Box>

        <Editable
          ref={labelRef}
          defaultValue={label}
          isTruncated
          fontSize={"sm"}
          textOverflow={"clip"}
          minW={"40px"}
          maxW={"40px"}
          onSubmit={() => handleUpdateLine()}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Select
          size={"sm"}
          value={type}
          onChange={(e) => handleSelectChange(e)}
        >
          <option value={"line"}> Linea </option>
          <option value={"multiline"}> Multilínea</option>
          <option value={"array"}> Arreglo </option>
          <option value={"matrix"}> Matriz </option>
        </Select>
        <DeleteIcon cursor={"pointer"} onClick={() => deleteLine(lineId)} />
      </HStack>
    </Box>
  );
};

export default LayoutLine;
