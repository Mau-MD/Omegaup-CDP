import { useStoreState } from "../Redux/Store";
import { useState, useEffect } from "react";

export const useWriting = () => {
  const [markdownState, setMarkdownState] = useState<string[]>([]);

  const all = useStoreState((state) => state.writing.all);
  const description = useStoreState((state) => state.writing.description);
  const input = useStoreState((state) => state.writing.input);
  const output = useStoreState((state) => state.writing.output);
  const example = useStoreState((state) => state.writing.example);
  const limits = useStoreState((state) => state.writing.limits);

  useEffect(() => {
    console.log("Changed");
    setMarkdownState([all, description, input, output, example, limits]);
  }, [all, description, input, output, example, limits]);

  return markdownState;
};
