import * as React from "react";
import TopBar from "./TopBar";
import {
  Box,
  Center,
  Divider,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Lines from "./Lines";
import { useSelectedData } from "../../../hooks/useSelectedData";
import sloth from "../../../assets/images/sloth.png";

const InputWindow = () => {

  const selectedData = useSelectedData();

  return (
    <Box w={"100%"} h={"100%"}>
      {selectedData.caseData.caseId === "None" ? (
        <Center h="60vh">
          <VStack>
            <Box w={"300px"} h={"300px"}>
              <Image src={sloth} w={"full"} />
            </Box>
            <Text fontWeight={"bold"}> Selecciona un caso para empezar</Text>
            <Box fontSize={9}>
              <a href="https://www.freepik.com/vectors/tree">
                Tree vector created by pch.vector - www.freepik.com
              </a>
            </Box>
          </VStack>
        </Center>
      ) : (
        <div>
          <TopBar {...selectedData} />
          <Divider mb={4} />
          <Lines {...selectedData} />
        </div>
      )}
    </Box>
  );
};
export default InputWindow;
