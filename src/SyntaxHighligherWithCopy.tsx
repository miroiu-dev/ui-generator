import { Box, IconButton } from "@radix-ui/themes";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useClipboard } from "./hooks";

export type SyntaxHighligherWithCopyProps = {
  code: string;
  language: string;
};

export function SyntaxHighligherWithCopy({ code, language }: SyntaxHighligherWithCopyProps) {
  const { copy } = useClipboard();

  return (
    <Box position="relative">
      <Box position="absolute" style={{ top: 15, right: 18 }}>
        <IconButton onClick={() => copy(code)}>
          <Copy size={20} />
        </IconButton>
      </Box>
      <SyntaxHighlighter language={language} style={atomDark} showInlineLineNumbers showLineNumbers wrapLines>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
}
