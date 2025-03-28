import { Button, Group, Paper, Text, useMantineTheme } from "@mantine/core";

export const Navbar = () => {
  const theme = useMantineTheme();
  return (
    <Paper
      py="sm"
      px="xl"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.myColor[0],
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Text size="xl" fw={700} c={theme.colors.myColor[7]}>
        atlanSQL
      </Text>
      <Group>
        <Button size="xs" variant="outline">
          Guidelines
        </Button>
        <Button size="xs">About Us</Button>
      </Group>
    </Paper>
  );
};
