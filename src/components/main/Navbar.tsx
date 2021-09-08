import * as React from "react";
import {
  Box,
  Spacer,
  Flex,
  Image,
  Container,
  Tooltip,
  useColorModeValue,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import dark from "../../assets/images/logoDark.png";
import light from "../../assets/images/logoLight.png";
import { SettingsIcon } from "@chakra-ui/icons";
import ConfigContainer from "../core/drawers/config/ConfigContainer";
import { FaBug } from "react-icons/all";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const logo = useColorModeValue(light, dark);

  const location = useLocation();
  console.log(location);
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
          {/* To avoid render icons in the main page*/}
          {location.pathname !== "/" && (
            <>
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
                <Tooltip label={"Reporta bugs"} aria-label={"bugs"}>
                  <a
                    href="https://github.com/Mau-MD/Omegaup-CDP/issues"
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
                      icon={<FaBug />}
                    />
                  </a>
                </Tooltip>
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
            </>
          )}
        </Flex>
      </Container>
      <ConfigContainer isOpen={isOpenSettings} onClose={onCloseSettings} />
    </Box>
  );
};

export default Navbar;
