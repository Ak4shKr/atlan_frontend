import { lazy, Suspense, useEffect } from "react";
import {
  Box,
  ScrollArea,
  Paper,
  Text,
  Loader,
  Group,
  Button,
} from "@mantine/core";
import { Navbar } from "../../components/Navbar";
import alasql from "alasql";
import { useMediaQuery } from "@mantine/hooks";
import useHome from "./hook";
import SQLEditor from "../../components/Editor";
import { CSVLink } from "react-csv";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

const QueryExample = lazy(() => import("../../components/QueryExamples"));
const QueryOutputTable = lazy(() =>
  import("../../components/QueryOutputTable")
);

export const Home = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    error,
    columns,
    output,
    query,
    handleClear,
    handleEditorChange,
    handleRun,
    handleExampleClick,
    toggleHistoryDrawer,
    toggleGuidelinesDrawer,
    guidelinesdrawerOpened,
    historydrawerOpened,
    history,
  } = useHome();

  useEffect(() => {
    const initAlasql = async () => {
      if (!alasql.tables.students) {
        const { default: alasql } = await import("alasql");
        alasql(
          "CREATE TABLE students (id NUMBER, name STRING, age NUMBER,gender STRING, city STRING )"
        );
        alasql(
          "CREATE TABLE marks (studentId NUMBER, physics NUMBER, chemistry NUMBER,math NUMBER, english NUMBER, hindi NUMBER )"
        );
        const studentsData = await import("../../data/student1.json");
        const marksData = await import("../../data/marks1.json");
        alasql("INSERT INTO students SELECT * FROM ?", [studentsData.default]);
        alasql("INSERT INTO marks SELECT * FROM ?", [marksData.default]);
      }
    };
    initAlasql();
  }, []);

  return (
    <Box style={{ height: "100vh" }}>
      <Navbar
        toggleGuidelinesDrawer={toggleGuidelinesDrawer}
        toggleHistoryDrawer={toggleHistoryDrawer}
        guidelinesdrawerOpened={guidelinesdrawerOpened}
        historydrawerOpened={historydrawerOpened}
        history={history}
      />
      <PanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        style={{ height: "calc(100% - 64px)" }}
      >
        <Panel defaultSize={50} minSize={20} maxSize={80}>
          <Box
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "6px",
            }}
          >
            <SQLEditor
              handleEditorChange={handleEditorChange}
              query={query}
              handleClear={handleClear}
              handleRun={handleRun}
            />

            <Suspense fallback={<Loader type="bars" size={"xs"} />}>
              <QueryExample handleExampleClick={handleExampleClick} />
            </Suspense>
          </Box>
        </Panel>

        <PanelResizeHandle
          style={{ width: "2px", cursor: "col-resize", background: "#ccc" }}
        />

        <Panel defaultSize={50} minSize={20} maxSize={80}>
          <Paper p="md" h="100%" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="lg" fw={700}>
                Query Output
              </Text>
              {output.length > 0 && (
                <CSVLink
                  data={output}
                  filename="exported_data.csv"
                  className="btn"
                >
                  <Button variant="light" size="xs">
                    Export as CSV
                  </Button>
                </CSVLink>
              )}
            </Group>
            <ScrollArea style={{ height: "90%" }}>
              <Suspense fallback={<Loader type="bars" size={"xs"} />}>
                <QueryOutputTable
                  error={error}
                  output={output}
                  columns={columns}
                />
              </Suspense>
            </ScrollArea>
          </Paper>
        </Panel>
      </PanelGroup>
    </Box>
  );
};
