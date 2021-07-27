import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { useStoreRehydrated } from "easy-peasy";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import MainWindow from "./Components/MainWindow";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import RawArray from "./Pages/RawArray";
export const App = () => {
  const isRehydrated = useStoreRehydrated();

  return (
    <ChakraProvider theme={theme}>
      {!isRehydrated ? (
        <h1> Loading </h1>
      ) : (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/raw/:lineId">
              <RawArray />
            </Route>
            <Route exact path="/">
              <>
                <Header />
                <MainWindow />
              </>
            </Route>
          </Switch>
        </Router>
      )}
    </ChakraProvider>
  );
};
