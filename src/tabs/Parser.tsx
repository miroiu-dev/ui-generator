import { Box, Button, Callout, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { SyntaxHighligherWithCopy } from "../SyntaxHighligherWithCopy";
import { useConfiguration } from "../providers/useConfiguration";
import { Info, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { parse } from "../lib/parser";

const query = (name: string) => `select    
    '{ columnName: ''' + COLUMN_NAME + ''', ' + 
     ' isNullable: ' + ( case IS_NULLABLE when 'YES' then 'true' else 'false' end ) + ', ' + 
     ' dataType: ''' + DATA_TYPE + ''', '
from    INFORMATION_SCHEMA.COLUMNS   
where    TABLE_NAME = '${name}' `;

export function Parser() {
  const [error, setError] = useState("");
  const { name, setName, setText, text, setColumns, columns } = useConfiguration();

  const code = query(name);

  const handleParse = () => {
    try {
      setColumns([]);
      setError("");

      const columns = parse(text);
      setColumns(columns);
    } catch (err: unknown) {
      console.log(err);
      setError("An error occurred while parsing the columns");
    }
  };

  return (
    <Flex direction="column" gap="3">
      {columns.length > 0 && (
        <Callout.Root color="green">
          <Callout.Icon>
            <Info size={20} />
          </Callout.Icon>
          <Callout.Text>Successfully parsed the columns! Your data is ready for further processing.</Callout.Text>
        </Callout.Root>
      )}
      {error && (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <TriangleAlert size={20} />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Box>
        <Text>Entity name</Text>
        <TextField.Root mt="3" size="3" value={name} onChange={({ target }) => setName(target.value)} />
      </Box>
      <Box>
        <Text>Columns</Text>
        <TextArea value={text} mt="3" size="3" onChange={({ target }) => setText(target.value)} style={{ height: 150 }}></TextArea>
      </Box>
      <Button onClick={handleParse}>Parse</Button>
      <SyntaxHighligherWithCopy code={code} language="sql" />
    </Flex>
  );
}
