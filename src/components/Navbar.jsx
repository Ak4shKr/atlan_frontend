import { Button, Group, Paper, Text, useMantineTheme } from "@mantine/core";
import HistoryDrawer from "./HistoryDrawer";
import GuidelinesDrawer from "./GuidelinesDrawer";
import { useMediaQuery } from "@mantine/hooks";

export const Navbar = ({
  toggleGuidelinesDrawer,
  toggleHistoryDrawer,
  guidelinesdrawerOpened,
  historydrawerOpened,
  history,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Paper
      py="sm"
      px={isMobile ? "xs" : "lg"}
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
        <Button size="xs" variant="outline" onClick={toggleHistoryDrawer}>
          View History
        </Button>
        <HistoryDrawer
          opened={historydrawerOpened}
          onClose={toggleHistoryDrawer}
          history={history}
        />
        <Button size="xs" onClick={toggleGuidelinesDrawer}>
          Guidelines
        </Button>
        <GuidelinesDrawer
          opened={guidelinesdrawerOpened}
          onClose={toggleGuidelinesDrawer}
          history={history}
        />
      </Group>
    </Paper>
  );
};
