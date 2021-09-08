import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  Spacer,
  Text,
  Textarea,
  useClipboard,
} from "@chakra-ui/react";
import * as React from "react";
import { FcCheckmark } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { useInputPage } from "../hooks/useInputPage";
import { useSelectedData } from "../hooks/useSelectedData";

interface Params {
  lineId: string;
}

const RawArray = () => {
  const { lineId } = useParams<Params>();

  const caseData = useSelectedData();
  const arrayData = useInputPage(caseData.caseData).pageData.find(
    (lineElement) => lineElement.lineId === lineId
  )?.arrayData;

  const { hasCopied, onCopy } = useClipboard(
    arrayData !== undefined ? arrayData.value : ""
  );
  //console.log(arrayData);

  return (
    <Container maxW="container.lg">
      <HStack mt={5} mb={2}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Arreglo:
        </Text>
        <Spacer />
        <Text>
          Tamaño: {arrayData?.size} | Mínimo: {arrayData?.minValue} | Máximo:
          {arrayData?.maxValue}
        </Text>
        <Spacer />
        <Box w={"100px"}>
          <Button size="sm" onClick={onCopy}>
            {hasCopied ? (
              <HStack>
                <span>Copiado!</span>
                <FcCheckmark />
              </HStack>
            ) : (
              <HStack>
                <span>Copiar</span>
                <CopyIcon />
              </HStack>
            )}
          </Button>
        </Box>
      </HStack>

      <Textarea h={"80vh"} value={arrayData?.value} />
    </Container>
  );
};

export default RawArray;
