import * as React from "react";
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Drawer,
  DrawerOverlay,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
  Slider,
  Switch,
  Select,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Tab,
  useToast,
} from "@chakra-ui/react";
import CasesConfig from "./CasesConfig";
import { useState } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}
const SettingsDrawer = (props: PropTypes) => {
  const { isOpen, onClose } = props;
  const [shouldSave, setShouldSave] = useState(false);
  // function ()

  const toast = useToast();

  function setSave(save: boolean) {
    setShouldSave(save);
  }

  function handleSave() {
    setShouldSave(true);
    toast({
      title: "Configuración Salvada",
      description: "La configuración ha sido salvada correctamente.",
      status: "success",
      isClosable: true,
    });
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Configuración</DrawerHeader>

        <DrawerBody>
          <Tabs size={"sm"}>
            <TabList>
              {/*<Tab>Global</Tab>*/}
              {/*<Tab>Solución</Tab>*/}
              <Tab>Casos</Tab>
              {/*<Tab>Redacción</Tab>*/}
            </TabList>
            <TabPanels>
              {/*<TabPanel></TabPanel>*/}
              {/*<TabPanel></TabPanel>*/}
              <TabPanel h={"100%"}>
                <CasesConfig save={shouldSave} setSave={setSave} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={() => handleSave()}>
            Salvar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
