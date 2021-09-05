import * as React from "react";
import {
  HStack,
  Text,
  Spacer,
  Button,
  useDisclosure,
  Box,
  Switch,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import EditCaseContainer from "../../core/modals/edit/EditCaseContainer";
import { HiOutlineDotsVertical as Dots } from "react-icons/hi";
import DeleteCase from "../../core/modals/delete/DeleteCase";
import { useSelectedData } from "../../../Hooks/useSelectedData";
import { ICase } from "../../../Redux/Models/CasesModel";
import {
  BiDuplicate,
  BiUpload,
  BsEye,
  BsFillEyeSlashFill,
  FaFileDownload,
  FiDelete,
  GrDuplicate,
} from "react-icons/all";
import { ChangeEvent } from "react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";
import DeleteLinesModal from "../../core/modals/delete/DeleteLinesModal";
import Layout from "../../core/drawers/Layout";
import { uuid } from "uuidv4";
import _ from "lodash";
import { DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { downloadSingleFile } from "../../../Util/FileIO/download";

interface PropTypes {
  groupName: string;
  caseData: ICase;
}

const TopBar = (props: PropTypes) => {
  const { groupName, caseData } = props;
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
  const {
    isOpen: isOpenLines,
    onOpen: onOpenLines,
    onClose: onCloseLines,
  } = useDisclosure();

  const hidden = useStoreState((state) => state.input.hidden);
  const setHidden = useStoreActions((actions) => actions.input.setHidden);
  const setLines = useStoreActions((actions) => actions.input.setLines);
  const layout = useStoreState((state) => state.input.layout);
  const addCase = useStoreActions((actions) => actions.cases.addCase);
  const addPage = useStoreActions((actions) => actions.input.addData);
  const selectedLines = useStoreState((state) =>
    state.input.data.find((inputElement) =>
      _.isEqual(inputElement.id, {
        groupId: caseData.groupId,
        caseId: caseData.caseId,
      })
    )
  );
  const groupState = useStoreState((state) =>
    state.cases.data.find(
      (groupElement) => groupElement.groupId === caseData.groupId
    )
  );
  const inputData = useStoreState((state) => state.input.data);

  function handleHidden(event: ChangeEvent<HTMLInputElement>) {
    setHidden(event.target.checked);
  }

  function handleLayoutLoad() {
    if (layout !== undefined) {
      const layoutNewIds = layout.map((layoutElement) => {
        return { ...layoutElement, lineId: uuid() };
      });
      setLines({
        caseIdentifier: { groupId: caseData.groupId, caseId: caseData.caseId },
        lineArray: layoutNewIds,
      });
    }
  }

  function duplicateCase() {
    const newCaseId = uuid();
    let newCaseName: string;
    let i = 1;
    while (true) {
      newCaseName = caseData.name + ` (${i})`;
      if (
        groupState?.cases.find(
          (caseElement) => caseElement.name === newCaseName
        ) === undefined
      ) {
        break;
      }
      i++;
    }
    addCase({
      ...caseData,
      caseId: newCaseId,
      name: newCaseName,
    });
    const newIdLines = selectedLines?.lines.map((lineElement) => {
      return { ...lineElement, lineId: uuid() };
    });
    if (newIdLines !== undefined) {
      addPage({
        id: { groupId: caseData.groupId, caseId: newCaseId },
        lines: newIdLines,
        outData: "",
      });
    }
  }

  function handleDownload(txt: boolean) {
    downloadSingleFile(caseData.name, inputData, caseData.caseId, {
      txt: txt,
    });
  }

  return (
    <Box mb={2}>
      <HStack h={"20%"} w={"100%"} pl={5}>
        <Text fontWeight={"bold"} fontSize={20}>
          {caseData.name}
        </Text>
        <h2> {groupName}</h2>
        <Spacer />
        <HStack pr={5}>
          <BsFillEyeSlashFill />
          <Switch onChange={(e) => handleHidden(e)} isChecked={hidden} />
        </HStack>
        <Button leftIcon={<EditIcon />} size={"sm"} onClick={onOpenEdit}>
          Editar Caso
        </Button>
        <Button leftIcon={<DeleteIcon />} size={"sm"} onClick={onOpenRemove}>
          {" "}
          Eliminar Caso{" "}
        </Button>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Dots />}
            size={"sm"}
            syle={{ zIndex: 99 }}
          />
          <MenuList>
            <MenuItem icon={<FiDelete />} fontSize={"sm"} onClick={onOpenLines}>
              Borrar Lineas
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<FaFileDownload />}
              fontSize={"sm"}
              onClick={handleLayoutLoad}
            >
              Cargar Layout
            </MenuItem>
            <MenuItem
              icon={<BiDuplicate />}
              fontSize={"sm"}
              onClick={duplicateCase}
            >
              Duplicar Caso
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<DownloadIcon />}
              fontSize={"sm"}
              onClick={() => handleDownload(false)}
            >
              Descargar Caso .in
            </MenuItem>
            <MenuItem
              icon={<DownloadIcon />}
              fontSize={"sm"}
              onClick={() => handleDownload(true)}
            >
              Descargar Caso .txt
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <EditCaseContainer
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        {...caseData}
      />
      <DeleteCase
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        groupId={caseData.groupId}
        caseId={caseData.caseId}
      />
      <DeleteLinesModal
        isOpen={isOpenLines}
        onClose={onCloseLines}
        caseIdentifier={{ groupId: caseData.groupId, caseId: caseData.caseId }}
      />
    </Box>
  );
};

export default TopBar;
