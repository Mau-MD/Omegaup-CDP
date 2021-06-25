import * as React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { HStack, Flex, Box } from "@chakra-ui/react";
import Input from "./Input/Input";

const Main = () => {
  return (
    <Flex>
      <Box w={"30%"}>
        <Sidebar />
      </Box>
      <Input />
    </Flex>
  );
};

export default Main;
