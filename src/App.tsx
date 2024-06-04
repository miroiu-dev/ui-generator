import { Box, Container, Tabs } from "@radix-ui/themes";
import { Parser } from "./tabs/Parser";
import { Config } from "./tabs/Config";
import { ConfigurationProvider } from "./providers/ConfigurationProvider";
import { useLocalStorage } from "./hooks";
import { Listing } from "./tabs/Listing";
import { Edit } from "./tabs/Edit";

function App() {
  const [tab, setTab] = useLocalStorage("tab", "parser");

  return (
    <Container>
      <Tabs.Root value={tab} onValueChange={(tab) => setTab(tab)}>
        <Tabs.List>
          <Tabs.Trigger value="parser">Parser</Tabs.Trigger>
          <Tabs.Trigger value="config">Configuration</Tabs.Trigger>
          <Tabs.Trigger value="listing">Listing</Tabs.Trigger>
          <Tabs.Trigger value="edit">Edit</Tabs.Trigger>
        </Tabs.List>
        <Box mt="4">
          <ConfigurationProvider>
            <Tabs.Content value="parser">
              <Parser />
            </Tabs.Content>
            <Tabs.Content value="config">
              <Config />
            </Tabs.Content>
            <Tabs.Content value="listing">
              <Listing />
            </Tabs.Content>
            <Tabs.Content value="edit">
              <Edit />
            </Tabs.Content>
          </ConfigurationProvider>
        </Box>
      </Tabs.Root>
    </Container>
  );
}

export default App;
