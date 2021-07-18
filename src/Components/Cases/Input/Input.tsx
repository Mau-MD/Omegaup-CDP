import * as React from "react";
import TopBar from "./TopBar";
import Line from "./Line";
import { Box, Divider, Flex } from "@chakra-ui/react";
import InputWindow from "./InputWindow";
import { useSelectedData } from "../../../Hooks/useSelectedData";

const Input = () => {
  const selectedData = useSelectedData();

  return (
    <Box w={"100%"} h={"100%"}>
      <TopBar {...selectedData} />
      <Divider mb={4} />
      <InputWindow {...selectedData} />
    </Box>
  );
};

export default Input;
