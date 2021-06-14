import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import CasesAdd from "./CasesAdd";
import CasesNavigation from "./CasesNavigation";
import CasesEditGroup from "./CasesEditGroup";

const CasesSidebar = () => {
  const divBorderColor = useColorModeValue("gray.200", "gray.600");

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
      <Box
        w={"30%"}
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
            <Button
              size={"sm"}
              colorScheme={"green"}
              // isFullWidth={true}
              onClick={onOpenAdd}
            >
              Agregar Caso
            </Button>
            <CasesAdd
              isOpen={isOpenAdd}
              onClose={onCloseAdd}
              title={"Agregar Problema"}
            />
            <CasesEditGroup />
          </Flex>
          <Divider />
          <CasesNavigation />
        </Box>
      </Box>
    </motion.div>
  );
};

export default CasesSidebar;
