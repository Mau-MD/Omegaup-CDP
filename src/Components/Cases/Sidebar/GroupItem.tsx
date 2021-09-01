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
  MenuDivider,
} from "@chakra-ui/react";
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import { useMediaPredicate } from "react-media-hook";
import CaseItem from "./CaseItem";
import { useStoreState } from "../../../Redux/Store";
import { useState } from "react";
import { motion } from "framer-motion";
import EditGroup from "./EditGroup";
import { IGroup } from "../../../Redux/Models/CasesModel";
import DeleteGroup from "./DeleteGroup";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { downloadSingleGroup } from "../../../Util/FileIO/download";

interface PropTypes extends IGroup {}

const GroupItem = (props: PropTypes) => {
  const { name, defined, points, groupId, cases } = props;
  const [showCases, setShowCases] = useState(name === "Sin Grupo");

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const caseState = useStoreState((state) => {
    return state.cases.data.find((element) => element.groupId === groupId);
  });

  const inputData = useStoreState((state) => state.input.data);
  const problemName = useStoreState((state) => state.title.titleName);

  const isLargeScreen = useMediaPredicate("(min-width: 830px)");

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

  function handleCasesToggleClick(event: React.MouseEvent<HTMLDivElement>) {
    let percentage =
      ((event.pageX - event.currentTarget.offsetLeft) * 100) /
      event.currentTarget.clientWidth;
    if (percentage < 80) setShowCases(!showCases);
  }

  function handleDownload(txt: boolean) {
    if (caseState !== undefined) {
      downloadSingleGroup(inputData, caseState, problemName, { txt: txt });
    }
  }

  if (name === "Sin Grupo" && cases.length === 0) return <></>;
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
          <Box>{name}</Box>
          <Spacer />
          {name !== "Sin Grupo" && (
            <>
              <Tooltip
                label={
                  "Estos serán los puntos que obtendrá el usuario si resuelve correctamente el grupo"
                }
              >
                <Badge colorScheme={defined ? "green" : "blue"} size={"sm"}>
                  {isLargeScreen ? (
                    <span> {parseFloat("" + points).toFixed(2) + " pts"}</span>
                  ) : (
                    <span>{points && Math.round(points)} </span>
                  )}
                </Badge>
              </Tooltip>
            </>
          )}
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              icon={<Dots />}
              size={"sm"}
              syle={{ zIndex: 99 }}
            />
            <MenuList>
              {name !== "Sin Grupo" && (
                <>
                  <MenuItem
                    icon={<EditIcon />}
                    fontSize={"sm"}
                    onClick={onOpenEdit}
                  >
                    Editar Grupo
                  </MenuItem>
                  <MenuItem
                    icon={<DeleteIcon />}
                    fontSize={"sm"}
                    onClick={onOpenRemove}
                  >
                    Eliminar Grupo
                  </MenuItem>
                  <MenuDivider />
                </>
              )}
              <MenuItem
                icon={<DownloadIcon />}
                fontSize={"sm"}
                onClick={() => handleDownload(false)}
              >
                Descargar Grupo .in
              </MenuItem>
              <MenuItem
                icon={<DownloadIcon />}
                fontSize={"sm"}
                onClick={() => handleDownload(true)}
              >
                Descargar Grupo .txt
              </MenuItem>
            </MenuList>
          </Menu>
          <EditGroup {...props} isOpen={isOpenEdit} onClose={onCloseEdit} />
          <DeleteGroup
            isOpen={isOpenRemove}
            onClose={onCloseRemove}
            groupId={groupId}
          />
        </HStack>
        <Divider />
      </Box>
      <Box ml={2}>
        {caseState &&
          showCases &&
          caseState.cases.map((element) => (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "inline-block" }}
              key={element.caseId}
            >
              <CaseItem {...element} shouldShowPoints={name === "Sin Grupo"} />
            </motion.div>
          ))}
      </Box>
    </Flex>
  );
};

export default GroupItem;
