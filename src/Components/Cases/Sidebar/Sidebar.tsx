import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import { useMediaPredicate } from "react-media-hook";
import Add from "./Add";
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import LayoutDrawer from "../Input/LayoutDrawer";

const Sidebar = () => {
  const divBorderColor = useColorModeValue("gray.200", "gray.600");

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const {
    isOpen: isOpenLayout,
    onOpen: onOpenLayout,
    onClose: onCloseLayout,
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
            <Button
              size={"sm"}
              colorScheme={"green"}
              onClick={onOpenAdd}
              mr={2}
            >
              {isLargeScreen ? <p> Agregar</p> : <p> + </p>}
            </Button>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<Dots />}
                size={"sm"}
                syle={{ zIndex: 99 }}
              />
              <MenuList>
                <MenuItem fontSize={"sm"} onClick={onOpenLayout}>
                  Layout
                </MenuItem>
              </MenuList>
            </Menu>
            <Add isOpen={isOpenAdd} onClose={onCloseAdd} />
            <LayoutDrawer isOpen={isOpenLayout} onClose={onCloseLayout} />
          </Flex>
          <Divider />
          <Navigation />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Sidebar;
