import { lazy, Suspense, useEffect } from "react";
import {
  Box,
  ScrollArea,
  Flex,
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
          "CREATE TABLE students (name STRING, gender STRING, city STRING, country STRING, age NUMBER, marks NUMBER)"
        );
        const studentsData = await import("../../data/student.json");
        alasql("INSERT INTO students SELECT * FROM ?", [studentsData.default]);
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
      <Flex
        direction={isMobile ? "column" : "row"}
        gap="md"
        p="lg"
        style={{ height: "calc(100% - 64px)" }}
      >
        <Box w={isMobile ? "100%" : "40%"} style={{ height: "100%" }}>
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

        <Box
          mt={isMobile ? "sm" : ""}
          w={isMobile ? "100%" : "60%"}
          style={{ height: "100%" }}
        >
          <Paper p="md" h="100%" withBorder>
            <Group justify="space-between" mb="md">
              <Text size="lg" fw={700} mb="sm">
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
        </Box>
      </Flex>
    </Box>
  );
};
