import * as React from "react";
import Sidebar from "./Sidebar/Sidebar";
import {
  HStack,
  Flex,
  Box,
  Button,
  Text,
  IconButton,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import MainWindow from "./Input/MainWindow";
import { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../../Redux/Store";
import Out from "./Out";
import { ChevronUpIcon, UpDownIcon } from "@chakra-ui/icons";

const Main = () => {
  const [showOut, setShowOut] = useState(false);

  const showOutRef = useRef<HTMLButtonElement>(null);
  const nextCaseRef = useRef<HTMLButtonElement>(null);
  const lastCaseRef = useRef<HTMLButtonElement>(null);
  const addCaseRef = useRef<HTMLButtonElement>(null);

  const tabIndex = useStoreState((state) => state.tabs.tabIndex);
  const selected = useStoreState((state) => state.cases.selected);
  const nextCase = useStoreActions((actions) => actions.cases.nextIndex);
  const lastCase = useStoreActions((actions) => actions.cases.lastIndex);

  useEffect(() => {
    document.addEventListener("keydown", (key) => handleKeyPress(key));
    return () => {
      document.removeEventListener("keydown", (key) => handleKeyPress(key));
    };
  }, []);

  function handleKeyPress(key: KeyboardEvent) {
    if (key.ctrlKey) {
      if (key.which === 72 && showOutRef.current !== null) {
        showOutRef.current.click();
      }
      // next
      if (key.which === 78 && nextCaseRef.current !== null) {
        if (document.activeElement !== null) {
          // @ts-ignore
          document.activeElement.blur();
        }
        nextCaseRef.current.click();
      }
      // back
      if (key.which === 66 && lastCaseRef.current !== null) {
        if (document.activeElement !== null) {
          // @ts-ignore
          document.activeElement.blur();
        }
        lastCaseRef.current.click();
      }
      if (key.which === 65 && addCaseRef.current !== null) {
        // A
        addCaseRef.current.click();
      }
    }
    // 78 next 66 back
  }

  function handleGoUp() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function handleNextCase() {
    nextCase();
  }

  function handleLastCase() {
    lastCase();
  }
  return (
    <>
      <Flex>
        <Box w={"30%"}>
          <Sidebar addRef={addCaseRef} />
        </Box>
        <HStack w={"100%"}>
          <MainWindow />
          {!(selected.caseId === "None" || selected.caseId === "None") &&
            showOut && <Out />}
        </HStack>
      </Flex>
      <HStack pos={"fixed"} zIndex={5} left={10} bottom={5}>
        <Button
          ref={lastCaseRef}
          size={"sm"}
          colorScheme={"twitter"}
          onClick={() => tabIndex === 2 && handleLastCase()}
        >
          <HStack>
            <Text> Anterior</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + B
            </Text>
          </HStack>
        </Button>
        <Button
          ref={nextCaseRef}
          size={"sm"}
          colorScheme={"blue"}
          onClick={() => tabIndex === 2 && handleNextCase()}
        >
          <HStack>
            <Text> Siguiente</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + N
            </Text>
          </HStack>
        </Button>
      </HStack>
      <HStack pos={"fixed"} right={10} bottom={5}>
        <Tooltip label={"Ir hacia arriba | Ctrl + T"} mr={2}>
          <IconButton
            onClick={() => handleGoUp()}
            aria-label={"Go-up"}
            icon={<ChevronUpIcon />}
            size={"sm"}
          />
        </Tooltip>
        <Button
          disabled={selected.caseId === "None" || selected.caseId === "None"}
          ref={showOutRef}
          size={"sm"}
          colorScheme={"green"}
          onClick={() => tabIndex === 2 && setShowOut(!showOut)}
        >
          <HStack>
            <Text> {showOut ? "Ocultar Salida" : "Mostrar Salida"}</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + H
            </Text>
          </HStack>
        </Button>
      </HStack>
    </>
  );
};

export default Main;
