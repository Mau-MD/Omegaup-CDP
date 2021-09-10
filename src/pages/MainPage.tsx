import * as React from "react";
import ReactPlayer from "react-player";
import LogoAnim from "../assets/videos/cdp.mp4";
import LogoAnimDark from "../assets/videos/cdpdark.webm";
import {
  Box,
  Button,
  Center,
  HStack,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "../libs/carouselStyles/carousel.css"; // requires a loader
import mainImg from "../assets/images/img00.png";
import writingImg from "../assets/images/img01.png";
import writingDivImg from "../assets/images/img02.png";
import solutionImg from "../assets/images/img04.png";
import darkmodeImg from "../assets/images/img05.png";
import { BiVideo, MdOndemandVideo } from "react-icons/all";
import { AiFillGithub } from "react-icons/ai";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const imgStyle = {
  width: "40%",
  border: "5px solid rgba(0,0,0,0.1)",
  borderRadius: "5px",
  boxShadow: "1px 8px 38px -12px rgba(0,0,0,0.75)",
};
const MainPage = () => {
  const [end, setEnd] = useState(false);
  const [animEnd, setAnimEnd] = useState(false);

  const videoToRender = useColorModeValue(LogoAnim, LogoAnimDark);

  useEffect(() => {
    const showAnim = localStorage.getItem("showAnim");
    if (showAnim === "false") {
      handleVideoEnd();
    }
  }, []);

  function handleVideoEnd() {
    setEnd(true);
    localStorage.setItem("showAnim", "false");
    setTimeout(() => {
      setAnimEnd(true);
    }, 1000);
  }

  return (
    <VStack h={"92vh"}>
      <Center h={"100%"} zIndex={-1}>
        <motion.div
          animate={{ y: end ? "-38vh" : "0px" }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <ReactPlayer
            url={videoToRender}
            muted={true}
            playing={true}
            onEnded={handleVideoEnd}
          />
        </motion.div>
      </Center>
      {animEnd && (
        <>
          <Box pos={"absolute"} top={"18vh"}>
            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
              {/*<Center>*/}
              <VStack h={"70vh"}>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  ¡Bienvenido a omegaUp CDP!
                </Text>
                <Box>
                  <Carousel
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={5000}
                  >
                    <div>
                      <img src={mainImg} style={imgStyle} />
                      <Text mt={10}>
                        ¡Crea problemas para omegaUp con facilidad!
                      </Text>
                    </div>
                    <div>
                      <img src={writingImg} style={imgStyle} />
                      <Text mt={10}>
                        Redacta problemas y visualiza cómo se va a ver en
                        omegaUp
                      </Text>
                    </div>
                    <div>
                      <img src={writingDivImg} style={imgStyle} />
                      <Text mt={10}>
                        Edita la redacción por partes, ¡no te distraigas con lo
                        demás!
                      </Text>
                    </div>
                    <div>
                      <img src={solutionImg} style={imgStyle} />
                      <Text mt={10}>
                        Agrega el código y redacta una solución al problema
                      </Text>
                    </div>
                    <div>
                      <img src={darkmodeImg} style={imgStyle} />
                      <Text mt={10}>Prueba el modo oscuro 🌙</Text>
                    </div>
                  </Carousel>
                </Box>
                <Spacer />
                <HStack spacing={10}>
                  <Link to={"creator"}>
                    <Button leftIcon={<AddIcon />} colorScheme={"twitter"}>
                      Crea un Problema
                    </Button>
                  </Link>
                  <a
                    href={"https://youtu.be/sYxRvqxbhuI"}
                    rel="noreferrer"
                    target={"_blank"}
                  >
                    <Button leftIcon={<BiVideo />} colorScheme={"blue"}>
                      Ve un tutorial
                    </Button>
                  </a>
                  <a
                    href={"https://github.com/Mau-MD/Omegaup-CDP"}
                    rel="noreferrer"
                    target={"_blank"}
                  >
                    <Button
                      leftIcon={<AiFillGithub />}
                      colorScheme={"facebook"}
                    >
                      Contribuye en Github
                    </Button>
                  </a>
                </HStack>
              </VStack>
              {/*</Center>*/}
            </motion.div>
          </Box>
        </>
      )}
    </VStack>
  );
};

export default MainPage;
