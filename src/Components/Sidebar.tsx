import * as React from "react";
import { Box, Flex, Tooltip } from "@chakra-ui/react";

import { BiCodeBlock } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const Sidebar = () => {
  return (
    <Flex
      h={"100%"}
      w={"40px"}
      borderRight={"1px"}
      borderColor={"gray.100"}
      direction={"column"}
      align={"center"}
      justify={"center"}
    >
      <Box my={2} color={"gray.500"} _hover={{ color: "black" }}>
        <Tooltip label={"Código Solución"} placement={"right"}>
          <span>
            <BiCodeBlock size={20} />
          </span>
        </Tooltip>
      </Box>
      <Box my={2} color={"gray.500"} _hover={{ color: "black" }}>
        <Tooltip label={"Casos de Prueba"} placement={"right"}>
          <span>
            <IoMdCheckmarkCircleOutline size={20} />
          </span>
        </Tooltip>
      </Box>
      <Box my={2} color={"gray.500"} _hover={{ color: "black" }}>
        <Tooltip label={"Redacción"} placement={"right"}>
          <span>
            <BsPencil size={20} />
          </span>
        </Tooltip>
      </Box>
    </Flex>
  );
};
export default Sidebar;
