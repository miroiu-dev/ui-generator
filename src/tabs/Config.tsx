import { useConfiguration } from "../providers/useConfiguration";
import { Column } from "../components/Column";
import { Flex, Separator, Switch, Text } from "@radix-ui/themes";
import { Fragment } from "react";

export function Config() {
  const { columns, makeEditable, isEditable } = useConfiguration();

  if (columns.length === 0) {
    return <Text>Please parse columns first!</Text>;
  }

  return (
    <Flex direction="column" gap="4">
      <Text as="label" size="2">
        <Flex gap="2">
          <Switch size="1" defaultChecked={isEditable} onCheckedChange={(checked) => makeEditable(checked)} />
          Editable Table
        </Flex>
      </Text>
      {columns.map((c) => (
        <Fragment key={c.accessorKey}>
          <Column column={c} />
          <Separator size="4" />
        </Fragment>
      ))}
    </Flex>
  );
}
