import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import AddCase from "./AddCase";
import Navigation from "./Navigation";
import { useMediaPredicate } from "react-media-hook";
const Sidebar = () => {
  const divBorderColor = useColorModeValue("gray.200", "gray.600");

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const isLargeScreen = useMediaPredicate("(min-width: 830px)");

  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
      <Box
        w={"100%"}
        h={"75vh"}
        borderRight={"1px"}
        borderColor={divBorderColor}
      >
        <Box width={"90%"}>
          <Flex align={"center"} mb={4}>
            <Text mr={5} fontSize={"xl"} fontWeight={"bold"}>
              Grupos
            </Text>
            <Spacer />
            <Button size={"sm"} colorScheme={"green"} onClick={onOpenAdd}>
              {isLargeScreen ? <p> Agregar Caso</p> : <p> + </p>}
            </Button>
            <AddCase
              isOpen={isOpenAdd}
              onClose={onCloseAdd}
              title={"Agregar Problema"}
            />
          </Flex>
          <Divider />
          <Navigation />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Sidebar;
