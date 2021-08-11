import * as React from "react";
import {
  Box,
  Spacer,
  Flex,
  Image,
  Container,
  Tooltip,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import dark from "../Assets/Images/logoDark.png";
import light from "../Assets/Images/logoLight.png";

const Navbar = () => {
  const logo = useColorModeValue(light, dark);
  return (
    <Box boxShadow={"md"}>
      <Container maxW={"container.lg"}>
        <Flex align={"center"} height={"38px"}>
          <Box w={"86px"}>
            <Image w={"100px"} src={logo} />
          </Box>
          <Spacer />
          <Text opacity={0.5}> DEVELOPMENT BUILD</Text>
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
