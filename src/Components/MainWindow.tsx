import * as React from "react";
import { Container } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const MainWindow = () => {
  return (
    <Container
      maxW={"container.lg"}
      mt={3}
      h={"80vh"}
      border={"1px"}
      borderColor={"#EDEDED"}
      padding={"0"}
    >
      <Sidebar />
    </Container>
  );
};

export default MainWindow;
