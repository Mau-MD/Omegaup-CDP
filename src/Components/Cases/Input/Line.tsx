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
import { useRef, useState } from "react";
import {
  caseIdentifier as ICaseIdentifier,
  ILine,
} from "../../../Redux/Models/InputModel";
import { useStoreActions } from "../../../Redux/Store";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const updateLine = useStoreActions((actions) => actions.input.updateLine);

  function handleUpdateLine() {
    console.log(labelRef.current?.children[0].innerHTML);
    console.log(inputRef.current?.value);
    console.log(mode);
    // updateLine({
    //   lineId: lineId,
    //   caseIdentifier: caseIdentifier,
    //   lineData: { lineId: lineId, label: "", value: "", type: "line" },
    // });
  }

  function handleEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      console.log("Created new line");
      inputRef.current?.blur();
      addLine();
    }
  }

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
          <Editable
            defaultValue={label}
            fontSize={"sm"}
            ref={labelRef}
            onSubmit={() => handleUpdateLine()}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        )}
        {mode === "multiline" ? (
          <Textarea size={"sm"} h={"100%"} w={"100%"} />
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
            w={"240px"}
            onChange={(e) => {
              const value = e.currentTarget.value;
              if (
                value === "line" ||
                value === "multiline" ||
                value === "array" ||
                value === "matrix"
              ) {
                setMode(value);
              }
              handleUpdateLine();
            }}
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

// export default Line;
export default React.memo(Line, (prevState, nextState) => {
  return _.isEqual(prevState, nextState);
});
