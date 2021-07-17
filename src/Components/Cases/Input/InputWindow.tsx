import * as React from "react";
import Line from "./Line";
import { Button, Center, Flex, VStack } from "@chakra-ui/react";
import { useStoreState } from "../../../Redux/Store";

const InputWindow = () => {
  const hidden = useStoreState((state) => state.input.hidden);

  return (
    <VStack ml={5}>
      <Center>
        <Button size={"sm"}>+</Button>
      </Center>

      <Line hide={hidden} />
      <Line hide={hidden} />
      <Line hide={hidden} />
      <Line hide={hidden} />
      <Line hide={hidden} />
    </VStack>
  );
};

export default InputWindow;
