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
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import {
  caseIdentifier as ICaseIdentifier,
  ILine,
} from "../../../Redux/Models/InputModel";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import _ from "lodash";
import { DraggableProvided } from "react-beautiful-dnd";
import ArrayGenDrawer from "./ArrayGenDrawer";
import MatrixGenDrawer from "./MatrixGenDrawer";

// TODO: Focus automatico al presionar enter
// TODO: no deberia de mostrar nada si ninguna caso esta seleccionado
// TODO: Al borrar caso/grupo deberia ir al modo no seleccionado

interface PropTypes extends ILine {
  firstOrLast: "first" | "last" | "both" | "none";
  caseIdentifier: ICaseIdentifier;
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    handleUpdateLine();
  }, [mode]);

  useEffect(() => {
    if (lastCreated === lineId) {
      inputRef.current.focus();
    }
  }, [lastCreated]);

  // Un use effect para cuando se cambie de caso
  useEffect(() => {
    // TODO: Settings
    if (firstOrLast === "last" || firstOrLast === "both") {
      inputRef.current.focus();
    }
  }, [selectedCase]);

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
        <ArrayGenDrawer
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
  //console.log(_.isEqual(prevState, nextState));
  return _.isEqual(prevState, nextState);
});
