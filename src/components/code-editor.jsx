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

const SQLEditor = ({ query, handleEditorChange, handleRun, handleClear }) => {
  const theme = useMantineTheme();

  return (
    <Paper
      p="md"
      withBorder
      bg={theme.colors.myColor[0]}
      style={{
        height: "100%",
        border: `1px solid ${theme.colors.myColor[3]}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Suspense fallback={<Loader type="bars" size={"xs"} />}>
        <CodeMirror
          value={query}
          height="100%"
          extensions={[sql(), EditorView.lineWrapping]}
          onChange={handleEditorChange}
          style={{
            overflowY: "auto",
            overflowX: "auto",
            scrollbarWidth: "none",
            fontSize: "0.82rem",
            flex: 1,
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
