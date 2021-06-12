import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { useStoreRehydrated } from "easy-peasy";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import MainWindow from "./Components/MainWindow";

export const App = () => {
  const isRehydrated = useStoreRehydrated();

  return (
    <ChakraProvider theme={theme}>
      {!isRehydrated ? (
        <h1> Loading </h1>
      ) : (
        <>
          <Navbar />
          <Header />
          <MainWindow />
        </>
      )}
    </ChakraProvider>
  );
};
