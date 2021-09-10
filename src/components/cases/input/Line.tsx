import * as React from "react";
import {
  Input,
  Editable,
  EditablePreview,
  EditableInput,
  Box,
  HStack,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import {
  caseIdentifier,
  ILine,
} from "../../../redux/models/input/inputInterfaces";
import { useStoreActions, useStoreState } from "../../../redux/store";
import _ from "lodash";
import { DraggableProvided } from "react-beautiful-dnd";
import ArrayGen from "../../core/drawers/ArrayGen";
import MatrixGenDrawer from "../../core/drawers/MatrixGen";

interface PropTypes extends ILine {
  firstOrLast: "first" | "last" | "both" | "none";
  caseIdentifier: caseIdentifier;
  addLine: () => void;
  hide?: boolean;
  provided: DraggableProvided;
  showInput?: boolean;
}

const Line = (props: PropTypes) => {
  const {
    firstOrLast,
    hide = false,
    lineId,
    type,
    value,
    label,
    caseIdentifier,
    addLine,
    provided,
    arrayData,
    matrixData,
    showInput = true,
  } = props;

  const [mode, setMode] = useState(type);
  const labelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>(null);

  const updateLine = useStoreActions((actions) => actions.input.updateLine);
  const deleteLine = useStoreActions((actions) => actions.input.removeLine);

  const lastCreated = useStoreState((state) => state.input.lastCreated);
  const selectedCase = useStoreState((state) => state.cases.selected);
  const config = useStoreState((state) => state.config.caseConfig);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Update store line everytime we change the line mode
  useEffect(() => {
    handleUpdateLine();
  }, [mode]);

  // Focus line's input everytime we create a new line
  useEffect(() => {
    if (lastCreated === lineId) {
      inputRef.current.focus();
    }
  }, [lastCreated]);

  // Focus first or last line based on current configuration, everytime we change case
  useEffect(() => {
    if (config.focus === "none") return;
    if (firstOrLast === config.focus || firstOrLast === "both") {
      inputRef.current.focus();
    }
  }, [selectedCase]);

  // Update line to store
  function handleUpdateLine() {
    const label =
      labelRef.current !== null ? labelRef.current.children[0].innerHTML : "";
    const value = inputRef.current !== null ? inputRef.current.value : "";

    updateLine({
      lineId: lineId,
      caseIdentifier: caseIdentifier,
      lineData: {
        lineId: lineId,
        label: label,
        value: value,
        type: mode,
        arrayData: arrayData,
        matrixData: matrixData,
      },
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

  // Change what we render based on the line's mode
  function renderSwitch() {
    switch (mode) {
      case "multiline":
        return (
          <Textarea
            size={"sm"}
            defaultValue={value}
            ref={inputRef}
            onBlur={() => handleUpdateLine()}
          />
        );
      case "line":
        return (
          <Input
            defaultValue={value}
            // isFullWidth
            size={"sm"}
            ref={inputRef}
            onBlur={() => handleUpdateLine()}
            onKeyPress={(e) => handleEnterPress(e)}
          />
        );
      case "array":
        return (
          <Input
            size={"sm"}
            disabled
            ref={inputRef}
            value={
              arrayData === undefined
                ? ""
                : arrayData?.value.substring(0, 20) + "..."
            }
          />
        );
      case "matrix":
        return (
          <Input
            size={"sm"}
            disabled
            ref={inputRef}
            value={
              matrixData === undefined
                ? ""
                : matrixData?.value.substring(0, 20) + "..."
            }
          />
        );
    }
  }

  return (
    <Box w={"100%"} p={3} border={"1px solid rgba(5,5,5,0.1)"} borderRadius={5}>
      <HStack w={"100%"} h={"100%"}>
        <Box {...provided.dragHandleProps}>
          <DragHandleIcon />
        </Box>

        {!hide && (
          <Editable
            isTruncated
            defaultValue={label}
            placeholder={"---"}
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
        {showInput && renderSwitch()}
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
          <EditIcon cursor={"pointer"} onClick={onOpen} />
        )}
        <DeleteIcon cursor={"pointer"} onClick={() => handleDelete()} />
      </HStack>
      {mode === "array" && (
        <ArrayGen
          isOpen={isOpen}
          onClose={onClose}
          lineId={lineId}
          caseIdentifier={caseIdentifier}
          arrayData={arrayData}
          label={label}
        />
      )}
      {mode === "matrix" && (
        <MatrixGenDrawer
          isOpen={isOpen}
          onClose={onClose}
          lineId={lineId}
          caseIdentifier={caseIdentifier}
          matrixData={matrixData}
          label={label}
        />
      )}
    </Box>
  );
};

// export default Line;
export default React.memo(Line, (prevState, nextState) => {
  return _.isEqual(prevState, nextState);
});
