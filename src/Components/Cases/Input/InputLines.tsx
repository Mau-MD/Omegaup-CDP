import * as React from "react";
import Line from "./Line";
import { Flex, VStack } from "@chakra-ui/react";

const InputLines = () => {
  return (
    <VStack>
      <Line />
      <Line />
      <Line hide />
      <Line />
      <Line />
    </VStack>
  );
};

export default InputLines;
