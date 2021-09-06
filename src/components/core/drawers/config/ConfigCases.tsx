import * as React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Spacer,
  Switch,
  VStack,
  Button,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../../../../redux/store";
import { caseConfig } from "../../../../redux/models/config/configModel";

interface PropTypes {
  save: boolean;
  setSave: (save: boolean) => void;
}

const ConfigCases = (props: PropTypes) => {
  const { save, setSave } = props;
  const [goUp, setGoUp] = useState(false);
  const [focusLine, setFocusLine] = useState("last");

  const configStore = useStoreState((state) => state.config.caseConfig);

  const saveCasesConfig = useStoreActions(
    (actions) => actions.config.setCaseConfig
  );

  useEffect(() => {
    setGoUp(configStore.goUp);
    setFocusLine(configStore.focus);
  }, [configStore]);

  useEffect(() => {
    if (save) {
      const configData = {
        goUp: goUp,
        focus: focusLine,
      } as caseConfig;
      saveCasesConfig(configData);
      setSave(false);
    }
  }, [save]);

  function handleGoUpChange() {
    setGoUp(!goUp);
  }

  function handleFocusChange(e: ChangeEvent<HTMLSelectElement>) {
    setFocusLine(e.target.value);
  }

  return (
    <VStack h={"100%"}>
      <FormControl mb={5}>
        <FormLabel> Focus al cambiar de caso</FormLabel>
        <Select
          size={"sm"}
          value={focusLine}
          onChange={(e) => handleFocusChange(e)}
        >
          <option value={"first"}> Primera Línea</option>
          <option value={"last"}> Última Línea</option>
          <option value={"none"}> Sin focus</option>
        </Select>
      </FormControl>
      <FormControl mb={5}>
        <FormLabel> Ir hacia arriba al seleccionar un caso </FormLabel>
        <Switch isChecked={goUp} onChange={() => handleGoUpChange()} />
      </FormControl>
    </VStack>
  );
};

export default ConfigCases;
