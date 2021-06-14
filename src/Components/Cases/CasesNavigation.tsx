import * as React from "react";
import { useStoreState } from "../../Redux/Store";
import {
  Box,
  IconButton,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Badge,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import { FiChevronDown as Chevron } from "react-icons/fi";

const CasesNavigation = () => {
  const caseState = useStoreState((state) => state.cases.cases);
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box mt={2}>
      {caseState.map((group) => (
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
            <Box>{group.name}</Box>
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
                <MenuItem fontSize={"sm"}> Editar Grupo</MenuItem>
                <MenuItem fontSize={"sm"}>Eliminar Grupo</MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default CasesNavigation;
