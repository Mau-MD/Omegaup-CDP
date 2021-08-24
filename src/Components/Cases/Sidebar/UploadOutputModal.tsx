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
  VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillFileZip, FaFileImport } from "react-icons/all";
import { DeleteIcon } from "@chakra-ui/icons";
import { readOutputZip } from "../../../Util/FileIO/upload";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}
const UploadOutputModal = (props: PropTypes) => {
  const { isOpen, onClose } = props;

  const onDrop = useCallback((acceptedFiles) => {}, []);
  const [, forceRender] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ".zip",
    maxFiles: 1,
  });

  function deleteFile() {
    acceptedFiles.length = 0;
    forceRender({});
  }

  function handleZipInput() {
    if (acceptedFiles.length > 0) {
      setIsUploading(true);
      readOutputZip(acceptedFiles[0]).then(() => setIsUploading(false));
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
          <Box
            mt={5}
            h={"300px"}
            border={"1px dashed white"}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Center h={"100%"}>
              <Center>
                <VStack>
                  <AiFillFileZip size={"3em"} />
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

export default UploadOutputModal;
