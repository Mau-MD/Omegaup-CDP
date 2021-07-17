import * as React from "react";
import {
  HStack,
  Text,
  Spacer,
  Button,
  useDisclosure,
  Box,
  Switch,
} from "@chakra-ui/react";
import EditCase from "../Sidebar/EditCase";
import DeleteItem from "../Sidebar/DeleteItem";
import { useSelectedData } from "../../../Hooks/useSelectedData";
import { ICase } from "../../../Redux/Models/CasesModel";
import { BsEye, BsFillEyeSlashFill } from "react-icons/all";
import { ChangeEvent } from "react";
import { useStoreActions, useStoreState } from "../../../Redux/Store";

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

  const hidden = useStoreState((state) => state.input.hidden);
  const setHidden = useStoreActions((actions) => actions.input.setHidden);

  function handleHidden(event: ChangeEvent<HTMLInputElement>) {
    setHidden(event.target.checked);
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
        <Button size={"sm"} onClick={onOpenEdit}>
          Editar Caso
        </Button>
        <Button size={"sm"} onClick={onOpenRemove}>
          {" "}
          Eliminar Caso{" "}
        </Button>
      </HStack>
      <EditCase isOpen={isOpenEdit} onClose={onCloseEdit} {...caseData} />
      <DeleteItem
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        groupId={caseData.groupId}
        caseId={caseData.caseId}
      />
    </Box>
  );
};

export default TopBar;
