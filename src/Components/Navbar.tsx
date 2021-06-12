import * as React from "react";
import { Box, Spacer, Flex, Image, Container } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

const Navbar = () => {
  return (
    <Box boxShadow={"md"}>
      <Container maxW={"container.lg"}>
        <Flex align={"center"} height={"38px"}>
          <Box w={"86px"}>
            <Image
              w={"full"}
              src={"https://omegaup.com/preguntas//omegaup_curves.png"}
            />
          </Box>
          <Spacer />
          <Box>
            <AiFillGithub size={30} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
