import { Button, Group, Paper, Text, useMantineTheme } from "@mantine/core";
import HistoryDrawer from "./HistoryDrawer";
import GuidelinesDrawer from "./GuidelinesDrawer";

export const Navbar = ({ toggleDrawer, drawerOpened, history }) => {
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
        <Button size="xs" variant="outline" onClick={toggleDrawer}>
          View History
        </Button>
        <HistoryDrawer
          opened={drawerOpened}
          onClose={toggleDrawer}
          history={history}
        />
        <Button size="xs" onClick={toggleDrawer}>
          Guidelines
        </Button>
        <GuidelinesDrawer
          opened={drawerOpened}
          onClose={toggleDrawer}
          history={history}
        />
      </Group>
    </Paper>
  );
};
