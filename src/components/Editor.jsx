import {
  Button,
  Group,
  Loader,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { lazy, Suspense } from "react";
import { EditorView } from "@codemirror/view";
const CodeMirror = lazy(() => import("@uiw/react-codemirror"));
import { sql } from "@codemirror/lang-sql";
import { useMediaQuery } from "@mantine/hooks";

const SQLEditor = ({ query, handleEditorChange, handleRun, handleClear }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Paper
      p="md"
      withBorder
      bg={theme.colors.myColor[0]}
      style={{
        height: "50%",
        border: `1px solid ${theme.colors.myColor[3]}`,
      }}
    >
      <Text size="lg" fw={700} mb="sm">
        SQL Editor
      </Text>
      <Suspense fallback={<Loader type="bars" size={"xs"} />}>
        <CodeMirror
          value={query}
          height="100%"
          extensions={[sql(), EditorView.lineWrapping]}
          onChange={handleEditorChange}
          style={{
            height: isMobile ? "50%" : "60%",
            overflowY: "auto",
            overflowX: "auto",
            scrollbarWidth: "none",
            fontSize: "0.82rem",
          }}
        />
      </Suspense>
      <Group mt="sm" gap="md">
        <Button size="xs" onClick={handleRun} disabled={!query}>
          Run
        </Button>
        <Button size="xs" variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </Group>
    </Paper>
  );
};

export default SQLEditor;
