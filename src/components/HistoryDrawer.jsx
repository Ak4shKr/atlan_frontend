import {
  Drawer,
  Button,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
const HistoryDrawer = ({ opened, onClose, history }) => {
  const theme = useMantineTheme();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Query history"
      padding="md"
      size="sm"
      position="right"
      overlayProps={{ opacity: 0.5 }}
    >
      <ScrollArea style={{ height: "calc(100% - 60px)" }}>
        {history.map((example, index) => (
          <Text
            key={index}
            mt="sm"
            size="xs"
            style={{
              border: `1px solid ${theme.colors.blue[3]}`,
              borderRadius: "4px",
              padding: "4px",
              fontWeight: "500",
              color: `${theme.colors.blue[8]}`,
            }}
          >
            {example}
          </Text>
        ))}
      </ScrollArea>
    </Drawer>
  );
};

export default HistoryDrawer;
