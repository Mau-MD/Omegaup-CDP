import * as React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import ReactMde from "react-mde";
import { parse } from "./Markdown/Parser";
import { Dispatch, RefObject, SetStateAction } from "react";

interface PropTypes {
  showEditor: boolean;
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
  ref: RefObject<HTMLDivElement>;
}

const MarkdownEditor = (props: PropTypes) => {
  const { showEditor, markdown, setMarkdown, ref } = props;

  const style = useColorModeValue("light", "dark");

  return (
    <Flex>
      {showEditor && (
        <ReactMde
          value={markdown}
          onChange={setMarkdown}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(parse(markdown))
          }
        />
      )}
      <Box ml={5} w={"50%"} ref={ref} className={style + " markdown"} />
    </Flex>
  );
};

export default MarkdownEditor;
