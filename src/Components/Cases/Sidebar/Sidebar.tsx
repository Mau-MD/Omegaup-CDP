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
import AddMultipleCasesModal from "./AddMultipleCasesModal";
import LoadLayoutToAllModal from "./LoadLayoutToAllModal";

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

  const {
    isOpen: isOpenLoadAll,
    onOpen: onOpenLoadAll,
    onClose: onCloseLoadAll,
  } = useDisclosure();

  const {
    isOpen: isOpenMultiple,
    onOpen: onOpenMultiple,
    onClose: onCloseMultiple,
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
                <MenuItem fontSize={"sm"} onClick={onOpenMultiple}>
                  Agregar Multiples Casos
                </MenuItem>
                <MenuItem fontSize={"sm"} onClick={onOpenLayout}>
                  Layout
                </MenuItem>
                <MenuItem fontSize={"sm"} onClick={onOpenLoadAll}>
                  Cargar Layout en todos los Casos
                </MenuItem>
              </MenuList>
            </Menu>
            <Add isOpen={isOpenAdd} onClose={onCloseAdd} />
            <AddMultipleCasesModal
              isOpen={isOpenMultiple}
              onClose={onCloseMultiple}
            />
            <LayoutDrawer
              isOpen={isOpenLayout}
              onClose={onCloseLayout}
              displayWritingButton
            />
            <LoadLayoutToAllModal
              isOpen={isOpenLoadAll}
              onClose={onCloseLoadAll}
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
