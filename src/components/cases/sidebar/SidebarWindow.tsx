import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Groups from "./Groups";
import { useMediaPredicate } from "react-media-hook";
import AddContainer from "../../core/modals/add/AddContainer";
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import LayoutContainer from "../../core/drawers/layout/LayoutContainer";
import AddMultipleCases from "../../core/modals/add/AddMultipleCases";
import LoadLayout from "../../core/modals/load/LoadLayout";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  BsReverseLayoutTextSidebarReverse,
  CgLayoutList,
  FaUpload,
} from "react-icons/all";
import OutDownload from "../../core/modals/download/OutDownload";
import OutUpload from "../../core/modals/download/OutUpload";
import { useStoreState } from "../../../redux/store";

interface PropTypes {
  addRef: React.RefObject<HTMLButtonElement>; // To toggle "Add" shorcut from the main screen
}
const SidebarWindow = (props: PropTypes) => {
  const { addRef } = props;

  const divBorderColor = useColorModeValue("gray.200", "gray.600");
  const tabIndex = useStoreState((state) => state.tabs.tabIndex);

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
  const {
    isOpen: isOpenDownload,
    onOpen: onOpenDownload,
    onClose: onCloseDownload,
  } = useDisclosure();
  const {
    isOpen: isOpenUpload,
    onOpen: onOpenUpload,
    onClose: onCloseUpload,
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
            <Tooltip label={"Ctrl + A"}>
              <Button
                data-test={"add-btn"}
                ref={addRef}
                size={"sm"}
                colorScheme={"green"}
                onClick={() => tabIndex === 2 && onOpenAdd()}
                mr={2}
              >
                {isLargeScreen ? <p> Agregar</p> : <p> + </p>}
              </Button>
            </Tooltip>
            <Menu>
              <MenuButton
                data-test={"more-options"}
                as={IconButton}
                icon={<Dots />}
                size={"sm"}
                syle={{ zIndex: 99 }}
              />
              <MenuList>
                <MenuItem
                  data-test={"add-multiple-cases"}
                  icon={<AddIcon />}
                  fontSize={"sm"}
                  onClick={onOpenMultiple}
                >
                  Agregar Multiples Casos
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  data-test={"layout"}
                  icon={<BsReverseLayoutTextSidebarReverse />}
                  fontSize={"sm"}
                  onClick={onOpenLayout}
                >
                  Layout
                </MenuItem>
                <MenuItem
                  icon={<CgLayoutList />}
                  fontSize={"sm"}
                  onClick={onOpenLoadAll}
                >
                  Cargar Layout en todos los Casos
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  icon={<DownloadIcon />}
                  fontSize={"sm"}
                  onClick={onOpenDownload}
                >
                  Descargar Entrada
                </MenuItem>
                <MenuItem
                  icon={<FaUpload />}
                  fontSize={"sm"}
                  onClick={onOpenUpload}
                >
                  Subir Salida
                </MenuItem>
              </MenuList>
            </Menu>
            {/* Modals and drawers */}
            <AddContainer isOpen={isOpenAdd} onClose={onCloseAdd} />
            <AddMultipleCases
              isOpen={isOpenMultiple}
              onClose={onCloseMultiple}
            />
            <LayoutContainer
              isOpen={isOpenLayout}
              onClose={onCloseLayout}
              displayWritingButton
            />
            <LoadLayout isOpen={isOpenLoadAll} onClose={onCloseLoadAll} />
            <OutDownload isOpen={isOpenDownload} onClose={onCloseDownload} />
            <OutUpload isOpen={isOpenUpload} onClose={onCloseUpload} />
          </Flex>
          <Divider />
          <Groups />
        </Box>
      </Box>
    </motion.div>
  );
};

export default SidebarWindow;
