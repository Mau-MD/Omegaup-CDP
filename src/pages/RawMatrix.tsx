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
import { useStoreState } from "../redux/store";

interface Params {
  lineId: string;
}

const RawMatrix = () => {
  const { lineId } = useParams<Params>();

  const caseData = useSelectedData();
  const matrixData = useInputPage(caseData.caseData).pageData.find(
    (lineElement) => lineElement.lineId === lineId
  )?.matrixData;

  const { hasCopied, onCopy } = useClipboard(
    matrixData !== undefined ? matrixData.value : ""
  );
  //console.log(matrixData);

  return (
    <Container maxW="container.lg">
      <HStack mt={5} mb={2}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Arreglo:
        </Text>
        <Spacer />
        <Text>
          Filas: {matrixData?.rows} | Columnas: {matrixData?.columns} | Mínimo:{" "}
          {matrixData?.minValue} | Máximo:
          {matrixData?.maxValue}
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

      <Textarea h={"80vh"} value={matrixData?.value} />
    </Container>
  );
};

export default RawMatrix;
