import * as React from "react";
import ReactPlayer from "react-player";
import LogoAnim from "../assets/videos/cdp.mp4";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "../libs/carouselStyles/carousel.css"; // requires a loader
import img00 from "../assets/images/img00.png";
import img01 from "../assets/images/img01.png";
import img02 from "../assets/images/img02.png";
import img03 from "../assets/images/img03.png";
import img04 from "../assets/images/img04.png";
import img05 from "../assets/images/img05.png";
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
            url={LogoAnim}
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
                      <img src={img00} style={imgStyle} />
                      <Text mt={10}>
                        ¡Crea problemas para omegaUp con facilidad!
                      </Text>
                    </div>
                    <div>
                      <img src={img01} style={imgStyle} />
                      <Text mt={10}>
                        Redacta problemas y visualiza cómo se va a ver en
                        omegaUp
                      </Text>
                    </div>
                    <div>
                      <img src={img02} style={imgStyle} />
                      <Text mt={10}>
                        Edita la redacción por partes, ¡no te distraigas con lo
                        demás!
                      </Text>
                    </div>
                    <div>
                      <img src={img04} style={imgStyle} />
                      <Text mt={10}>
                        Agrega el código y redacta una solución al problema
                      </Text>
                    </div>
                    <div>
                      <img src={img05} style={imgStyle} />
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
                  <Button leftIcon={<BiVideo />} colorScheme={"blue"}>
                    Ve un tutorial
                  </Button>
                  <a
                    href={"https://github.com/Mau-MD/Omegaup-CDP"}
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
