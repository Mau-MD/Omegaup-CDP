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
} from "@chakra-ui/react";
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import EditGroup from "./EditGroup";
import DeleteGroup from "./DeleteGroup";
import { useMediaPredicate } from "react-media-hook";
import CaseItem from "./CaseItem";
import { useStoreState } from "../../../Redux/Store";
import { useState } from "react";
import { motion } from "framer-motion";

interface PropTypes {
  name: string;
  points: number;
  arePointsDefined: boolean;
}

const GroupItem = ({ name, points, arePointsDefined }: PropTypes) => {
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

  function handleCasesToggleClick(event: React.MouseEvent<HTMLDivElement>) {
    let percentage =
      ((event.pageX - event.currentTarget.offsetLeft) * 100) /
      event.currentTarget.clientWidth;
    if (percentage < 80) setShowCases(!showCases);
  }

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
          onClick={(event) => handleCasesToggleClick(event)}
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
                <MenuButton
                  as={IconButton}
                  icon={<Dots />}
                  size={"sm"}
                  syle={{ zIndex: 99 }}
                />
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
        <EditGroup
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          groupName={name}
          groupPoints={points}
          pointsDefined={arePointsDefined}
        />
        <DeleteGroup
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
              <CaseItem
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

export default GroupItem;