import * as React from "react";
import {
  Badge,
  Box,
  Divider,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import CasesEditGroup from "./CasesEditGroup";
import CasesDeleteGroup from "./CasesDeleteGroup";
import { useMediaPredicate } from "react-media-hook";
import styled from "styled-components";

interface PropTypes {
  name: string;
  points: number;
  arePointsDefined: boolean;
}
const CasesItem = ({ name, points, arePointsDefined }: PropTypes) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove,
  } = useDisclosure();

  const isLargeScreen = useMediaPredicate("(min-width: 830px)");

  return (
    <Box my={2}>
      <HStack
        mb={2}
        cursor={"pointer"}
        transition={"padding-left 0.1s"}
        _hover={{
          borderLeft: "2px",
          borderColor: `${borderColor}`,
          paddingLeft: "5px",
        }}
      >
        <Box>{name}</Box>
        <Spacer />
        <Tooltip
          label={
            "Estos serán los puntos que obtendrá el usuario si resuelve correctamente el grupo"
          }
        >
          <Badge colorScheme={arePointsDefined ? "green" : "blue"} size={"sm"}>
            {isLargeScreen ? (
              <span> {parseFloat("" + points).toFixed(2) + " pts"}</span>
            ) : (
              <span>{Math.round(points)} </span>
            )}
          </Badge>
        </Tooltip>
        <Menu isLazy>
          {isLargeScreen ? (
            <MenuButton as={IconButton} icon={<Dots />} size={"sm"} />
          ) : (
            <MenuButton as={MenuFullButton} size={"sm"} />
          )}
          <MenuList>
            <MenuItem fontSize={"sm"} onClick={onOpenEdit}>
              Editar Grupo
            </MenuItem>
            <MenuItem fontSize={"sm"} onClick={onOpenRemove}>
              Eliminar Grupo
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Divider />
      <CasesEditGroup
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        groupName={name}
      />
      <CasesDeleteGroup
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        groupName={name}
      />
    </Box>
  );
};

const MenuFullButton = styled.div`
  //background-color: black;
  position: absolute;
  width: 20%;
  height: 30px;
`;

export default CasesItem;
