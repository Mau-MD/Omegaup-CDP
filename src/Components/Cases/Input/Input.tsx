import * as React from "react";
import Navbar from "./Navbar";
import Line from "./Line";
import { Box, Divider, Flex } from "@chakra-ui/react";
import InputLines from "./InputLines";

const Input = () => {
  return (
    <Box w={"100%"} h={"100%"}>
      <Navbar />
      <Divider mb={4} />
      <InputLines />
    </Box>
  );
};

export default Input;
