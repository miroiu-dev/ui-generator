import { useEffect } from "react";
import { useTemplate } from "../hooks";
import { useConfiguration } from "../providers/useConfiguration";
import { Flex, Text } from "@radix-ui/themes";
import { SyntaxHighligherWithCopy } from "../SyntaxHighligherWithCopy";
import { toCamelCase, toSlug } from "../lib/parser";
import pluralize from "pluralize";

export function Listing() {
  const { columns, name } = useConfiguration();
  const { code, error, generate } = useTemplate({
    parameters: {
      columns: columns.filter((x) => !x.exclude),
      name,
      slug: toSlug(name),
      camelCaseName: toCamelCase(name),
      pluralName: pluralize(name),
      pluralNameCamelCase: pluralize(toCamelCase(name)),
    },
    templateName: "columns",
    dir: "listing",
  });

  useEffect(() => {
    if (columns.length > 0) {
      generate();
    }
  }, [columns.length, generate]);

  if (columns.length === 0) {
    return <Text>Please parse columns first!</Text>;
  }

  if (error) {
    return <Text>An error occurred while parsing the columns!</Text>;
  }

  return (
    <Flex direction="column" gap="4">
      <SyntaxHighligherWithCopy code={code} language="ts" />
    </Flex>
  );
}
