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
import { useEffect, useRef, useState } from "react";
import {
  caseIdentifier as ICaseIdentifier,
  ILine,
} from "../../../Redux/Models/InputModel";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import _ from "lodash";

// TODO: Focus automatico al presionar enter
// TODO: no deberia de mostrar nada si ninguna caso esta seleccionado
// TODO: Al borrar caso/grupo deberia ir al modo no seleccionado

interface PropTypes extends ILine {
  caseIdentifier: ICaseIdentifier;
  addLine: () => void;
  hide?: boolean;
}

const Line = (props: PropTypes) => {
  const {
    hide = false,
    lineId,
    type,
    value,
    label,
    caseIdentifier,
    addLine,
  } = props;

  const [mode, setMode] = useState(type);
  const labelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>(null);

  const updateLine = useStoreActions((actions) => actions.input.updateLine);
  const deleteLine = useStoreActions((actions) => actions.input.removeLine);
  const lastCreated = useStoreState((state) => state.input.lastCreated);

  useEffect(() => {
    handleUpdateLine();
  }, [mode]);

  useEffect(() => {
    if (lastCreated === lineId) {
      inputRef.current.focus();
    }
  }, [lastCreated]);

  function handleUpdateLine() {
    let label =
      labelRef.current !== null ? labelRef.current.children[0].innerHTML : "";
    let value = inputRef.current !== null ? inputRef.current.value : "";

    updateLine({
      lineId: lineId,
      caseIdentifier: caseIdentifier,
      lineData: { lineId: lineId, label: label, value: value, type: mode },
    });
  }

  function handleEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      inputRef.current?.blur();
      addLine();
    }
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    if (
      value === "line" ||
      value === "multiline" ||
      value === "array" ||
      value === "matrix"
    ) {
      setMode(value);
    }
  }

  function handleDelete() {
    deleteLine({
      caseIdentifier: caseIdentifier,
      lineId: lineId,
    });
  }

  return (
    <Box w={"100%"} p={3} border={"1px solid rgba(5,5,5,0.1)"} borderRadius={5}>
      <HStack w={"100%"} h={"100%"}>
        <DragHandleIcon />
        {!hide && (
          <Editable
            isTruncated
            defaultValue={label}
            fontSize={"sm"}
            ref={labelRef}
            textOverflow={"clip"}
            minW={"40px"}
            maxW={"40px"}
            onSubmit={() => handleUpdateLine()}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        )}
        {mode === "multiline" ? (
          <Textarea
            size={"sm"}
            defaultValue={value}
            ref={inputRef}
            onBlur={() => handleUpdateLine()}
          />
        ) : (
          <Input
            defaultValue={value}
            isFullWidth
            size={"sm"}
            disabled={mode === "array" || mode === "matrix"}
            ref={inputRef}
            onBlur={() => handleUpdateLine()}
            onKeyPress={(e) => handleEnterPress(e)}
          />
        )}
        {!hide && (
          <Select
            size={"sm"}
            w={
              mode === "array" || mode === "matrix" ? 200 - 38 + "px" : "200px"
            }
            value={type}
            onChange={(e) => handleSelectChange(e)}
          >
            <option value={"line"}> Linea </option>
            <option value={"multiline"}> Multilínea</option>
            <option value={"array"}> Arreglo </option>
            <option value={"matrix"}> Matriz </option>
          </Select>
        )}
        {(mode === "array" || mode === "matrix") && (
          <EditIcon cursor={"pointer"} />
        )}
        <DeleteIcon cursor={"pointer"} onClick={() => handleDelete()} />
      </HStack>
    </Box>
  );
};

// export default Line;
export default React.memo(Line, (prevState, nextState) => {
  return _.isEqual(prevState, nextState);
});
