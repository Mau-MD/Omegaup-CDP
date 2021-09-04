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
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import dark from "../Assets/Images/logoDark.png";
import light from "../Assets/Images/logoLight.png";
import { SettingsIcon } from "@chakra-ui/icons";
import SettingsDrawer from "./Config/SettingsDrawer";

const Navbar = () => {
  const logo = useColorModeValue(light, dark);

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();

  return (
    <Box boxShadow={"md"}>
      <Container maxW={"container.lg"}>
        <Flex align={"center"} height={"38px"}>
          <Box w={"86px"}>
            <Image w={"100px"} src={logo} />
          </Box>
          {/*<Spacer />*/}
          {/*<Text opacity={0.5}> DEVELOPMENT BUILD</Text>*/}
          <Spacer />
          <Box>
            <Tooltip label={"Configuración"}>
              <IconButton
                size="md"
                fontSize="lg"
                variant="ghost"
                color="current"
                aria-label={"settings"}
                onClick={onOpenSettings}
                icon={<SettingsIcon />}
              />
            </Tooltip>
          </Box>
          <Box>
            <ColorModeSwitcher />
          </Box>
          <Box>
            <Tooltip
              label={"Colabora con nosotros en Github!"}
              aria-label={"Colabora"}
            >
              <a
                href="https://github.com/Mau-MD/Omegaup-CDP"
                target="_blank"
                rel="noreferrer noopener"
              >
                <IconButton
                  ml={2}
                  size="md"
                  fontSize="lg"
                  variant="ghost"
                  color="current"
                  aria-label={"settings"}
                  icon={<AiFillGithub size={25} />}
                />
              </a>
            </Tooltip>
          </Box>
        </Flex>
      </Container>
      <SettingsDrawer isOpen={isOpenSettings} onClose={onCloseSettings} />
    </Box>
  );
};

export default Navbar;
