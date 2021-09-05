import * as React from "react";
import {
  Box,
  Button,
  Center,
  Code,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useCallbackRef,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillFileZip, FaFileImport } from "react-icons/all";
import { DeleteIcon } from "@chakra-ui/icons";
import { readOutputZip } from "../../../../libs/downloadUpload/uploadOut";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}
const OutUpload = (props: PropTypes) => {
  const { isOpen, onClose } = props;

  const [, forceRender] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ".zip",
    maxFiles: 1,
  });

  const toast = useToast();
  const outlineColor = useColorModeValue("rgba(0,0,0,0.5)", "white");

  function deleteFile() {
    acceptedFiles.length = 0;
    forceRender({});
  }

  function handleZipInput() {
    if (acceptedFiles.length > 0) {
      setIsUploading(true);
      readOutputZip(acceptedFiles[0])
        .then(() => {
          setIsUploading(false);
          toast({
            title: "¡Operación Completa!",
            description:
              "Todos los `.out` han sido importados correctamente a sus respectivos casos.",
            status: "success",
            isClosable: true,
          });
          onClose();
        })
        .catch(() => {
          setIsUploading(false);
          toast({
            title: "Zip Invalido",
            description: "Asegúrate que estás comprimiendo la carpeta raíz",
            status: "error",
            isClosable: true,
          });
        });
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Subir salida</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Comprime en un solo <Code> zip </Code> las{" "}
          <strong>carpetas de los grupos </strong>que continenen los casos de
          prueba con sus respectivos <Code>.out</Code> generados. Arrastra el
          zip aquí.
          <Code mt={2}>
            zip {"->"} Carpeta raíz {"->"} Carpetas con los grupos
          </Code>
          <Box
            mt={5}
            h={"300px"}
            border={"1px dashed " + outlineColor}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Center h={"100%"}>
              <Center>
                <VStack>
                  <AiFillFileZip size={"3em"} color={outlineColor} />
                  <Text>Arrastra tu zip aquí</Text>
                </VStack>
              </Center>
            </Center>
          </Box>
          <Box mt={2}>
            {acceptedFiles.map((file) => (
              <HStack key={file.size + file.name}>
                <p>{file.name}</p>
                <Spacer />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => deleteFile()}
                  aria-label={"Delete Zip"}
                />
              </HStack>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant={"ghost"} mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button
            isLoading={isUploading}
            isDisabled={isUploading}
            colorScheme="green"
            type={"submit"}
            onClick={() => handleZipInput()}
          >
            Subir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OutUpload;
