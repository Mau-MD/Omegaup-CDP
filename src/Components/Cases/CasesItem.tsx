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

interface PropTypes {
  name: string;
  points: number | undefined;
}
const CasesItem = ({ name, points }: PropTypes) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Badge colorScheme={"green"} size={"sm"}>
            {50 + " pts"}
          </Badge>
        </Tooltip>
        <Menu isLazy>
          <MenuButton as={IconButton} icon={<Dots />} size={"sm"} />
          <MenuList>
            <MenuItem fontSize={"sm"} onClick={onOpen}>
              {" "}
              Editar Grupo
            </MenuItem>
            <MenuItem fontSize={"sm"}>Eliminar Grupo</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Divider />
      <CasesEditGroup isOpen={isOpen} onClose={onClose} groupName={name} />
    </Box>
  );
};

export default CasesItem;
