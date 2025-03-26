import {
  Box,
  Button,
  Group,
  Paper,
  Text,
  Container,
  useMantineTheme,
} from "@mantine/core";

export const Navbar = () => {
  const theme = useMantineTheme();
  return (
    <Paper
      mt="md"
      shadow="sm"
      radius="xl"
      p="md"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.myColor[0],
        sticky: "top",
      }}
    >
      <Text size="lg" weight={700}>
        SQL Runner
      </Text>
      <Group>
        <Button variant="outline">Run Query</Button>
        <Button>Save</Button>
      </Group>
    </Paper>
  );
};
