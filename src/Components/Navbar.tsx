import * as React from "react";
import { Box, Spacer, Flex, Image, Container, Tooltip } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

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
          <Box mr={5}>
            <ColorModeSwitcher />
          </Box>
          <Box>
            <Tooltip
              label={"Colabora con nosotros en Github!"}
              aria-label={"Colabora"}
            >
              <span>
                <AiFillGithub size={25} />
              </span>
            </Tooltip>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
