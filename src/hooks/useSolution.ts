import { useStoreState } from "../redux/store";
import { useEffect, useState } from "react";

export const useSolution = () => {
  const [codeValue, setCodeValue] = useState<string | undefined>(undefined);
  const [langValue, setLangValue] = useState<number | undefined>(undefined);
  const [textValue, setTextValue] = useState<string | undefined>(undefined);

  const code = useStoreState((state) => state.solution.code);
  const text = useStoreState((state) => state.solution.text);
  const language = useStoreState((state) => state.solution.language);

  useEffect(() => {
    setCodeValue(code);
    setLangValue(language);
    setTextValue(text);
  }, [code, text, language]);

  return { code: codeValue, lang: langValue, text: textValue };
};
