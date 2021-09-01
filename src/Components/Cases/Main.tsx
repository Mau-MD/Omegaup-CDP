import * as React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { HStack, Flex, Box, Button, Text } from "@chakra-ui/react";
import Input from "./Input/Input";
import { useEffect, useRef, useState } from "react";
import { useStoreState } from "../../Redux/Store";
import Out from "./Out";

const Main = () => {
  const [showOut, setShowOut] = useState(false);

  const showOutRef = useRef<HTMLButtonElement>(null);

  const tabIndex = useStoreState((state) => state.tabs.tabIndex);
  const selected = useStoreState((state) => state.cases.selected);

  useEffect(() => {
    document.addEventListener("keydown", (key) => handleKeyPress(key));
    return () => {
      document.removeEventListener("keydown", (key) => handleKeyPress(key));
    };
  }, []);

  function handleKeyPress(key: KeyboardEvent) {
    if (tabIndex !== 1) return;
    if (key.ctrlKey && key.which === 72 && showOutRef.current !== null) {
      showOutRef.current.click();
    }
  }

  return (
    <>
      <Flex>
        <Box w={"30%"}>
          <Sidebar />
        </Box>
        <HStack w={"100%"}>
          <Input />
          {!(selected.caseId === "None" || selected.caseId === "None") &&
            showOut && <Out />}
        </HStack>
      </Flex>
      <Box pos={"fixed"} right={10} bottom={5}>
        <Button
          disabled={selected.caseId === "None" || selected.caseId === "None"}
          ref={showOutRef}
          size={"sm"}
          colorScheme={"green"}
          onClick={() => tabIndex === 1 && setShowOut(!showOut)}
        >
          <HStack>
            <Text> {showOut ? "Ocultar Salida" : "Mostrar Salida"}</Text>
            <Text fontSize={"smaller"} opacity={"0.5"}>
              Ctrl + H
            </Text>
          </HStack>
        </Button>
      </Box>
    </>
  );
};

export default Main;
