import { useCallback } from "react";
import { eta, getTemplate } from "../lib/eta";
import { useLocalStorage } from "./useLocalStorage";

type Parameters = {
  templateName: string;
  parameters: object;
  dir?: string;
};

export function useTemplate({ templateName, dir = "", parameters }: Parameters) {
  const [code, setCode] = useLocalStorage(`${templateName}-${dir}`, "");
  const [error, setError] = useLocalStorage(`${templateName}-${dir}-error`, "");

  const generate = useCallback(async () => {
    try {
      setError("");

      const template = await getTemplate(templateName, dir);

      const parsedCode = await eta.renderStringAsync(template, {
        ...parameters,
      });

      setCode(parsedCode);
    } catch (err: unknown) {
      console.log(err);
      setError("An error occurred while generating the code");
    }
  }, [dir, parameters, setCode, setError, templateName]);

  return { code, error, generate };
}
