import * as React from "react";
import { Container, HStack } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { BiCodeBlock as CodeIcon } from "react-icons/bi";
import { BsPencil as EditIcon } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline as CheckIcon } from "react-icons/io";
import Sidebar from "./Cases/Sidebar/Sidebar";
import Main from "./Cases/Main";
import WritingWindow from "./Writing/WritingWindow";
import SolutionMainWindow from "./Solution/SolutionMainWindow";

const MainWindow = () => {
  return (
    <>
      <Container maxW={"container.lg"} mt={3} h={"80vh"} padding={"0"}>
        <Tabs variant={"enclosed"} size={"sm"}>
          <TabList>
            <Tab>
              <HStack>
                <CodeIcon />
                <p>Código Solución</p>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <CheckIcon />
                <p>Casos de Prueba</p>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <EditIcon />
                <p>Redacción</p>
              </HStack>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SolutionMainWindow />
            </TabPanel>
            <TabPanel>
              <Main />
            </TabPanel>
            <TabPanel>
              <WritingWindow />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/*<Sidebar />*/}
      </Container>
    </>
  );
};

export default MainWindow;
