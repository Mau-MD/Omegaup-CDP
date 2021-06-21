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
  Flex,
  Button,
} from "@chakra-ui/react";
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import CasesEditGroup from "./CasesEditGroup";
import CasesDeleteGroup from "./CasesDeleteGroup";
import { useMediaPredicate } from "react-media-hook";
import styled from "styled-components";
import CasesCaseItem from "./CasesCaseItem";
import { useStoreState } from "../../Redux/Store";
import { useState } from "react";
import { motion } from "framer-motion";

interface PropTypes {
  name: string;
  points: number;
  arePointsDefined: boolean;
}
const CasesGroupItem = ({ name, points, arePointsDefined }: PropTypes) => {
  const [showCases, setShowCases] = useState(false);

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const caseState = useStoreState((state) => {
    return state.cases.cases.find((value) => value.name === name);
  });

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
    <Flex direction={"column"}>
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
          onClick={() => setShowCases(!showCases)}
        >
          <Box>{name === "mainGroup" ? "Sin Grupo" : name}</Box>
          <Spacer />
          {name !== "mainGroup" && (
            <>
              <Tooltip
                label={
                  "Estos serán los puntos que obtendrá el usuario si resuelve correctamente el grupo"
                }
              >
                <Badge
                  colorScheme={arePointsDefined ? "green" : "blue"}
                  size={"sm"}
                >
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
            </>
          )}
        </HStack>
        <Divider />
        <CasesEditGroup
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          groupName={name}
          groupPoints={points}
          pointsDefined={arePointsDefined}
        />
        <CasesDeleteGroup
          isOpen={isOpenRemove}
          onClose={onCloseRemove}
          groupName={name}
        />
      </Box>
      <Box ml={2}>
        {caseState &&
          showCases &&
          caseState.cases.map((element) => (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "inline-block" }}
              key={element.name + element.group}
            >
              <CasesCaseItem
                caseName={element.name}
                groupName={element.group}
                pointsDefined={element.arePointsDefined}
                points={element.points}
                shouldShowPoints={name === "mainGroup"}
              />
            </motion.div>
          ))}
      </Box>
    </Flex>
  );
};

const MenuFullButton = styled.div`
  //background-color: black;
  position: absolute;
  width: 20%;
  height: 30px;
`;

export default CasesGroupItem;
