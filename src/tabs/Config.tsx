import { useConfiguration } from "../providers/useConfiguration";
import { Column } from "../components/Column";
import { Flex, Separator, Switch, Text, TextField } from "@radix-ui/themes";
import { ChangeEvent, Fragment, useMemo } from "react";
import { useLocalStorage } from "../hooks";

export function Config() {
  const { columns, makeEditable, isEditable, setIsDeletable, isDeletable } = useConfiguration();
  const [searchText, setSearchText] = useLocalStorage("searchText", "");

  const filteredColumns = useMemo(
    () =>
      columns.filter(
        (c) => c.accessorKey.toLowerCase().includes(searchText.toLowerCase()) || c.header.toLowerCase().includes(searchText.toLowerCase())
      ),
    [columns, searchText]
  );

  if (columns.length === 0) {
    return <Text>Please parse columns first!</Text>;
  }

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    const newSearchText = ev.target.value;
    setSearchText(newSearchText);
  };

  return (
    <Flex direction="column" gap="4">
      <Text as="label" size="2">
        <Flex gap="2">
          <Switch size="1" defaultChecked={isEditable} onCheckedChange={(checked) => makeEditable(checked)} />
          Editable Table
        </Flex>
      </Text>
      <Text as="label" size="2">
        <Flex gap="2">
          <Switch size="1" defaultChecked={isDeletable} onCheckedChange={(checked) => setIsDeletable(checked)} />
          Can delete row
        </Flex>
      </Text>
      <TextField.Root size="1" value={searchText} onChange={handleSearch} placeholder="Search..." />
      {filteredColumns.map((c) => (
        <Fragment key={c.accessorKey}>
          <Column column={c} />
          <Separator size="4" />
        </Fragment>
      ))}
    </Flex>
  );
}
